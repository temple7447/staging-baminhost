# Redux Setup with RTK Query

This project has been configured with Redux Toolkit and RTK Query for state management and API calls.

## File Structure

```
src/
├── services/
│   ├── authApi.ts          # RTK Query API slice for authentication
│   └── index.ts            # Export all API services
├── store/
│   ├── authSlice.ts        # Redux slice for auth state
│   ├── hooks.ts            # Typed Redux hooks
│   ├── store.ts            # Redux store configuration
│   └── index.ts            # Export all store-related items
├── types/
│   └── auth.ts             # TypeScript types for auth
└── components/
    └── auth/
        └── LoginExample.tsx # Example component using the login API
```

## Usage

### 1. Using the Login API

```tsx
import React, { useState } from 'react';
import { useLoginMutation } from '../../services/authApi';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/authSlice';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({
        token: result.token,
        user: result.user
      }));
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    // Your login form JSX here
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
};
```

### 2. Accessing Auth State

```tsx
import { useAppSelector } from '../../store/hooks';

const SomeComponent = () => {
  const { isAuthenticated, user, token } = useAppSelector(state => state.auth);
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

### 3. Logout

```tsx
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/authSlice';

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return <button onClick={handleLogout}>Logout</button>;
};
```

## API Configuration

- **Base URL**: `https://bamihustle-backend.onrender.com`
- **Login Endpoint**: `/api/auth/login`
- **Method**: POST
- **Expected Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "role": "super_admin",
      "isActive": true,
      "emailVerified": true,
      "lastLogin": "2025-01-17T04:43:47.789Z",
      "createdAt": "2025-01-16T07:00:14.150Z"
    }
  }
  ```

## Adding More API Endpoints

To add more endpoints to the auth API, edit `src/services/authApi.ts`:

```tsx
export const authApi = createApi({
  // ... existing config
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      // ... existing login endpoint
    }),
    // Add new endpoints here
    getUserProfile: builder.query<User, void>({
      query: () => '/api/auth/profile',
      providesTags: ['Auth'],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: '/api/auth/profile',
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export the auto-generated hooks
export const { 
  useLoginMutation, 
  useGetUserProfileQuery, 
  useUpdateProfileMutation 
} = authApi;
```

## Dependencies Installed

- `@reduxjs/toolkit`: Redux Toolkit for state management
- `react-redux`: React bindings for Redux

The setup is complete and ready to use!