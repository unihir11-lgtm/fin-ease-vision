import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, Target, Shield, AlertTriangle, Users, 
  Globe, Calendar, MapPin, CheckCircle2, XCircle 
} from "lucide-react";

interface CompanyAnalysisProps {
  companyName: string;
  aboutCompany: string;
  industry: string;
  headquarters: string;
  foundedYear: string;
  employees?: number;
  website?: string;
  managingDirector: string;
  objectives: string[];
  strengths: string[];
  risks: string[];
  promoterHolding?: {
    preIssue: number;
    postIssue: number;
  };
  reservations?: {
    qib: number;
    nii: number;
    retail: number;
    employee?: number;
    anchor?: number;
  };
}

const CompanyAnalysis = ({
  companyName,
  aboutCompany,
  industry,
  headquarters,
  foundedYear,
  employees,
  website,
  managingDirector,
  objectives,
  strengths,
  risks,
  promoterHolding,
  reservations,
}: CompanyAnalysisProps) => {
  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <Card className="hover-lift">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Company Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {aboutCompany}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-muted/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Industry</span>
              </div>
              <p className="font-semibold text-secondary text-sm">{industry}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Founded</span>
              </div>
              <p className="font-semibold text-secondary text-sm">{foundedYear}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Headquarters</span>
              </div>
              <p className="font-semibold text-secondary text-sm">{headquarters}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Employees</span>
              </div>
              <p className="font-semibold text-secondary text-sm">{employees?.toLocaleString() || "N/A"}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">MD/CEO</span>
              </div>
              <p className="font-semibold text-secondary text-sm truncate">{managingDirector}</p>
            </div>
            {website && (
              <div className="bg-muted/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Website</span>
                </div>
                <a 
                  href={website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary text-sm hover:underline truncate block"
                >
                  Visit →
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Issue Objectives */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Issue Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Promoter Holdings */}
        {promoterHolding && (
          <Card className="hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Shareholding Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pre-Issue Promoter Holding</span>
                    <span className="font-bold text-secondary">{promoterHolding.preIssue}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                      style={{ width: `${promoterHolding.preIssue}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Post-Issue Promoter Holding</span>
                    <span className="font-bold text-secondary">{promoterHolding.postIssue}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      style={{ width: `${promoterHolding.postIssue}%` }}
                    />
                  </div>
                </div>
                
                {reservations && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-secondary mb-3">Issue Reservation</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-xl font-bold text-primary">{reservations.qib}%</p>
                        <p className="text-xs text-muted-foreground">QIB</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">{reservations.nii}%</p>
                        <p className="text-xs text-muted-foreground">NII</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-xl font-bold text-green-600">{reservations.retail}%</p>
                        <p className="text-xs text-muted-foreground">Retail</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card className="hover-lift border-green-200 bg-green-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Risks */}
        <Card className="hover-lift border-red-200 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-5 h-5" />
              Key Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{risk}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyAnalysis;
