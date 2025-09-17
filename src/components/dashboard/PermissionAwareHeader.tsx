import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePermissions } from '@/hooks/usePermissions';
import { ProtectedFeature, RoleGate } from '@/components/auth/ProtectedComponent';
import { 
  Crown, 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Building,
  UserCheck,
  User,
  TrendingUp,
  Zap,
  Info,
  AlertCircle
} from 'lucide-react';

interface PermissionAwareHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  showPermissionSummary?: boolean;
  premiumFeature?: boolean;
  requiredRole?: string[];
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'super_admin': return Crown;
    case 'admin': return Shield;
    case 'manager': return Users;
    case 'vendor': return UserCheck;
    case 'customer': return User;
    default: return Shield;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'super_admin': return 'bg-red-50 text-red-700 border-red-200';
    case 'admin': return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'manager': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'vendor': return 'bg-green-50 text-green-700 border-green-200';
    case 'customer': return 'bg-gray-50 text-gray-700 border-gray-200';
    default: return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

export const PermissionAwareHeader: React.FC<PermissionAwareHeaderProps> = ({
  title,
  description,
  children,
  showPermissionSummary = false,
  premiumFeature = false,
  requiredRole = []
}) => {
  const { userRole, permissions, rolePriority, roleInfo } = usePermissions();
  const RoleIcon = getRoleIcon(userRole);
  const roleColor = getRoleColor(userRole);

  return (
    <div className="space-y-4">
      {/* Main Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="space-y-1 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
            
            {/* Role Badge */}
            <Badge className={`${roleColor} border w-fit`}>
              <RoleIcon className="w-3 h-3 mr-1" />
              <span className="text-xs sm:text-sm">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
            </Badge>

            {/* Premium Feature Indicator */}
            {premiumFeature && (
              <ProtectedFeature allowedRoles={['owner', 'big7', 'manager']}>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </ProtectedFeature>
            )}

            {/* Access Level Indicator */}
            {rolePriority < 60 && (
              <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Limited Access</span>
                <span className="sm:hidden">Limited</span>
              </Badge>
            )}
          </div>
          
          {description && (
            <p className="text-sm md:text-base text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="w-full md:w-auto">
          {children}
        </div>
      </div>

      {/* Permission Summary */}
      {showPermissionSummary && (
        <Card className="border-l-4 border-l-primary/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Your Access Level
            </CardTitle>
            <CardDescription>
              You have {permissions.length} available permissions as a {roleInfo?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Financial Permissions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Financial ({permissions.filter(p => p.category === 'financial').length})
                </div>
                <div className="text-xs text-muted-foreground pl-6">
                  {permissions.filter(p => p.category === 'financial').slice(0, 3).map(p => p.name).join(', ')}
                  {permissions.filter(p => p.category === 'financial').length > 3 && '...'}
                </div>
              </div>

              {/* Business Permissions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Building className="w-4 h-4 text-blue-600" />
                  Business ({permissions.filter(p => p.category === 'business').length})
                </div>
                <div className="text-xs text-muted-foreground pl-6">
                  {permissions.filter(p => p.category === 'business').slice(0, 3).map(p => p.name).join(', ')}
                  {permissions.filter(p => p.category === 'business').length > 3 && '...'}
                </div>
              </div>

              {/* System Permissions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="w-4 h-4 text-purple-600" />
                  System ({permissions.filter(p => p.category === 'system').length})
                </div>
                <div className="text-xs text-muted-foreground pl-6">
                  {permissions.filter(p => p.category === 'system').slice(0, 3).map(p => p.name).join(', ')}
                  {permissions.filter(p => p.category === 'system').length > 3 && '...'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Role-based Notices */}
      <RoleGate allowedRoles={['customer', 'vendor']}>
        <Alert className="border-blue-200 bg-blue-50/50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Limited Access:</strong> Some features may be restricted for your current role. 
            Contact your administrator for access to additional features.
          </AlertDescription>
        </Alert>
      </RoleGate>

      <RoleGate allowedRoles={['manager']}>
        <Alert className="border-green-200 bg-green-50/50">
          <Info className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Management Access:</strong> You have administrative access to business operations and team management.
          </AlertDescription>
        </Alert>
      </RoleGate>

      <RoleGate allowedRoles={['admin', 'super_admin']}>
        <Alert className="border-purple-200 bg-purple-50/50">
          <Crown className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <strong>Executive Access:</strong> You have full access to all system features and administration.
          </AlertDescription>
        </Alert>
      </RoleGate>
    </div>
  );
};

/**
 * Feature Access Indicator - Shows whether a specific feature is available
 */
interface FeatureAccessIndicatorProps {
  featureName: string;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  className?: string;
}

export const FeatureAccessIndicator: React.FC<FeatureAccessIndicatorProps> = ({
  featureName,
  requiredPermissions = [],
  requiredRoles = [],
  className = ''
}) => {
  const { userRole, hasAnyPermission } = usePermissions();
  
  const hasRoleAccess = requiredRoles.length === 0 || requiredRoles.includes(userRole);
  const hasPermissionAccess = requiredPermissions.length === 0 || hasAnyPermission(requiredPermissions);
  const hasAccess = hasRoleAccess && hasPermissionAccess;

  if (hasAccess) {
    return (
      <Badge variant="outline" className={`text-green-600 border-green-200 ${className}`}>
        <Eye className="w-3 h-3 mr-1" />
        Available
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`text-red-600 border-red-200 ${className}`}>
      <Lock className="w-3 h-3 mr-1" />
      Restricted
    </Badge>
  );
};

/**
 * Quick Access Permission Panel
 */
export const PermissionQuickPanel: React.FC = () => {
  const { userRole, permissions, rolePriority } = usePermissions();

  return (
    <Card className="w-72 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Access</CardTitle>
        <CardDescription>Your current permissions overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Role Info */}
        <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
          <div className="flex items-center gap-2">
            {React.createElement(getRoleIcon(userRole), { className: "w-4 h-4" })}
            <span className="font-medium">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
          </div>
          <Badge variant="outline">Priority {rolePriority}</Badge>
        </div>

        {/* Permission Count */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="text-center p-2 sm:p-3 bg-white rounded border">
            <div className="text-base sm:text-lg font-bold text-green-600">{permissions.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white rounded border">
            <div className="text-base sm:text-lg font-bold text-blue-600">{permissions.filter(p => p.category === 'financial').length}</div>
            <div className="text-xs text-muted-foreground">Financial</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <ProtectedFeature requiredPermissions={['view_reports']}>
            <Button size="sm" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </ProtectedFeature>
          
          <ProtectedFeature requiredPermissions={['manage_users']}>
            <Button size="sm" variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              User Management
            </Button>
          </ProtectedFeature>

          <ProtectedFeature 
            requiredPermissions={['view_reports']} 
            fallback={
              <Button size="sm" variant="ghost" className="w-full justify-start opacity-50" disabled>
                <Lock className="w-4 h-4 mr-2" />
                Restricted Feature
              </Button>
            }
          >
            <Button size="sm" variant="ghost" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Advanced Settings
            </Button>
          </ProtectedFeature>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionAwareHeader;