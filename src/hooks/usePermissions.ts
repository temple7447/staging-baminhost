import { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions, 
  getUserPermissions, 
  getPermissionsByCategory,
  getRoleConfig,
  NAVIGATION_PERMISSIONS,
  Permission 
} from '@/lib/permissions';

/**
 * Custom hook for permission checking in React components
 */
export const usePermissions = () => {
  const { user } = useAuth();
  const userRole = user?.role || '';

  return useMemo(() => {
    const checkPermission = (permission: string): boolean => {
      return hasPermission(userRole, permission);
    };

    const checkAnyPermission = (permissions: string[]): boolean => {
      return hasAnyPermission(userRole, permissions);
    };

    const checkAllPermissions = (permissions: string[]): boolean => {
      return hasAllPermissions(userRole, permissions);
    };

    const checkNavigationAccess = (navigationId: string): boolean => {
      const requiredPermissions = NAVIGATION_PERMISSIONS[navigationId];
      if (!requiredPermissions || requiredPermissions.length === 0) return true;
      return checkAnyPermission(requiredPermissions);
    };

    const getAvailablePermissions = (): Permission[] => {
      return getUserPermissions(userRole);
    };

    const getPermissionsByCat = (category: Permission['category']): Permission[] => {
      return getPermissionsByCategory(userRole, category);
    };

    const getRoleInfo = () => {
      return getRoleConfig(userRole);
    };

    return {
      // User info
      user,
      userRole,
      roleInfo: getRoleInfo(),
      
      // Permission checking functions
      hasPermission: checkPermission,
      hasAnyPermission: checkAnyPermission,
      hasAllPermissions: checkAllPermissions,
      canAccessNavigation: checkNavigationAccess,
      
      // Permission data retrieval
      permissions: getAvailablePermissions(),
      getPermissionsByCategory: getPermissionsByCat,
      
      // Convenience computed values
      isOwner: userRole === 'owner',
      isBig7: userRole === 'big7',
      isManager: userRole === 'manager',
      isVendor: userRole === 'vendor',
      isCustomer: userRole === 'customer',
      
      // Role priority (for UI layering/restrictions)
      rolePriority: getRoleInfo()?.priority || 0
    };
  }, [userRole, user]);
};

/**
 * Hook for checking specific permission
 */
export const useHasPermission = (permission: string): boolean => {
  const { hasPermission } = usePermissions();
  return hasPermission(permission);
};

/**
 * Hook for checking if user has any of the specified permissions
 */
export const useHasAnyPermission = (permissions: string[]): boolean => {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(permissions);
};

/**
 * Hook for checking if user has all of the specified permissions
 */
export const useHasAllPermissions = (permissions: string[]): boolean => {
  const { hasAllPermissions } = usePermissions();
  return hasAllPermissions(permissions);
};

/**
 * Hook for navigation access checking
 */
export const useCanAccessNavigation = (navigationId: string): boolean => {
  const { canAccessNavigation } = usePermissions();
  return canAccessNavigation(navigationId);
};

/**
 * Hook that filters navigation items based on user permissions
 */
export const useFilteredNavigation = <T extends { id: string }>(
  navigationItems: T[]
): T[] => {
  const { canAccessNavigation } = usePermissions();
  
  return useMemo(() => {
    return navigationItems.filter(item => canAccessNavigation(item.id));
  }, [navigationItems, canAccessNavigation]);
};

/**
 * Hook for role-based component rendering
 */
export const useRoleBasedAccess = () => {
  const permissions = usePermissions();
  
  return {
    ...permissions,
    
    // Render helpers
    renderForRoles: (allowedRoles: string[], component: React.ReactNode) => {
      return allowedRoles.includes(permissions.userRole) ? component : null;
    },
    
    renderForPermissions: (requiredPermissions: string[], component: React.ReactNode) => {
      return permissions.hasAnyPermission(requiredPermissions) ? component : null;
    },
    
    // Access level helpers
    hasFullAccess: permissions.isOwner,
    hasViewOnlyAccess: permissions.isCustomer || permissions.isVendor,
    hasManagementAccess: permissions.isOwner || permissions.isBig7 || permissions.isManager
  };
};