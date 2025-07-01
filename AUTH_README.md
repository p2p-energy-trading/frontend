# EnerLink P2P Energy Trading - Authentication System

## Overview

Sistem autentikasi telah diimplementasi menggunakan JWT Bearer Token yang terintegrasi dengan backend NestJS. Sistem ini menggunakan DaisyUI untuk komponen UI yang konsisten dengan desain project.

## Fitur Autentikasi

- ✅ **Login & Register** dengan JWT Bearer Token
- ✅ **Protected Routes** - halaman yang memerlukan login
- ✅ **Auto Token Verification** - verifikasi token saat aplikasi dimuat
- ✅ **Token Expiry Handling** - auto logout jika token expired
- ✅ **Logout Functionality** - logout dari single device atau semua device
- ✅ **Responsive UI** menggunakan DaisyUI
- ✅ **Error Boundary** untuk handling error aplikasi

## Struktur Files

```
src/
├── components/
│   ├── ErrorBoundary.jsx          # Error boundary untuk handle crash
│   └── ProtectedRoute.jsx         # Component untuk protect route
├── context/
│   └── AuthContext.jsx           # Context untuk auth state management
├── pages/
│   ├── Login/
│   │   └── Login.jsx             # Halaman login dengan DaisyUI
│   └── Register/
│       └── Register.jsx          # Halaman register dengan DaisyUI
├── utils/
│   └── api.js                    # Helper functions untuk API calls
├── base/
│   ├── Navbar.jsx                # Updated dengan logout functionality
│   └── Drawer.jsx                # Updated dengan conditional menu
└── main.jsx                      # Updated dengan AuthProvider & routing
```

## Penggunaan

### 1. AuthContext Hook

```jsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();
  
  // Cek status login
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;
  
  return <div>Welcome, {user.name}!</div>;
};
```

### 2. Protected Route

```jsx
// Otomatis redirect ke /login jika belum login
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### 3. API Calls dengan Token

```jsx
import { apiCall } from '../utils/api';

// Token otomatis disertakan dalam header
const response = await apiCall('/api/some-endpoint', {
  method: 'POST',
  body: JSON.stringify({ data: 'example' })
});
```

## Backend Integration

Sistem ini terintegrasi dengan backend NestJS dengan endpoint:

- `POST /auth/login` - Login dengan email & password
- `POST /auth/register` - Register prosumer baru
- `GET /auth/profile` - Get user profile (protected)
- `POST /auth/logout` - Logout single device
- `POST /auth/logout-all` - Logout semua device

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `GET /auth/profile` - Get user profile with wallets and meters
- `POST /auth/logout` - User logout

### Wallet Management
- `POST /wallet/create` - Create or import wallet
  - Body: `{ walletName, importMethod: 'GENERATED' | 'IMPORTED_PRIVATE_KEY', privateKey? }`
- `GET /wallet/list` - List user's wallets
- `GET /wallet/:walletAddress` - Get specific wallet details
- `POST /wallet/:walletAddress/activate` - Activate wallet
- `POST /wallet/:walletAddress/deactivate` - Deactivate wallet
- `POST /wallet/:walletAddress/primary` - Set wallet as primary
- `GET /wallet/:walletAddress/balances` - Get wallet token balances (ETK, IDRS)

### IDRS Conversion
- `POST /wallet/idrs-conversion` - Convert between IDR and IDRS
  - Body: `{ walletAddress, conversionType: 'ON_RAMP' | 'OFF_RAMP', amount }`
- `GET /wallet/:walletAddress/conversions` - Get conversion history

## Routing

### Public Routes
- `/` - Homepage (accessible untuk semua)
- `/login` - Login page
- `/register` - Register page

### Protected Routes (memerlukan login)
- `/dashboard` - Dashboard umum platform
- `/dashboard-user` - Dashboard personal user
- `/trade` - Trading ETK/IDRS
- `/power-conversion` - Energy conversion
- `/balance-conversion` - Balance conversion
- `/smart-meter` - Smart meter monitoring
- `/wallet` - Wallet management

## Environment Variables

Buat file `.env` di root project:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_NAME=EnerLink
REACT_APP_ENV=development
```

## UI Components

### Login Form
- Email & password input dengan validation
- Loading state saat login
- Error handling dengan alert
- Link ke register page

### Register Form
- Full name, email, password, confirm password
- Password strength validation
- Error handling
- Link ke login page

### Navbar
- User avatar dropdown
- Logout functionality
- Conditional display berdasarkan auth status

### Drawer/Sidebar
- Menu berbeda untuk authenticated vs non-authenticated users
- Icons menggunakan Heroicons

## Security Features

- JWT token disimpan di localStorage
- Auto token verification saat app load
- Auto logout jika token expired (401 response)
- Protected routes dengan ProtectedRoute component
- CSRF protection melalui proper headers

## Development

1. **Start backend** terlebih dahulu di port 3001
2. **Start React app**:
   ```bash
   npm run dev
   ```
3. **Test authentication**:
   - Register user baru
   - Login dengan credentials
   - Akses protected routes
   - Test logout functionality

## Error Handling

- Network errors ditangani dengan user-friendly messages
- Token expiry auto-redirect ke login
- Form validation errors
- Error boundary untuk crash protection

## Next Steps

1. **Add "Remember Me"** functionality
2. **Implement refresh tokens** untuk better security
3. **Add password reset** functionality
4. **Social login integration** (optional)
5. **Two-factor authentication** (optional)
6. **Session management** improvements

## Troubleshooting

### Token Issues
- Pastikan backend berjalan di port 3001
- Check browser network tab untuk response errors
- Verify JWT secret antara frontend dan backend

### Routing Issues
- Pastikan React Router version kompatibel
- Check browser console untuk routing errors
- Verify protected route configurations

### UI Issues
- Pastikan DaisyUI theme configuration
- Check Tailwind CSS classes
- Verify component import paths
