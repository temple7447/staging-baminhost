# Folder Deletion API Documentation

## Endpoint
```
DELETE /api/folders/:id
```

## Deletion Requirements by Folder Type

- **Any Folder**: Folder must not contain subfolders.
- **Grandchild (Level 2)**: Can contain materials (as long as they're not protected).
- **Child (Level 1)**: Must delete all grandchild folders before deleting.
- **Parent (Level 0)**: Must delete all descendants (children + grandchildren) before deleting.

## 🗑️ Deletion Order

1. 📁 Grandchild folders (Level 2) → delete first
2. 📋 Child folders (Level 1) → delete second
3. 💼 Parent folders (Level 0) → delete last

## Implementation Notes
- The same endpoint is used for all folder types
- The API will check for the folder type and enforce the appropriate requirements
- Attempting to delete a folder without meeting requirements will result in an error