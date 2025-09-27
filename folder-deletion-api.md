# Folder Deletion API Documentation

## Deletion Requirements by Folder Type

| Folder Type | Endpoint | Requirements |
|-------------|----------|--------------|
| Any Folder | DELETE /api/folders/:id | Must be empty of subfolders |
| Grandchild | DELETE /api/folders/:id | Can have materials if not protected |
| Child | DELETE /api/folders/:id | Must delete grandchildren first |
| Parent | DELETE /api/folders/:id | Must delete all descendants first |

## Deletion Order

1. 📁 Grandchild folders (Level 2) - Delete first
2. 📋 Child folders (Level 1) - Delete second
3. 💼 Parent folders (Level 0) - Delete last

## Summary

- **Any Folder**: DELETE /api/folders/:id - Folder must not contain subfolders.
- **Grandchild**: DELETE /api/folders/:id - Can contain materials (as long as they're not protected).
- **Child**: DELETE /api/folders/:id - Must delete all grandchild folders before deleting.
- **Parent**: DELETE /api/folders/:id - Must delete all descendants (children + grandchildren) before deleting.

### 🗑️ Deletion Order
📁 Grandchild folders (Level 2) → delete first
📋 Child folders (Level 1) → delete second
💼 Parent folders (Level 0) → delete last