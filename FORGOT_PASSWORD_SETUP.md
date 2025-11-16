# 🔐 Forgot Password Feature - Setup Guide

Complete guide for the password reset functionality in Ultimate Solar Energy website.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [Environment Variables](#environment-variables)
4. [API Routes](#api-routes)
5. [Frontend Pages](#frontend-pages)
6. [Email Configuration](#email-configuration)
7. [Testing Guide](#testing-guide)
8. [Security Considerations](#security-considerations)

---

## 🎯 Overview

The forgot password feature allows users to reset their password through a secure email link. The flow works as follows:

```
User enters email → Server generates token → Email sent → User clicks link → New password set
```

### Features:
- ✅ Secure token-based password reset
- ✅ Token expiration (1 hour)
- ✅ Beautiful email templates
- ✅ User-friendly UI
- ✅ Security best practices
- ✅ Development & production modes

---

## 🗄️ Database Schema

### Updated `User` Model

```prisma
model User {
  id                String    @id @default(cuid())
  name              String?
  email             String    @unique
  password          String
  role              Role      @default(USER)
  resetToken        String?   @unique  // 👈 NEW
  resetTokenExpiry  DateTime?          // 👈 NEW
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  posts             Post[]
}
```

### Migration Command:

```bash
pnpm prisma db push
```

Or manually in Supabase SQL Editor:

```sql
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiry" TIMESTAMP(3);
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");
```

---

## 🔧 Environment Variables

Add these to your `.env` file:

```env
# Email Configuration (Resend)
RESEND_API_KEY="re_your_api_key"
CONTACT_FROM="Ultimate Solar Energy <onboarding@resend.dev>"
CONTACT_TO="your-verified-email@gmail.com"

# Base URL (for reset links)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"  # or "production"
```

### How It Works:

- **Development**: All emails redirect to `CONTACT_TO` (sandbox mode)
- **Production**: Emails go to actual user emails

---

## 🛠️ API Routes

### 1. Forgot Password API

**Endpoint**: `POST /api/auth/forgot-password`

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "message": "If an account with that email exists, a password reset link has been sent."
}
```

**What It Does**:
1. Validates email
2. Finds user in database
3. Generates secure reset token (32 bytes)
4. Sets token expiry (1 hour)
5. Sends email with reset link
6. Returns success (even if email doesn't exist - security best practice)

---

### 2. Reset Password API

**Endpoint**: `POST /api/auth/reset-password`

**Request Body**:
```json
{
  "token": "abc123...",
  "password": "newpassword123"
}
```

**Response**:
```json
{
  "message": "Password has been reset successfully. You can now sign in with your new password."
}
```

**What It Does**:
1. Validates token and password
2. Checks token hasn't expired
3. Hashes new password
4. Updates user password
5. Clears reset token
6. Returns success

---

## 🎨 Frontend Pages

### 1. Forgot Password Page

**Route**: `/forgot-password`

**Features**:
- Email input field
- Loading states
- Success/error messages
- Link to sign-in page
- Link to sign-up page

**User Flow**:
```
Enter email → Click "Send Reset Link" → See success message → Check email
```

---

### 2. Reset Password Page

**Route**: `/reset-password?token=abc123...`

**Features**:
- Password input fields
- Password confirmation
- Loading states
- Success/error messages
- Auto-redirect to sign-in on success
- Token validation

**User Flow**:
```
Click email link → Enter new password → Confirm password → Click "Reset" → Auto-redirect to sign-in
```

---

### 3. Sign-In Page Integration

**Updated**: Added "Forgot Password?" link

**Location**: Below password field in sign-in form

```tsx
<Link href="/forgot-password">
  Forgot Password?
</Link>
```

---

## 📧 Email Configuration

### Email Template

The reset email includes:

- 🎨 Professional HTML design
- 🔵 Branded colors (Ultimate Solar Energy theme)
- 🔘 Call-to-action button
- ⚠️ Security warning
- ⏰ Expiry notice (1 hour)
- 📋 Plain text link (as backup)

### Sample Email:

```
Subject: Reset Your Password - Ultimate Solar Energy

Hi [User Name],

We received a request to reset your password for your Ultimate Solar Energy account.

[Reset Password Button]

⚠️ Important: This link will expire in 1 hour for security reasons.

If you didn't request this password reset, you can safely ignore this email.
```

---

## 🧪 Testing Guide

### Step 1: Start Dev Server

```bash
pnpm dev
```

### Step 2: Test Forgot Password Flow

1. Go to: `http://localhost:3000/forgot-password`
2. Enter ANY email (e.g., `test@example.com`)
3. Click "Send Reset Link"
4. Check your inbox: **Email specified in `CONTACT_TO`**

### Step 3: Test Reset Password Flow

1. Open the email
2. Click "Reset Password" button
3. Enter new password (min 6 chars)
4. Confirm password
5. Click "Reset Password"
6. You'll be redirected to sign-in

### Step 4: Test Sign-In

1. Go to: `http://localhost:3000/sign-in`
2. Use the email you reset
3. Use the new password
4. Verify successful login

---

## 🔒 Security Considerations

### 1. **Token Security**
- ✅ Uses `crypto.randomBytes(32)` for secure token generation
- ✅ 256-bit entropy (32 bytes)
- ✅ Tokens stored hashed in database (optional enhancement)

### 2. **Token Expiration**
- ✅ Expires after 1 hour
- ✅ Checked server-side before password reset
- ✅ Cleared after successful use

### 3. **Information Disclosure Prevention**
- ✅ Same response for existing/non-existing emails
- ✅ Prevents email enumeration attacks
- ✅ Logs only on server (not exposed to client)

### 4. **Password Security**
- ✅ Min 6 characters (frontend & backend validation)
- ✅ Hashed with bcrypt (cost factor 10)
- ✅ Never logged or exposed

### 5. **Email Security**
- ✅ HTTPS-only reset links (in production)
- ✅ Single-use tokens
- ✅ No sensitive data in email body

### 6. **Rate Limiting** (Recommended Enhancement)
```typescript
// TODO: Add rate limiting to prevent abuse
// Example: Max 3 requests per hour per IP
```

---

## 🚀 Production Deployment

### Pre-Deployment Checklist:

1. ✅ Verify domain in Resend
2. ✅ Update `CONTACT_FROM` to use your domain:
   ```env
   CONTACT_FROM="Ultimate Solar Energy <noreply@yourdomain.com>"
   ```
3. ✅ Set `NEXT_PUBLIC_BASE_URL` to production URL:
   ```env
   NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
   ```
4. ✅ Set `NODE_ENV=production`
5. ✅ Run database migration
6. ✅ Test forgot password flow on staging
7. ✅ Deploy to Vercel

### Vercel Environment Variables:

Add these in Vercel dashboard (Settings → Environment Variables):

```
RESEND_API_KEY
CONTACT_FROM
NEXT_PUBLIC_BASE_URL
NODE_ENV=production
```

---

## 📊 Flow Diagrams

### Forgot Password Flow:

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌─────────┐
│  User   │────▶│  Server  │────▶│ Database │────▶│  Email  │
└─────────┘     └──────────┘     └──────────┘     └─────────┘
   Enter         Generate         Save token        Send link
   email         token            & expiry          with token
```

### Reset Password Flow:

```
┌─────────┐     ┌──────────┐     ┌──────────┐     ┌─────────┐
│  User   │────▶│  Server  │────▶│ Database │────▶│ Sign-In │
└─────────┘     └──────────┘     └──────────┘     └─────────┘
   Click         Verify           Update           Redirect
   link          token            password         to login
```

---

## 🐛 Troubleshooting

### Issue: Email not received

**Solution**:
1. Check `CONTACT_TO` in `.env`
2. Verify Resend API key
3. Check spam folder
4. Look at server logs for errors

### Issue: Token expired

**Solution**:
- Request new reset link
- Token is valid for 1 hour only

### Issue: Database connection error

**Solution**:
```bash
# Manually add columns in Supabase SQL Editor
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiry" TIMESTAMP(3);
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

# Then generate Prisma client
pnpm prisma generate
```

---

## 📝 Files Created/Modified

### New Files:
- `app/forgot-password/page.tsx`
- `app/reset-password/page.tsx`
- `app/api/auth/forgot-password/route.ts`
- `app/api/auth/reset-password/route.ts`
- `FORGOT_PASSWORD_SETUP.md`

### Modified Files:
- `prisma/schema.prisma` (added reset token fields)
- `app/sign-in/page.tsx` (added forgot password link)

---

## ✅ Feature Complete!

The forgot password feature is fully implemented and ready to use. Test it thoroughly in development before deploying to production.

For questions or issues, refer to this documentation or check the server logs.

---

**Ultimate Solar Energy v1.0.0**  
© 2024 All Rights Reserved
