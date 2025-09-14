import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePermissions, useHasAnyPermission } from '@/hooks/usePermissions';
import { 
  Lock, 
  Shield, 
  AlertCircle, 
  Crown, 
  Users, 
  Building, 
  UserCheck, 
  User,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ProtectedComponentProps {
  children: ReactNode;
  requiredPermissions?: string[];
  allowedRoles?: string[];
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
  feature?: string;
  className?: string;
}

interface AccessDeniedUIProps {
  userRole: string;
  feature?: string;
  showUpgradePrompt?: boolean;
  requiredPermissions?: string[];
  allowedRoles?: string[];
}

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'owner': return Crown;
    case 'big7': return Building;
    case 'manager': return Users;
    case 'vendor': return UserCheck;
    case 'customer': return User;
    default: return Shield;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'owner': return 'bg-red-100 text-red-800 border-red-200';
    case 'big7': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'vendor': return 'bg-green-100 text-green-800 border-green-200';
    case 'customer': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getUpgradeTarget = (userRole: string): { role: string; description: string } => {
  switch (userRole) {
    case 'customer':
      return {
        role: 'vendor',
        description: 'Upgrade to Vendor Partner to access service delivery features'
      };
    case 'vendor':
      return {
        role: 'manager',
        description: 'Contact administration for Manager access to business operations'
      };
    case 'manager':
      return {
        role: 'big7',
        description: 'Big 7 membership required for profit sharing oversight'
      };
    default:
      return {
        role: 'owner',
        description: 'Owner privileges required for full system access'
      };
  }
};

const AccessDeniedUI: React.FC<AccessDeniedUIProps> = ({
  userRole,
  feature,
  showUpgradePrompt = false,
  requiredPermissions,
  allowedRoles
}) => {
  const RoleIcon = getRoleIcon(userRole);
  const roleColor = getRoleColor(userRole);
  const upgradeTarget = getUpgradeTarget(userRole);
  const TargetIcon = getRoleIcon(upgradeTarget.role);

  return (
    <Card className="border-2 border-dashed border-gray-300 bg-gray-50/50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-gray-100">
          <Lock className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2 text-lg md:text-xl">
          <Shield className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          Access Restricted
        </CardTitle>
        <CardDescription>
          {feature ? `This ${feature} is not available for your current role.` : 'You do not have permission to access this feature.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Role */}
        <div className="text-center">
          <div className="mb-2 text-xs md:text-sm font-medium text-gray-600">Your Current Role</div>
          <Badge className={`inline-flex items-center gap-2 px-2 py-1 md:px-3 md:py-1 ${roleColor} text-xs md:text-sm`}>
            <RoleIcon className="h-3 w-3 md:h-4 md:w-4" />
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </Badge>
        </div>

        {/* Required Access */}
        {(allowedRoles || requiredPermissions) && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Required Access</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              {allowedRoles && (
                <div>
                  <div className="text-sm font-medium">Allowed Roles:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {allowedRoles.map((role) => {
                      const Icon = getRoleIcon(role);
                      return (
                        <Badge key={role} variant="outline" className="text-xs px-2 py-1">
                          <Icon className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                          <span className="sm:hidden">{role.charAt(0).toUpperCase()}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {requiredPermissions && (
                <div>
                  <div className="text-sm font-medium">Required Permissions:</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {requiredPermissions.join(', ')}
                  </div>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Upgrade Prompt */}
        {showUpgradePrompt && (
          <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 p-3 md:p-4">
            <div className="flex items-start md:items-center gap-3">
              <div className="rounded-full bg-white p-2 shadow-sm flex-shrink-0">
                <Zap className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm md:text-base">Upgrade Your Access</div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">{upgradeTarget.description}</div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <span>Upgrade to</span>
                <Badge className={`${getRoleColor(upgradeTarget.role)} text-xs px-2 py-1`}>
                  <TargetIcon className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">{upgradeTarget.role.charAt(0).toUpperCase() + upgradeTarget.role.slice(1)}</span>
                  <span className="sm:hidden">{upgradeTarget.role.charAt(0).toUpperCase()}</span>
                </Badge>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                <span className="hidden sm:inline">Learn More</span>
                <span className="sm:hidden">Upgrade</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="text-center text-xs md:text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
          <span className="hidden sm:inline">Contact your system administrator if you believe this is an error or if you need access to this feature.</span>
          <span className="sm:hidden">Contact admin if you need access.</span>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * ProtectedComponent - Wraps content that requires specific permissions or roles
 * 
 * @param children - Content to render if user has access
 * @param requiredPermissions - Array of permissions, user needs ANY of these
 * @param allowedRoles - Array of roles that are allowed access
 * @param fallback - Custom component to show when access is denied
 * @param showUpgradePrompt - Whether to show upgrade suggestions
 * @param feature - Name of the feature being protected (for better error messages)
 * @param className - Additional CSS classes
 */
export const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
  children,
  requiredPermissions = [],
  allowedRoles = [],
  fallback,
  showUpgradePrompt = false,
  feature,
  className = ''
}) => {
  const { userRole, hasAnyPermission } = usePermissions();
  const hasRequiredPermissions = useHasAnyPermission(requiredPermissions);

  // Check role-based access
  const hasRoleAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);
  
  // Check permission-based access
  const hasPermissionAccess = requiredPermissions.length === 0 || hasRequiredPermissions;

  // User has access if they pass both role and permission checks
  const hasAccess = hasRoleAccess && hasPermissionAccess;

  if (hasAccess) {
    return <div className={className}>{children}</div>;
  }

  // Show custom fallback or default access denied UI
  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <AccessDeniedUI
        userRole={userRole}
        feature={feature}
        showUpgradePrompt={showUpgradePrompt}
        requiredPermissions={requiredPermissions}
        allowedRoles={allowedRoles}
      />
    </div>
  );
};

/**
 * ProtectedFeature - Inline protection that conditionally renders content
 */
interface ProtectedFeatureProps {
  children: ReactNode;
  requiredPermissions?: string[];
  allowedRoles?: string[];
  fallback?: ReactNode;
}

export const ProtectedFeature: React.FC<ProtectedFeatureProps> = ({
  children,
  requiredPermissions = [],
  allowedRoles = [],
  fallback = null
}) => {
  const { userRole } = usePermissions();
  const hasRequiredPermissions = useHasAnyPermission(requiredPermissions);

  const hasRoleAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);
  const hasPermissionAccess = requiredPermissions.length === 0 || hasRequiredPermissions;
  const hasAccess = hasRoleAccess && hasPermissionAccess;

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

/**
 * RoleGate - Simple role-based conditional rendering
 */
interface RoleGateProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

export const RoleGate: React.FC<RoleGateProps> = ({
  children,
  allowedRoles,
  fallback = null
}) => {
  const { userRole } = usePermissions();
  
  return allowedRoles.includes(userRole) ? <>{children}</> : <>{fallback}</>;
};

export default ProtectedComponent;