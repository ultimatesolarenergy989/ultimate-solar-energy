# Security Setup Guide

## 🔒 Required Environment Variables

Add these variables to your `.env` file:

### JWT Configuration (CRITICAL)

```env
# Generate a secure random secret (minimum 32 characters, recommended 64+)
# Generate using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="your-very-long-random-secret-key-change-this-in-production-minimum-32-characters"

# JWT token expiration time (default: 7 days)
JWT_EXPIRES_IN="7d"
```

### Existing Database & Supabase Configuration

Your existing `.env` should already have these:

```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
```

## 🚀 Setup Steps

### 1. Generate JWT Secret

Run this command in your terminal to generate a secure random secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and add it to your `.env` file as `JWT_SECRET`.

### 2. Run Database Migration

The Session model needs to be added to your database:

```bash
pnpm prisma migrate dev --name add-sessions
pnpm prisma generate
```

### 3. Restart Development Server

```bash
# Stop current server (Ctrl+C)
pnpm dev
```

## 🛡️ Security Features Implemented

### ✅ JWT (JSON Web Tokens)
- Signed tokens that cannot be forged
- Automatic expiration (7 days default)
- Stored in HTTP-only cookies

### ✅ Database Session Management
- Each login creates a session record
- Sessions can be invalidated (logout deletes session)
- Track IP address and user agent for audit
- Expired sessions are automatically cleaned up

### ✅ Rate Limiting
- **Login**: 5 attempts per 15 minutes per IP
- **Registration**: 3 attempts per hour per IP
- Prevents brute force attacks

### ✅ Password Security
- **Minimum 8 characters**
- **Requires**: uppercase, lowercase, number, special character
- **Blocks common passwords** (password123, etc.)
- **bcrypt hashing** with 12 rounds (increased from 10)

### ✅ Token Validation
- Middleware verifies JWT on every dashboard request
- Checks if session exists in database
- Validates expiration time
- Auto-logout on invalid/expired tokens

### ✅ CSRF Protection
- `sameSite: 'strict'` cookie attribute
- HTTP-only cookies (no JavaScript access)
- Origin validation

## 🔍 How It Works

### Login Flow

1. User enters email/password
2. Rate limit check (5 per 15 min)
3. Verify credentials with bcrypt
4. Create session in database
5. Generate JWT with session ID
6. Set HTTP-only cookie
7. User redirected to dashboard

### Dashboard Access

1. Middleware checks for auth cookie
2. Verifies JWT signature
3. Checks if session exists in DB
4. Validates expiration
5. Allows access or redirects to login

### Logout Flow

1. User clicks logout
2. Session deleted from database
3. Cookie cleared
4. User redirected to sign-in

## 🚨 Security Checklist

- [ ] Generated strong JWT_SECRET (64+ characters)
- [ ] Added JWT_SECRET to `.env` file
- [ ] Ran database migration
- [ ] Never commit `.env` file to Git
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Monitor failed login attempts

## 📊 Session Management

### View Active Sessions

```sql
SELECT * FROM sessions WHERE "userId" = 'user-id-here';
```

### Revoke All User Sessions

```sql
DELETE FROM sessions WHERE "userId" = 'user-id-here';
```

### Clean Expired Sessions

```sql
DELETE FROM sessions WHERE "expiresAt" < NOW();
```

## ⚠️ Production Recommendations

1. **Use Redis for rate limiting** (current implementation is in-memory)
2. **Enable HTTPS only** (`secure: true` in cookies)
3. **Add audit logging** for sensitive operations
4. **Implement 2FA** for admin accounts
5. **Set up monitoring** for suspicious activity
6. **Regular security audits**
7. **Keep JWT_SECRET secret** - never expose it

## 🔐 Password Requirements

Users must create passwords with:
- ✅ Minimum 8 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special character (@$!%*?&#, etc.)
- ✅ Not a common password

## 🆘 Troubleshooting

### "JWT_SECRET environment variable is not set"

Add `JWT_SECRET` to your `.env` file with a long random string.

### "Session expired or invalid"

User's session was deleted or expired. They need to log in again.

### "Too many login attempts"

Rate limit reached. Wait 15 minutes or use a different IP.

## 📞 Support

For security concerns, please contact your development team immediately.

---

**Last Updated**: January 2025
**Security Level**: Enterprise Grade 🔒

