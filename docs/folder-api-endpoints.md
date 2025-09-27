# Folder Creation API Endpoints

## Overview

The folder system now uses specific endpoints for each folder level to ensure proper hierarchy validation and prevent confusion about which level is being created.

## API Endpoints

### 1. POST /api/folders/parent
**Creates parent folders only (Level 0)**
- No `parentFolder` field allowed
- Level is automatically set to 0
- Can have subfolders but cannot have materials

```typescript
// TypeScript Interface
interface CreateParentFolderRequest {
  name: string;
  description?: string;
  icon: string;
  color: string;
  visibility?: 'public' | 'private' | 'restricted' | 'managers_only' | 'role_specific';
  allowedRoles?: string[];
  isProtected?: boolean;
  // Note: NO parentFolder field
}
```

```http
POST /api/folders/parent
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Sales & Marketing",
  "description": "All sales and marketing related materials",
  "icon": "megaphone",
  "color": "#28a745",
  "visibility": "public",
  "isProtected": false
}
```

### 2. POST /api/folders/child
**Creates child folders only (Level 1)**
- `parentFolder` field is required
- Parent must be a Level 0 folder
- Can have subfolders but cannot have materials

```typescript
// TypeScript Interface
interface CreateChildFolderRequest {
  name: string;
  description?: string;
  parentFolder: string; // Required - must be Level 0 folder ID
  icon: string;
  color: string;
  visibility?: 'public' | 'private' | 'restricted' | 'managers_only' | 'role_specific';
  allowedRoles?: string[];
  isProtected?: boolean;
}
```

```http
POST /api/folders/child
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Digital Marketing",
  "description": "Digital marketing strategies and campaigns",
  "parentFolder": "67f5a8b2c3d4e5f6g7h8i9j0",
  "icon": "monitor",
  "color": "#17a2b8",
  "visibility": "public"
}
```

### 3. POST /api/folders/grandchild
**Creates grandchild folders only (Level 2)**
- `parentFolder` field is required
- Parent must be a Level 1 folder
- Cannot have subfolders but can have materials

```typescript
// TypeScript Interface
interface CreateGrandchildFolderRequest {
  name: string;
  description?: string;
  parentFolder: string; // Required - must be Level 1 folder ID
  icon: string;
  color: string;
  visibility?: 'public' | 'private' | 'restricted' | 'managers_only' | 'role_specific';
  allowedRoles?: string[];
  isProtected?: boolean;
  allowMaterials?: boolean;
}
```

```http
POST /api/folders/grandchild
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Social Media",
  "description": "Social media marketing materials and templates",
  "parentFolder": "67f5a8b2c3d4e5f6g7h8i9j1",
  "icon": "users",
  "color": "#6f42c1",
  "isProtected": true,
  "allowMaterials": true
}
```

## Frontend Implementation

### RTK Query Hooks

```typescript
import {
  useCreateParentFolderMutation,
  useCreateChildFolderMutation,
  useCreateGrandchildFolderMutation
} from '@/services/foldersApi';

// Usage in components
const [createParentFolder, { isLoading: isCreatingParent }] = useCreateParentFolderMutation();
const [createChildFolder, { isLoading: isCreatingChild }] = useCreateChildFolderMutation();
const [createGrandchildFolder, { isLoading: isCreatingGrandchild }] = useCreateGrandchildFolderMutation();
```

### Smart Creation Function

```typescript
const createFolder = async (parentFolderId: string | null, folderData: any) => {
  if (!parentFolderId) {
    // Creating Parent Folder (Level 0)
    return await createParentFolder({
      name: folderData.name,
      icon: folderData.icon,
      color: folderData.color,
      // No parentFolder field
    });
  } else {
    // Determine parent folder level to decide endpoint
    const parentFolder = await getFolder(parentFolderId);
    
    if (parentFolder.level === 0) {
      // Creating Child Folder (Level 1)
      return await createChildFolder({
        ...folderData,
        parentFolder: parentFolderId,
      });
    } else if (parentFolder.level === 1) {
      // Creating Grandchild Folder (Level 2)
      return await createGrandchildFolder({
        ...folderData,
        parentFolder: parentFolderId,
      });
    } else {
      throw new Error('Cannot create folders beyond Level 2');
    }
  }
};
```

## Validation Rules

### Parent Folder (Level 0)
- ✅ No `parentFolder` field allowed
- ✅ Can create child folders
- ❌ Cannot have materials
- ✅ Forms root of hierarchy

### Child Folder (Level 1)  
- ✅ `parentFolder` field required
- ✅ Parent must be Level 0 folder
- ✅ Can create grandchild folders
- ❌ Cannot have materials

### Grandchild Folder (Level 2)
- ✅ `parentFolder` field required  
- ✅ Parent must be Level 1 folder
- ❌ Cannot create subfolders (maximum depth reached)
- ✅ Can have materials

## Error Handling

### Common Error Responses

```json
// Parent folder creation with parentFolder (should fail)
{
  "success": false,
  "message": "Parent folder creation failed",
  "errors": [
    {
      "field": "parentFolder",
      "message": "Parent folders cannot have a parent folder"
    }
  ]
}

// Child folder with invalid parent (should fail)
{
  "success": false,
  "message": "Child folder creation failed - parent must be Level 0 folder",
  "errors": [
    {
      "field": "parentFolder", 
      "message": "Parent folder must be a Level 0 (parent) folder"
    }
  ]
}

// Grandchild folder with invalid parent (should fail)
{
  "success": false,
  "message": "Grandchild folder creation failed - parent must be Level 1 folder",
  "errors": [
    {
      "field": "parentFolder",
      "message": "Parent folder must be a Level 1 (child) folder"
    }
  ]
}
```

## Complete Example Workflow

```typescript
// Step 1: Create Parent Folder
const createHierarchyExample = async () => {
  try {
    // Parent Folder (Level 0)
    const parent = await createParentFolder({
      name: "Sales & Marketing",
      icon: "megaphone", 
      color: "#28a745"
    });
    
    // Child Folder (Level 1)
    const child = await createChildFolder({
      name: "Digital Marketing",
      parentFolder: parent.data._id,
      icon: "monitor",
      color: "#17a2b8"
    });
    
    // Grandchild Folder (Level 2) 
    const grandchild = await createGrandchildFolder({
      name: "Social Media",
      parentFolder: child.data._id,
      icon: "users",
      color: "#6f42c1",
      allowMaterials: true
    });
    
    console.log('Hierarchy created successfully!');
    console.log('Parent ID:', parent.data._id);
    console.log('Child ID:', child.data._id);  
    console.log('Grandchild ID:', grandchild.data._id);
    
  } catch (error) {
    console.error('Failed to create hierarchy:', error);
  }
};
```

## Benefits of This Approach

1. **Clear Intent**: Each endpoint has a specific purpose
2. **Better Validation**: Server can validate appropriate parent levels
3. **Type Safety**: TypeScript interfaces prevent incorrect usage
4. **Error Prevention**: Impossible to accidentally create wrong hierarchy
5. **API Documentation**: Clear endpoint documentation for each level
6. **Frontend Simplicity**: Smart components can choose the right endpoint automatically

## Migration Notes

- The legacy `POST /api/folders` endpoint is still available for backward compatibility
- New code should use the specific endpoints for better validation and clarity
- Existing folder creation logic can be updated gradually to use the new endpoints