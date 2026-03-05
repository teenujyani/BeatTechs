# Quick Start: JWT Authentication & Dark Theme

## What's New?

### 🔐 JWT Authentication
Your app now supports JWT (JSON Web Token) authentication! Users can register and login without relying solely on Supabase Auth.

### 🌙 Dark Theme Only
The application now uses dark theme exclusively. The light theme toggle has been removed.

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd Backend/api
npm install
```

### 2. Set Environment Variables
Create `Backend/api/.env`:
```bash
JWT_SECRET=your_super_secret_key_12345
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_key
STRIPE_SECRET_KEY=your_stripe_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Application

**Terminal 1 - Frontend**:
```bash
npm run dev
```

**Terminal 2 - Backend**:
```bash
cd Backend/api
node server.js
```

## Testing JWT Authentication

### Using Postman or cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Verify Token:**
```bash
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## In-App Testing

1. **Register**: Go to `/signup` → Fill form → Submit
2. **Login**: Go to `/login` → Enter credentials → Submit
3. **Check Token**: Open DevTools → Application → LocalStorage → Look for `auth_token`
4. **Access Dashboard**: After login, you should see your dashboard
5. **Logout**: Click your profile circle → Logout

## File Structure

```
BeatTechs/
├── src/
│   ├── utils/
│   │   └── jwtAuth.js          ← NEW: Token management
│   ├── context/
│   │   ├── AuthContext.jsx      ← UPDATED: JWT support
│   │   └── ThemeContext.jsx     ← UPDATED: Dark only
│   ├── component/
│   │   └── Header.jsx           ← UPDATED: Theme toggle removed
│   ├── pages/
│   │   ├── Login.jsx            ← UPDATED: JWT support
│   │   └── Signup.jsx           ← UPDATED: JWT support
│   └── index.css                ← UPDATED: Dark theme only
│
├── Backend/
│   └── api/
│       ├── server.js            ← UPDATED: JWT endpoints added
│       ├── middleware.js        ← NEW: JWT verification
│       └── .env.example         ← NEW: Env template
│
└── Documentation/
    ├── JWT_AUTHENTICATION.md     ← NEW: Full JWT guide
    └── IMPLEMENTATION_SUMMARY.md ← NEW: What changed
```

## Key Components

### Frontend JWT Utilities (src/utils/jwtAuth.js)
```javascript
import { jwtAuth } from "../utils/jwtAuth";

// Save token after login
jwtAuth.setToken(token, user);

// Get token for API calls
const token = jwtAuth.getToken();

// Check if logged in
if (jwtAuth.isAuthenticated()) {
  // User is logged in
}

// Clear on logout
jwtAuth.clearToken();
```

### Using Auth Context
```javascript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user, token, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) return <div>Please login</div>;
  
  return <div>Welcome, {user.name}!</div>;
}
```

## Troubleshooting

### "Cannot find module 'jsonwebtoken'"
```bash
npm install jsonwebtoken bcryptjs
```

### "ECONNREFUSED" when trying to register/login
- Make sure backend is running on port 5000
- Check VITE_API_URL is correct

### "Invalid token"
- Token may have expired (7 days)
- Clear localStorage and re-login

### Dark theme not applying
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

## Dark Theme Colors

Want to customize? Check `src/index.css`:

```css
:root {
  --bg-primary: #050b3a;      /* Dark blue */
  --bg-secondary: #0b1250;    /* Slightly lighter */
  --text-primary: #ffffff;    /* White text */
  --accent: #7dd3d8;          /* Cyan accent */
}
```

## What Happened to Light Theme?

- ✅ Removed light theme toggle button from header
- ✅ Removed light mode CSS classes
- ✅ Updated ThemeContext to always use dark theme
- ✅ Updated all components to dark theme styling

## Important Security Notes

1. **Change JWT_SECRET**: Never use the default in production!
2. **Use HTTPS**: Always use HTTPS in production
3. **Token Expiration**: Tokens expire after 7 days
4. **Password Hashing**: Passwords are hashed with bcryptjs

## Next Steps

1. ✅ Test registration/login
2. ✅ Verify dark theme looks good
3. ✅ Test API endpoints
4. ✅ Create .env file with real values
5. ✅ Deploy to production

## Support

For detailed documentation, see:
- `JWT_AUTHENTICATION.md` - Full JWT guide
- `IMPLEMENTATION_SUMMARY.md` - Complete change log
- Backend: `Backend/api/.env.example` - Environment template

## Commands Reference

```bash
# Install all dependencies
npm install
cd Backend/api && npm install

# Run frontend (port 5173)
npm run dev

# Run backend (port 5000)
cd Backend/api && node server.js

# Build for production
npm run build

# Lint code
npm run lint
```

---

**Enjoy your new JWT authentication and dark theme! 🚀**
