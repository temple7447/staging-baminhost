# Media Upload API Implementation

## Overview
The media upload feature has been implemented using your existing API endpoints in a two-step process:

1. **Upload files to Cloudinary** via `/api/upload/image` and `/api/upload/video`
2. **Attach media to tenant record** via `/api/tenants/:id/history`

## API Endpoints Used

### 1. Image Upload
```bash
curl -X POST http://localhost:5000/api/upload/image \
  -H "Authorization: Bearer {{JWT_TOKEN}}" \
  -F "file=@/absolute/path/to/photo.jpg"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "secure_url": "https://res.cloudinary.com/xxx/image/upload/v123/photo1.jpg",
    "public_id": "uploads/abc123",
    "resource_type": "image",
    "format": "jpg",
    "bytes": 245760,
    "width": 1920,
    "height": 1080
  }
}
```

### 2. Video Upload
```bash
curl -X POST http://localhost:5000/api/upload/video \
  -H "Authorization: Bearer {{JWT_TOKEN}}" \
  -F "file=@/absolute/path/to/video.mp4"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "secure_url": "https://res.cloudinary.com/xxx/video/upload/v123/vid1.mp4",
    "public_id": "uploads/def456",
    "resource_type": "video",
    "format": "mp4",
    "bytes": 5242880,
    "duration": 30.5
  }
}
```

### 3. Attach to Tenant History
```bash
curl -X POST http://localhost:5000/api/tenants/:id/history \
  -H "Authorization: Bearer {{JWT_TOKEN}}" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "moved_in",
    "note": "Initial condition before letting", 
    "meta": {
      "condition": "initial",
      "takenAt": "2025-11-07T19:37:29Z",
      "photos": [
        {
          "url": "https://res.cloudinary.com/xxx/image/upload/v123/photo1.jpg",
          "public_id": "uploads/abc123"
        }
      ],
      "videos": [
        {
          "url": "https://res.cloudinary.com/xxx/video/upload/v123/vid1.mp4", 
          "public_id": "uploads/def456"
        }
      ]
    }
  }'
```

## Frontend Implementation

### Files Created/Modified:

1. **`/src/services/uploadApi.ts`** - New API service for uploads
2. **`/src/store/store.ts`** - Added uploadApi to Redux store  
3. **`/src/components/ui/MediaUpload.tsx`** - Updated to use real API
4. **`/src/components/ui/PropertyMediaDisplay.tsx`** - Display uploaded media
5. **`/src/components/dashboard/business/TenantDetailPage.tsx`** - Integration

### How It Works:

1. **User selects files** in the MediaUpload component
2. **Preview shown** with thumbnails before upload
3. **Upload button clicked** triggers the two-step process:
   - Step 1: Upload each file to Cloudinary
   - Step 2: Save media URLs to tenant history
4. **Progress shown** during upload process
5. **Media displayed** in PropertyMediaDisplay from tenant history

### Retrieving Uploaded Media:

The uploaded media is stored in tenant history with `event: "moved_in"`. To retrieve:

```bash
# Get tenant with history expanded
curl -X GET http://localhost:5000/api/tenants/:id?expand=history \
  -H "Authorization: Bearer {{JWT_TOKEN}}"

# Or get history separately and filter
curl -X GET http://localhost:5000/api/tenants/:id/history \
  -H "Authorization: Bearer {{JWT_TOKEN}}"
```

Filter history entries where `event === "moved_in"` and extract `meta.photos` and `meta.videos`.

## Usage

```tsx
// In TenantDetailPage
<MediaUpload 
  tenantId={tenantId}
  onUpload={handleMediaUpload} 
  maxImages={12} 
  maxVideos={1} 
/>

// Display uploaded media
<PropertyMediaDisplay 
  media={propertyMedia}      // Legacy media
  historyMedia={historyMedia} // From tenant history
  isLoading={mediaLoading}
/>
```

## Error Handling

- **File validation**: Checks file types and limits
- **Upload failures**: Individual file errors don't stop other uploads
- **Network errors**: Proper error messages with retry option
- **Progress feedback**: Shows current upload status

## Security Notes

- **JWT Authentication**: Required for all API calls
- **File type validation**: Both frontend and backend should validate
- **File size limits**: Should be enforced on backend
- **Cloudinary security**: Uses your existing Cloudinary configuration