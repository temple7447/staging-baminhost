# Role-Based Access Control (RBAC) Implementation Guide

This document explains the comprehensive Role-Based Access Control (RBAC) system implemented in the Ledgerly Roots portfolio management application.

## Overview

The RBAC system provides fine-grained access control based on user roles and permissions. It ensures that users can only access features and data appropriate to their role within the organization.

## System Architecture

### Core Components

1. **Permission Definitions** (`/src/lib/permissions.ts`)
   - Centralized permission registry
   - Role configurations with permission mappings
   - Utility functions for permission checking

2. **React Hooks** (`/src/hooks/usePermissions.ts`)
   - Custom hooks for permission checking in components
   - Memoized permission data and role information
   - Navigation filtering utilities

3. **Protected Components** (`/src/components/auth/ProtectedComponent.tsx`)
   - Wrapper components for access control
   - Visual indicators for restricted features
   - Upgrade prompts and fallback UI

4. **Permission-Aware UI** (`/src/components/dashboard/PermissionAwareHeader.tsx`)
   - Enhanced headers with role badges
   - Permission summaries and indicators
   - Quick access panels

## User Roles

### Owner (Priority: 100)
- **Full system access** with master control
- All permissions available
- Complete financial oversight
- User management capabilities
- System administration rights

### Big 7 Member (Priority: 80)
- **Profit sharing and allocation oversight**
- Access to all financial data
- Portfolio and investment tracking
- Report generation capabilities
- Business operation visibility

### Manager (Priority: 60)
- **Departmental management and operations**
- Business unit management (Estate, Filling Station, Equipment)
- Team and contact management
- Commission processing
- Limited financial access

### Vendor Partner (Priority: 40)
- **Service delivery and proof submission**
- Work proof uploads
- Commission tracking (personal)
- Limited contact access
- Payment capabilities

### Customer (Priority: 20)
- **Service consumption and payment management**
- Payment plan management
- Project progress tracking
- Limited account overview
- Personal payment history

## Permission Categories

### Dashboard Permissions
- `view_overview` - Main dashboard access
- `view_wallet` - Wallet and financial overview
- `view_portfolio` - Investment portfolio tracking
- `view_split_tracker` - Budget allocation tracking
- `view_goals` - Financial goal planning

### Business Management
- `view_estate` / `manage_estate` - Property management
- `view_filling_station` / `manage_filling_station` - Fuel operations
- `view_equipment` / `manage_equipment` - Equipment rental

### Financial Operations
- `make_payments` - Process transactions
- `view_payment_history` - Transaction records
- `manage_commissions` - Vendor payment processing
- `track_commissions` - Personal commission tracking

### System Access
- `view_settings` - Account configuration
- `view_library` - Document access
- `view_assistant` - AI assistant features
- `manage_users` - User administration
- `manage_system` - System configuration

## Implementation Examples

### Basic Permission Check

```typescript
import { useHasPermission } from '@/hooks/usePermissions';

const MyComponent = () => {
  const canManageUsers = useHasPermission('manage_users');
  
  return (
    <div>
      {canManageUsers && (
        <Button>Add New User</Button>
      )}
    </div>
  );
};
```

### Protected Component Usage

```typescript
import { ProtectedComponent } from '@/components/auth/ProtectedComponent';

const SensitiveFeature = () => (
  <ProtectedComponent
    requiredPermissions={['manage_commissions']}
    feature="Commission Management"
    showUpgradePrompt={true}
  >
    <CommissionDashboard />
  </ProtectedComponent>
);
```

### Role-Based Conditional Rendering

```typescript
import { RoleGate } from '@/components/auth/ProtectedComponent';

const AdminPanel = () => (
  <RoleGate allowedRoles={['owner', 'big7']}>
    <AdminDashboard />
  </RoleGate>
);
```

### Navigation Filtering

```typescript
import { useFilteredNavigation } from '@/hooks/usePermissions';

const Sidebar = () => {
  const filteredItems = useFilteredNavigation(navigationItems);
  
  return (
    <nav>
      {filteredItems.map(item => (
        <NavigationItem key={item.id} {...item} />
      ))}
    </nav>
  );
};
```

### Permission-Aware Headers

```typescript
import { PermissionAwareHeader } from '@/components/dashboard/PermissionAwareHeader';

const Dashboard = () => (
  <PermissionAwareHeader
    title="Financial Dashboard"
    description="Complete portfolio overview"
    showPermissionSummary={true}
    premiumFeature={true}
  >
    <QuickActions />
  </PermissionAwareHeader>
);
```

## UI/UX Features

### Visual Indicators

1. **Role Badges**: Color-coded badges showing user roles
2. **Permission Indicators**: Icons showing feature availability
3. **Access Level Badges**: "Limited Access", "Premium", etc.
4. **Lock Icons**: Clear indication of restricted features

### Upgrade Prompts

The system shows contextual upgrade prompts when users attempt to access restricted features:

- Suggests the next logical role upgrade
- Explains benefits of higher access levels
- Provides clear call-to-action buttons
- Shows required permissions for features

### Fallback UI

When users don't have access to features:

- Professional "Access Restricted" cards
- Clear explanation of current role limitations
- Information about required permissions
- Contact information for administrators

## Navigation Control

The sidebar automatically filters menu items based on user permissions:

- **Hidden Items**: Completely inaccessible features are not shown
- **Disabled Items**: Visible but disabled with lock icons
- **Tooltips**: Explanatory tooltips for restricted items
- **Categorization**: Items grouped by access level and category

## Security Considerations

### Client-Side Protection
- All permission checks are enforced on the client
- UI elements are conditionally rendered
- Navigation is filtered based on permissions

### Best Practices
1. **Always check permissions** at the component level
2. **Use fallback UI** for better user experience
3. **Provide clear feedback** about access restrictions
4. **Implement progressive disclosure** for advanced features

## Testing Role Access

### Demo Users
The system includes demo users for each role:

- **Owner**: `ebami@eyituoyo.com`
- **Big 7**: `big7@eyituoyo.com`
- **Manager**: `operations@eyituoyo.com` / `marketing@eyituoyo.com`
- **Vendor**: `vendor@eyituoyo.com`
- **Customer**: `customer@eyituoyo.com`

All demo users use password: `demo123`

### Testing Workflow
1. Login as different roles
2. Navigate through the application
3. Observe permission-based UI changes
4. Test restricted feature access
5. Verify upgrade prompts and fallbacks

## Customization

### Adding New Permissions

1. **Define Permission** in `permissions.ts`:
```typescript
'new_permission': {
  id: 'new_permission',
  name: 'New Feature Access',
  description: 'Access to new feature functionality',
  category: 'business'
}
```

2. **Assign to Roles**:
```typescript
manager: {
  permissions: [
    // ... existing permissions
    'new_permission'
  ]
}
```

3. **Use in Components**:
```typescript
const hasAccess = useHasPermission('new_permission');
```

### Creating New Roles

1. Add role configuration to `ROLE_CONFIGS`
2. Update user interface role handling
3. Add appropriate permission sets
4. Test access patterns thoroughly

## Troubleshooting

### Common Issues

1. **Permission Not Working**: Check if permission is correctly defined and assigned to user role
2. **UI Not Updating**: Verify that components are using permission hooks correctly
3. **Navigation Issues**: Ensure navigation items have proper permission mappings

### Debug Information

Use the browser console to inspect:
- Current user role and permissions
- Failed permission checks
- Navigation filtering results

The `usePermissions` hook provides detailed debugging information about user access levels.

## Future Enhancements

### Planned Features
1. **Dynamic Permissions**: Runtime permission management
2. **Audit Logging**: Track permission usage and access attempts
3. **Advanced Workflows**: Multi-step approval processes
4. **Time-Based Access**: Temporary permission grants
5. **Geo-Restrictions**: Location-based access control

### Integration Opportunities
1. **Backend Validation**: Server-side permission enforcement
2. **Single Sign-On**: Enterprise authentication integration
3. **Mobile App**: Consistent RBAC across platforms
4. **API Security**: Permission-based API endpoint protection

This RBAC system provides a solid foundation for secure, role-based application access while maintaining excellent user experience through clear visual indicators and helpful upgrade prompts.