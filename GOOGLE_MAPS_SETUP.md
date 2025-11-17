# Google Maps API Setup Guide

## ✅ What I've Done

I've **re-enabled Google Maps autocomplete** in your form and fixed the configuration issue.

---

## 🔧 What You Need to Do Now

### **Step 1: Update Your `.env.local` File**

Open your `.env.local` file (or create it if it doesn't exist) and **change**:

```env
GOOGLE_PLACES_API_KEY=AIzaSyC59u27HUtncLuxpBVAd1BsDwR4PYWF72k
```

**To:**

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC59u27HUtncLuxpBVAd1BsDwR4PYWF72k
```

### **Why This Change?**

In Next.js, **client-side** environment variables (used in browser JavaScript) **MUST** start with `NEXT_PUBLIC_` prefix.

Without this prefix, the browser cannot access the variable, causing the "can't load Google Maps" error.

---

### **Step 2: Restart Your Dev Server**

After updating the `.env.local` file:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
pnpm dev
```

**Important:** You MUST restart the server after changing environment variables!

---

### **Step 3: Test the Address Input**

1. Navigate to: `http://localhost:3000/get-a-free-quote`
2. Fill out steps 1-5
3. On **Step 6 (Address)**, type an address
4. You should see **autocomplete suggestions** dropdown
5. Select an address from the dropdown
6. Click "Continue"

---

## 📋 Complete `.env.local` File Example

Here's what your complete `.env.local` should look like:

```env
# Google Maps API Key (REQUIRED for address autocomplete)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC59u27HUtncLuxpBVAd1BsDwR4PYWF72k

# Resend API for emails
RESEND_API_KEY=your_resend_api_key_here
CONTACT_FROM=noreply@ultimatesolarenergy.com.au
CONTACT_TO=team@ultimatesolarenergy.com.au

# Database URL (should already be configured in Vercel/Railway)
# DATABASE_URL=postgresql://...
```

---

## 🔍 How to Verify It's Working

### **Success Signs:**
✅ No error messages in browser console  
✅ Dropdown appears when typing address  
✅ Can select address from dropdown  
✅ "Continue" button enables after selection  

### **If Still Not Working:**

1. **Check browser console** (F12 → Console tab)
2. Look for errors like:
   - "Invalid API key" → Key is wrong
   - "API not enabled" → Enable Places API in Google Cloud Console
   - "Request denied" → Check API restrictions

---

## 🌐 Google Cloud Console Setup

If you haven't already, make sure these APIs are **enabled**:

1. Go to: https://console.cloud.google.com/
2. Select your project
3. Navigate to: **APIs & Services** → **Library**
4. Search and enable:
   - ✅ **Places API**
   - ✅ **Maps JavaScript API**
   - ✅ **Geocoding API** (optional, but recommended)

---

## 🔒 API Key Restrictions (Recommended)

For security, restrict your API key:

1. Go to: **APIs & Services** → **Credentials**
2. Click your API key
3. Under **Application restrictions**:
   - Choose "HTTP referrers (web sites)"
   - Add: `localhost:3000/*` (for development)
   - Add: `yourdomain.com/*` (for production)

4. Under **API restrictions**:
   - Choose "Restrict key"
   - Select only:
     - Maps JavaScript API
     - Places API
     - Geocoding API

---

## 💰 Billing Note

Google Maps API requires a billing account, but includes **$200 free credit per month**.

For a small business form:
- **Places Autocomplete**: $2.83 per 1,000 requests
- **$200 credit** = ~70,000 free requests/month
- That's plenty for most businesses!

---

## 🎯 What Changed in the Code

I've updated `app/get-a-free-quote/page.tsx`:

1. ✅ **Re-enabled** Google Maps script loading
2. ✅ **Fixed** API key reference to use `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. ✅ **Restored** autocomplete functionality
4. ✅ **Restored** address validation (checks for lat/lng)

---

## 🚀 Next Steps

1. Update your `.env.local` file (change variable name)
2. Restart dev server (`pnpm dev`)
3. Test the address autocomplete
4. If working locally, push to production
5. Add the same env variable in Vercel/Railway dashboard

---

## 📞 Troubleshooting

### Error: "This page can't load Google Maps correctly"
- **Cause**: API key is missing or invalid
- **Fix**: Check `.env.local` has correct variable name with `NEXT_PUBLIC_` prefix

### Error: "InvalidKeyMapError"
- **Cause**: API key is invalid or restricted
- **Fix**: Verify API key in Google Cloud Console

### Dropdown doesn't appear
- **Cause**: Places API not enabled
- **Fix**: Enable Places API in Google Cloud Console

### "REQUEST_DENIED" error
- **Cause**: API restrictions are too strict
- **Fix**: Add your domain to HTTP referrers

---

## ✨ Summary

**Your API key is valid!** You just need to:
1. Rename it to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in `.env.local`
2. Restart your dev server
3. Test it!

The autocomplete will work perfectly after these steps! 🎉

