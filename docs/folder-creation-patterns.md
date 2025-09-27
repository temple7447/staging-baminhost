# Folder Creation API Patterns

## Correct Request Patterns

### 1. Creating Parent Folder (Level 0)
```typescript
// ✅ CORRECT - No parentFolder field for root-level folders
const createParentFolder = {
  name: "Sales & Marketing",
  description: "All sales and marketing materials",
  icon: "megaphone",
  color: "#28a745",
  visibility: "public",
  isProtected: false
  // parentFolder: NOT INCLUDED - this is a root folder
};
```

### 2. Creating Child Folder (Level 1)
```typescript
// ✅ CORRECT - Include parentFolder for child folders
const createChildFolder = {
  name: "Digital Marketing",
  description: "Digital marketing strategies and campaigns",
  parentFolder: "67f5a8b2c3d4e5f6g7h8i9j0", // Parent folder ID
  icon: "monitor",
  color: "#17a2b8",
  visibility: "public",
  isProtected: false
};
```

### 3. Creating Grandchild Folder (Level 2)
```typescript
// ✅ CORRECT - Include parentFolder for grandchild folders
const createGrandchildFolder = {
  name: "Social Media",
  description: "Social media marketing materials",
  parentFolder: "67f5a8b2c3d4e5f6g7h8i9j1", // Child folder ID
  icon: "users",
  color: "#6f42c1",
  isProtected: true,
  allowMaterials: true
};
```

## Implementation in React Components

### CreateFolderModal Component
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  const folderData: any = {
    name: formData.name.trim(),
    icon: formData.icon,
    color: formData.color,
    visibility: formData.visibility,
  };

  // ✅ Only add parentFolder if this is NOT a root-level folder
  if (parentId) {
    folderData.parentFolder = parentId;
  }
  // For root folders, parentFolder field is omitted entirely

  await createFolder(folderData).unwrap();
};
```

## API Request Examples

### Parent Folder Creation
```http
POST /api/folders
Content-Type: application/json

{
  "name": "Sales & Marketing",
  "icon": "megaphone",
  "color": "#28a745",
  "visibility": "public"
}
```

### Child Folder Creation  
```http
POST /api/folders
Content-Type: application/json

{
  "name": "Digital Marketing",
  "parentFolder": "67f5a8b2c3d4e5f6g7h8i9j0",
  "icon": "monitor", 
  "color": "#17a2b8"
}
```

## Key Points

1. **Root folders (Level 0)**: Do NOT include `parentFolder` field
2. **Child folders (Level 1)**: Include `parentFolder` with parent folder ID
3. **Grandchild folders (Level 2)**: Include `parentFolder` with child folder ID
4. **Level validation**: Backend enforces maximum 3 levels
5. **Material storage**: Only Level 2 folders can contain materials

This pattern ensures clean API requests that match the expected backend structure.