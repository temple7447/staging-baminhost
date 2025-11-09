# API Payload Structure Test

## Expected Backend API Request (from your specification):

```bash
curl -X POST "http://localhost:5000/api/estates/64f1a1.../tenants" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {{JWT_TOKEN}}" \
  -d '{
    "unitLabel": "Unit 12",
    "firstName": "Ada",
    "surname": "Obi", 
    "otherNames": "Chinonso",
    "email": "ada@example.com",
    "whatsapp": "+2348012345678",
    "rentAmount": 250000,
    "tenantType": "new",
    "electricMeterNumber": "EM-44902",
    "nextDueDate": "15/12/2025"
  }'
```

## Updated Frontend Payload (matches your API):

The `submitTenant` function now sends:

```typescript
{
  unitLabel: "Unit 12",                    // ✅ matches
  firstName: "Ada",                        // ✅ matches  
  surname: "Obi",                         // ✅ matches
  otherNames: "Chinonso",                 // ✅ matches (optional)
  email: "ada@example.com",               // ✅ matches (optional)
  whatsapp: "+2348012345678",             // ✅ matches (optional)
  rentAmount: 250000,                     // ✅ matches (number)
  tenantType: "new",                      // ✅ matches
  electricMeterNumber: "EM-44902",        // ✅ matches (optional)
  nextDueDate: "15/12/2025"              // ✅ matches DD/MM/YYYY format
}
```

## Key Changes Made:

1. **Field Names Updated:**
   - `tenantEmail` → `email`
   - `whatsappNumber` → `whatsapp`
   - Removed `tenantName` (not needed in creation payload)
   - Removed `status` (not in your API spec)

2. **Date Format:**
   - Frontend date input: `YYYY-MM-DD` (HTML date input)
   - API payload: `DD/MM/YYYY` (converted automatically)

3. **Required vs Optional:**
   - **Required:** `unitLabel`, `firstName`, `surname`, `rentAmount`
   - **Optional:** `otherNames`, `email`, `whatsapp`, `tenantType`, `electricMeterNumber`, `nextDueDate`

4. **Form Validation:**
   - First name and surname are required for form submission
   - Unit label and rent amount are required
   - All other fields are optional

## Data Flow:

1. **User fills form** with separate name fields
2. **Form validates** required fields (firstName, surname, unitLabel, rentAmount)
3. **API payload created** with exact field names your backend expects
4. **Date converted** from `YYYY-MM-DD` to `DD/MM/YYYY`
5. **Request sent** to `POST /api/estates/:estateId/tenants`

## Backward Compatibility:

The frontend still supports displaying tenants with old field structure:
- Shows `tenantName` if available, falls back to combining `firstName + otherNames + surname`
- Shows `whatsapp` first, then `whatsappNumber`, then `tenantPhone`
- Shows `email` first, then `tenantEmail`