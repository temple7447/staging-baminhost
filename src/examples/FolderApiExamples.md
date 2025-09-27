# 3-Level Folder Hierarchy System

## Folder Structure Overview

**Level 0 (Parent)**: Root-level containers (e.g., "Sales & Marketing")
- ✅ Can have subfolders
- ❌ Cannot have materials
- Purpose: Main category organization

**Level 1 (Child)**: Sub-categories (e.g., "Digital Marketing", "Sales Strategy")
- ✅ Can have subfolders
- ❌ Cannot have materials  
- Purpose: Sub-category organization

**Level 2 (Grandchild)**: Final level where materials are stored (e.g., "Social Media", "Email Marketing")
- ❌ Cannot have subfolders
- ✅ Can have materials
- Purpose: Material storage

## Creating Folders by Level

### Level 0 (Parent) - Root Containers
```json
POST /api/folders
{
  "name": "Sales & Marketing",
  "icon": "briefcase",
  "color": "#007bff"
}
```

### Level 1 (Child) - Sub-categories
```json
POST /api/folders
{
  "name": "Digital Marketing",
  "icon": "folder",
  "color": "#28a745",
  "parentFolder": "{{parentFolderId}}"
}
```

### Level 2 (Grandchild) - Material Folders
```json
POST /api/folders
{
  "name": "Social Media",
  "icon": "fileText",
  "color": "#fd7e14",
  "parentFolder": "{{childFolderId}}"
}
```

## API Integration in Components

### CreateFolderModal Usage

The `CreateFolderModal` component automatically handles both root and child folder creation:

```tsx
// For root folders
<CreateFolderModal
  open={showCreateModal}
  onOpenChange={setShowCreateModal}
  parentId={null} // null for root folder
  onSuccess={handleSuccess}
/>

// For child folders  
<CreateFolderModal
  open={showCreateModal}
  onOpenChange={setShowCreateModal}
  parentId="parent-folder-id" // ID of parent folder
  onSuccess={handleSuccess}
/>
```

### API Calls Made

When creating a root folder:
```json
POST /api/folders
{
  "name": "Sales",
  "icon": "briefcase",
  "color": "#28a745",
  "parentFolder": null
}
```

When creating a child folder:
```json
POST /api/folders
{
  "name": "Digital Marketing", 
  "icon": "briefcase",
  "color": "#007bff",
  "parentFolder": "parent-folder-id"
}
```

## Essential API Endpoints

### Core Folder Operations
- `POST /api/folders` - Create folders (with level validation)
- `GET /api/folders` - View hierarchy tree
- `GET /api/folders/for-materials` - Get folders that can hold materials (Level 2 only)
- `GET /api/folders/:id` - Get single folder with details
- `GET /api/folders/:id/contents` - Get folder contents (subfolders + materials)

### Material Operations
- `POST /api/materials` - Upload materials to Level 2 folders only
- `GET /api/materials?folderId=:id` - Get materials in specific folder

## System Capabilities

### Automatic Features
- ✅ **Automatic Path Generation**: Creates fullPath like "Sales & Marketing/Digital Marketing/Social Media"
- ✅ **Level-Based Capabilities**: Enforces canHaveSubfolders/canHaveMaterials rules
- ✅ **Validation & Protection**: Prevents >3 levels, blocks circular references, enforces unique names
- ✅ **Rich Metadata**: Visual customization (icons, colors), access control, statistics tracking

### Level-Based Restrictions
- **Parent/Child folders**: `canHaveSubfolders: true`, `canHaveMaterials: false`
- **Grandchild folders**: `canHaveSubfolders: false`, `canHaveMaterials: true`
- **Maximum Depth**: 3 levels (0, 1, 2)
- **Material Upload**: Only to Level 2 (Grandchild) folders

## Available Icons & Colors

### Icons (20 available):
- folder, briefcase, book, users, settings
- heart, star, home, building, graduationCap
- target, shield, camera, music, video
- fileText, image, code, database, globe

### Colors (12 available):
- #28a745 (Green), #007bff (Blue), #6f42c1 (Purple)
- #fd7e14 (Orange), #dc3545 (Red), #17a2b8 (Teal)
- #ffc107 (Yellow), #e83e8c (Pink), #6c757d (Gray)
- #20c997 (Success), #0dcaf0 (Cyan), #198754 (Dark Green)