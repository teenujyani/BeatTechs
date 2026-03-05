# JWT Authentication Implementation

## Overview
This document describes the JWT (JSON Web Token) authentication system implemented in BeatTechs.

## Features
- **JWT Token-based Authentication**: Secure token-based authentication for API endpoints
- **Dark Theme Only**: Application now uses dark theme exclusively
- **Supabase Fallback**: If JWT endpoints are not available, the app falls back to Supabase authentication
- **Token Management**: Automatic token refresh and expiration handling

## Backend Setup

### 1. Install Dependencies
```bash
cd Backend/api
npm install jsonwebtoken bcryptjs
```

### 2. Environment Variables
Create a `.env` file in `Backend/api/` with the following:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key_here_change_in_production
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup (Optional)
If you want to use JWT with a custom users table instead of Supabase Auth:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Verify Token
```
GET /api/auth/verify
Authorization: Bearer eyJhbGc...

Response:
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Logout
```
POST /api/auth/logout

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Frontend Integration

### JWT Utilities (src/utils/jwtAuth.js)
The frontend provides utility functions for token management:

```javascript
import { jwtAuth } from "../utils/jwtAuth";

// Save token and user
jwtAuth.setToken(token, user);

// Get token
const token = jwtAuth.getToken();

// Get user
const user = jwtAuth.getUser();

// Clear token (logout)
jwtAuth.clearToken();

// Check if authenticated
const isAuth = jwtAuth.isAuthenticated();

// Get auth header for API calls
const headers = jwtAuth.getAuthHeader();
```

### AuthContext
The AuthContext now supports both JWT and Supabase authentication:

```javascript
import { useAuth } from "../context/AuthContext";

const { user, token, loading, setToken, setUser } = useAuth();
```

### API Calls with JWT
Use the `apiCall` helper function for automatic JWT token inclusion:

```javascript
import { apiCall } from "../utils/jwtAuth";

const response = await apiCall("/api/protected-route", {
  method: "GET",
});
```

## Theme Configuration

### Dark Theme Only
The application now uses dark theme exclusively:

- **Removed**: Light theme toggle button from header
- **ThemeContext**: Simplified to always use dark theme
- **CSS Variables**: Updated to dark theme colors only

Dark theme colors:
- Background Primary: `#050b3a`
- Background Secondary: `#0b1250`
- Text Primary: `#ffffff`
- Accent: `#7dd3d8`

## Authentication Flow

1. **Registration**:
   - User fills registration form
   - Frontend sends data to `/api/auth/register`
   - Backend hashes password and stores user
   - Backend returns JWT token
   - Frontend stores token in localStorage
   - User is redirected to dashboard

2. **Login**:
   - User fills login form
   - Frontend sends credentials to `/api/auth/login`
   - Backend verifies password
   - Backend returns JWT token
   - Frontend stores token in localStorage
   - User is redirected to dashboard

3. **Protected Routes**:
   - Frontend checks for valid token
   - If no token, redirects to login
   - If token exists, includes it in API requests

4. **Token Expiration**:
   - Tokens expire after 7 days
   - On 401 response, localStorage is cleared
   - User is redirected to login

## Security Considerations

- **Change JWT_SECRET**: Always change the JWT_SECRET in production
- **HTTPS**: Always use HTTPS in production
- **Token Storage**: Tokens are stored in localStorage (suitable for SPAs)
- **Password Hashing**: Passwords are hashed using bcryptjs
- **CORS**: Ensure CORS is properly configured for your frontend domain

## Fallback Authentication

If the JWT endpoints are not available, the application automatically falls back to Supabase authentication:

```javascript
// In Login.jsx and Signup.jsx
if (response.ok) {
  // Use JWT
} else {
  // Fallback to Supabase
}
```

## Migration from Supabase Auth to JWT

If migrating from Supabase Auth:

1. Update Login and Signup components (already done)
2. Set up users table in Supabase
3. Update JWT_SECRET in .env
4. Test registration and login flows
5. Optionally: Migrate existing users' data

## Troubleshooting

### Token Not Stored
- Check browser's localStorage
- Ensure JWT endpoint is returning correct response
- Check browser console for errors

### 401 Unauthorized Errors
- Token may have expired (expires after 7 days)
- Token may be invalid
- Clear localStorage and re-login

### CORS Errors
- Ensure FRONTEND_URL in .env matches your frontend URL
- Check CORS configuration in server.js

### Password Issues
- Ensure bcryptjs is installed: `npm install bcryptjs`
- Check password hashing in register endpoint
