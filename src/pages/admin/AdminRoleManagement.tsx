import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  Pencil,
  X,
  Check,
  FileText,
  Download,
  ShieldCheck,
  Lock,
  Copy,
  Search,
} from "lucide-react";
import { Role, allPages, defaultRoles, getModules, ActionType, createPermissions } from "@/data/rolePermissions";

const AdminRoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const modules = getModules();

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionIcon = (action: ActionType) => {
    switch (action) {
      case 'view': return <Eye className="w-3.5 h-3.5" />;
      case 'edit': return <Pencil className="w-3.5 h-3.5" />;
      case 'delete': return <Trash2 className="w-3.5 h-3.5" />;
      case 'create': return <Plus className="w-3.5 h-3.5" />;
      case 'approve': return <Check className="w-3.5 h-3.5" />;
      case 'export': return <Download className="w-3.5 h-3.5" />;
      default: return <FileText className="w-3.5 h-3.5" />;
    }
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(JSON.parse(JSON.stringify(role))); // Deep clone
    setIsEditDialogOpen(true);
  };

  const handleCreateRole = () => {
    setEditingRole({
      id: `role_${Date.now()}`,
      name: '',
      description: '',
      color: '#3B82F6',
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0],
      permissions: createPermissions(false),
    });
    setIsCreateDialogOpen(true);
  };

  const handleDuplicateRole = (role: Role) => {
    setEditingRole({
      ...JSON.parse(JSON.stringify(role)),
      id: `role_${Date.now()}`,
      name: `${role.name} (Copy)`,
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsCreateDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRole) {
      setRoles(roles.filter(r => r.id !== selectedRole.id));
      toast.success(`Role "${selectedRole.name}" deleted successfully`);
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
    }
  };

  const saveRole = (isNew: boolean) => {
    if (!editingRole) return;
    
    if (!editingRole.name.trim()) {
      toast.error("Role name is required");
      return;
    }

    if (isNew) {
      setRoles([...roles, editingRole]);
      toast.success(`Role "${editingRole.name}" created successfully`);
      setIsCreateDialogOpen(false);
    } else {
      setRoles(roles.map(r => r.id === editingRole.id ? editingRole : r));
      toast.success(`Role "${editingRole.name}" updated successfully`);
      setIsEditDialogOpen(false);
    }
    setEditingRole(null);
  };

  const togglePermission = (pageId: string, action: ActionType) => {
    if (!editingRole) return;
    
    setEditingRole({
      ...editingRole,
      permissions: editingRole.permissions.map(p => {
        if (p.pageId === pageId) {
          return {
            ...p,
            actions: p.actions.map(a => {
              if (a.action === action) {
                return { ...a, enabled: !a.enabled };
              }
              return a;
            }),
          };
        }
        return p;
      }),
    });
  };

  const toggleAllModulePermissions = (module: string, enabled: boolean) => {
    if (!editingRole) return;
    
    setEditingRole({
      ...editingRole,
      permissions: editingRole.permissions.map(p => {
        if (p.module === module) {
          return {
            ...p,
            actions: p.actions.map(a => ({ ...a, enabled })),
          };
        }
        return p;
      }),
    });
  };

  const toggleAllPagePermissions = (pageId: string, enabled: boolean) => {
    if (!editingRole) return;
    
    setEditingRole({
      ...editingRole,
      permissions: editingRole.permissions.map(p => {
        if (p.pageId === pageId) {
          return {
            ...p,
            actions: p.actions.map(a => ({ ...a, enabled })),
          };
        }
        return p;
      }),
    });
  };

  const getPermissionCount = (role: Role) => {
    let enabled = 0;
    let total = 0;
    role.permissions.forEach(p => {
      p.actions.forEach(a => {
        total++;
        if (a.enabled) enabled++;
      });
    });
    return { enabled, total };
  };

  const colorOptions = [
    '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6B7280', '#14B8A6'
  ];

  // Permission Editor Component
  const PermissionEditor = ({ role, onToggle, onToggleAllModule, onToggleAllPage }: { 
    role: Role; 
    onToggle: (pageId: string, action: ActionType) => void;
    onToggleAllModule: (module: string, enabled: boolean) => void;
    onToggleAllPage: (pageId: string, enabled: boolean) => void;
  }) => (
    <Accordion type="multiple" className="w-full space-y-2">
      {modules.map(module => {
        const modulePages = role.permissions.filter(p => p.module === module);
        const allEnabled = modulePages.every(p => p.actions.every(a => a.enabled));
        const someEnabled = modulePages.some(p => p.actions.some(a => a.enabled));
        
        return (
          <AccordionItem key={module} value={module} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{module}</span>
                  <Badge variant={allEnabled ? "default" : someEnabled ? "secondary" : "outline"} className="text-xs">
                    {modulePages.reduce((acc, p) => acc + p.actions.filter(a => a.enabled).length, 0)} / 
                    {modulePages.reduce((acc, p) => acc + p.actions.length, 0)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => onToggleAllModule(module, true)}
                  >
                    Enable All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => onToggleAllModule(module, false)}
                  >
                    Disable All
                  </Button>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4">
                {modulePages.map(page => (
                  <div key={page.pageId} className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{page.pageName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => onToggleAllPage(page.pageId, true)}
                        >
                          All On
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => onToggleAllPage(page.pageId, false)}
                        >
                          All Off
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {page.actions.map(action => (
                        <div
                          key={action.action}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                            action.enabled
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-background border-border text-muted-foreground hover:border-muted-foreground'
                          }`}
                          onClick={() => onToggle(page.pageId, action.action)}
                        >
                          {getActionIcon(action.action)}
                          <span className="text-sm font-medium">{action.label}</span>
                          {action.enabled ? (
                            <Check className="w-3.5 h-3.5 text-primary" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-primary" />
            Role Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage roles and permissions for admin users
          </p>
        </div>
        <Button onClick={handleCreateRole} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Role
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-sm text-muted-foreground">Total Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roles.filter(r => r.isSystem).length}</p>
                <p className="text-sm text-muted-foreground">System Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{roles.filter(r => !r.isSystem).length}</p>
                <p className="text-sm text-muted-foreground">Custom Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{allPages.length}</p>
                <p className="text-sm text-muted-foreground">Managed Pages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map(role => {
                const { enabled, total } = getPermissionCount(role);
                return (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: role.color }}
                        >
                          {role.name.charAt(0)}
                        </div>
                        <span className="font-medium">{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">
                      {role.description}
                    </TableCell>
                    <TableCell>
                      {role.isSystem ? (
                        <Badge variant="secondary" className="gap-1">
                          <Lock className="w-3 h-3" /> System
                        </Badge>
                      ) : (
                        <Badge variant="outline">Custom</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(enabled / total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {enabled}/{total}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {role.createdAt}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleViewRole(role)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicateRole(role)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditRole(role)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        {!role.isSystem && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteRole(role)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Role Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedRole && (
                <>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: selectedRole.color }}
                  >
                    {selectedRole.name.charAt(0)}
                  </div>
                  {selectedRole.name}
                  {selectedRole.isSystem && (
                    <Badge variant="secondary" className="gap-1 ml-2">
                      <Lock className="w-3 h-3" /> System Role
                    </Badge>
                  )}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedRole?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRole && (
            <div className="space-y-4">
              {modules.map(module => {
                const modulePages = selectedRole.permissions.filter(p => p.module === module);
                return (
                  <div key={module} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      {module}
                    </h4>
                    <div className="space-y-3">
                      {modulePages.map(page => (
                        <div key={page.pageId} className="flex items-center justify-between py-2 border-b last:border-0">
                          <span className="text-sm font-medium">{page.pageName}</span>
                          <div className="flex gap-2">
                            {page.actions.map(action => (
                              <Badge
                                key={action.action}
                                variant={action.enabled ? "default" : "outline"}
                                className={`gap-1 ${!action.enabled && 'text-muted-foreground'}`}
                              >
                                {getActionIcon(action.action)}
                                {action.label}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Modify role details and permissions
            </DialogDescription>
          </DialogHeader>
          
          {editingRole && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Role Details</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role Name</Label>
                    <Input
                      value={editingRole.name}
                      onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                      disabled={editingRole.isSystem}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role Color</Label>
                    <div className="flex gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-lg border-2 ${
                            editingRole.color === color ? 'border-foreground' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setEditingRole({ ...editingRole, color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingRole.description}
                    onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="permissions" className="mt-4">
                <PermissionEditor
                  role={editingRole}
                  onToggle={togglePermission}
                  onToggleAllModule={toggleAllModulePermissions}
                  onToggleAllPage={toggleAllPagePermissions}
                />
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveRole(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role with custom permissions
            </DialogDescription>
          </DialogHeader>
          
          {editingRole && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Role Details</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Role Name *</Label>
                    <Input
                      value={editingRole.name}
                      onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                      placeholder="Enter role name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role Color</Label>
                    <div className="flex gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-lg border-2 ${
                            editingRole.color === color ? 'border-foreground' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setEditingRole({ ...editingRole, color })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editingRole.description}
                    onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                    placeholder="Describe the role's purpose"
                    rows={3}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="permissions" className="mt-4">
                <PermissionEditor
                  role={editingRole}
                  onToggle={togglePermission}
                  onToggleAllModule={toggleAllModulePermissions}
                  onToggleAllPage={toggleAllPagePermissions}
                />
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => saveRole(true)}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRoleManagement;
