// Role and Permission Management Types and Data

export type ActionType = 'view' | 'edit' | 'delete' | 'create' | 'approve' | 'export';

export interface PagePermission {
  pageId: string;
  pageName: string;
  module: string;
  actions: {
    action: ActionType;
    label: string;
    enabled: boolean;
  }[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  isSystem: boolean; // System roles cannot be deleted
  createdAt: string;
  permissions: PagePermission[];
}

// Define all pages with their available actions
export const allPages: { pageId: string; pageName: string; module: string; availableActions: { action: ActionType; label: string }[] }[] = [
  // Dashboard
  { pageId: 'admin_dashboard', pageName: 'Dashboard', module: 'Dashboard', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'export', label: 'Export' },
  ]},
  
  // User Management
  { pageId: 'user_management', pageName: 'User Management', module: 'Users', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'delete', label: 'Delete' },
    { action: 'create', label: 'Create' },
    { action: 'export', label: 'Export' },
  ]},
  
  // NPS Module
  { pageId: 'nps_users', pageName: 'NPS Users', module: 'NPS', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'delete', label: 'Delete' },
    { action: 'approve', label: 'Approve/Reject' },
    { action: 'export', label: 'Export' },
  ]},
  { pageId: 'nps_payments', pageName: 'Payment Entry', module: 'NPS', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'create', label: 'Create' },
    { action: 'approve', label: 'Approve/Reject' },
    { action: 'export', label: 'Export' },
  ]},
  { pageId: 'nps_settlements', pageName: 'Settlements', module: 'NPS', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'approve', label: 'Process' },
    { action: 'export', label: 'Export' },
  ]},
  
  // IPO Module
  { pageId: 'ipo_management', pageName: 'IPO Management', module: 'IPO', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'delete', label: 'Delete' },
    { action: 'create', label: 'Create' },
  ]},
  { pageId: 'ipo_applications', pageName: 'Applications', module: 'IPO', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'approve', label: 'Approve/Reject' },
    { action: 'export', label: 'Export' },
  ]},
  { pageId: 'ipo_analytics', pageName: 'IPO Analytics', module: 'IPO', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'export', label: 'Export' },
  ]},
  
  // Bonds Module
  { pageId: 'bonds_management', pageName: 'Bond Management', module: 'Bonds', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'delete', label: 'Delete' },
    { action: 'create', label: 'Create' },
  ]},
  { pageId: 'bonds_orders', pageName: 'Orders', module: 'Bonds', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'approve', label: 'Approve/Reject' },
    { action: 'export', label: 'Export' },
  ]},
  { pageId: 'bonds_analytics', pageName: 'Bond Analytics', module: 'Bonds', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'export', label: 'Export' },
  ]},
  
  // FD Module
  { pageId: 'fds_management', pageName: 'FD Management', module: 'FDs', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'delete', label: 'Delete' },
    { action: 'create', label: 'Create' },
  ]},
  { pageId: 'fds_bookings', pageName: 'Bookings', module: 'FDs', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'approve', label: 'Approve/Reject' },
    { action: 'export', label: 'Export' },
  ]},
  { pageId: 'fds_analytics', pageName: 'FD Analytics', module: 'FDs', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'export', label: 'Export' },
  ]},
  
  // System
  { pageId: 'activity_logs', pageName: 'Activity Logs', module: 'System', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'export', label: 'Export' },
  ]},
  { pageId: 'role_management', pageName: 'Role Management', module: 'System', availableActions: [
    { action: 'view', label: 'View' },
    { action: 'edit', label: 'Edit' },
    { action: 'delete', label: 'Delete' },
    { action: 'create', label: 'Create' },
  ]},
];

// Helper function to create permissions with all actions enabled/disabled
export const createPermissions = (enableAll: boolean): PagePermission[] => {
  return allPages.map(page => ({
    pageId: page.pageId,
    pageName: page.pageName,
    module: page.module,
    actions: page.availableActions.map(action => ({
      ...action,
      enabled: enableAll,
    })),
  }));
};

// Helper function to create view-only permissions
export const createViewOnlyPermissions = (): PagePermission[] => {
  return allPages.map(page => ({
    pageId: page.pageId,
    pageName: page.pageName,
    module: page.module,
    actions: page.availableActions.map(action => ({
      ...action,
      enabled: action.action === 'view',
    })),
  }));
};

// Default Roles
export const defaultRoles: Role[] = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    description: 'Full access to all features and settings',
    color: '#8B5CF6',
    isSystem: true,
    createdAt: '2024-01-01',
    permissions: createPermissions(true),
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Administrative access with limited system settings',
    color: '#3B82F6',
    isSystem: true,
    createdAt: '2024-01-01',
    permissions: createPermissions(true).map(p => ({
      ...p,
      actions: p.actions.map(a => ({
        ...a,
        enabled: p.pageId !== 'role_management' ? a.enabled : a.action === 'view',
      })),
    })),
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Can manage products and approve applications',
    color: '#10B981',
    isSystem: false,
    createdAt: '2024-01-15',
    permissions: createPermissions(true).map(p => ({
      ...p,
      actions: p.actions.map(a => ({
        ...a,
        enabled: a.action !== 'delete' && p.pageId !== 'role_management',
      })),
    })),
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'Handles day-to-day operations and order processing',
    color: '#F59E0B',
    isSystem: false,
    createdAt: '2024-02-01',
    permissions: allPages.map(page => ({
      pageId: page.pageId,
      pageName: page.pageName,
      module: page.module,
      actions: page.availableActions.map(action => ({
        ...action,
        enabled: ['view', 'edit', 'approve', 'export'].includes(action.action) && 
                 !['role_management', 'user_management'].includes(page.pageId),
      })),
    })),
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to view data and reports',
    color: '#6B7280',
    isSystem: false,
    createdAt: '2024-02-15',
    permissions: createViewOnlyPermissions(),
  },
];

// Get modules list
export const getModules = (): string[] => {
  return [...new Set(allPages.map(p => p.module))];
};

// Check if user has permission for a specific action on a page
export const hasPermission = (role: Role, pageId: string, action: ActionType): boolean => {
  const pagePermission = role.permissions.find(p => p.pageId === pageId);
  if (!pagePermission) return false;
  const actionPermission = pagePermission.actions.find(a => a.action === action);
  return actionPermission?.enabled ?? false;
};
