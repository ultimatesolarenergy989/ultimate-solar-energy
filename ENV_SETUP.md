# Environment Variables Setup

Add these environment variables to your `.env` file:

```env
# Resend Email API Key
RESEND_API_KEY=re_fTeTecjF_LfGPg7wj9kMraqvbB9KdWwoo

# Email Configuration for Contact Form
CONTACT_FROM="Ultimate Solar Energy <noreply@ultimatesolarenergy.com.au>"
CONTACT_TO="team@ultimatesolarenergy.com.au"

# Google reCAPTCHA v3 (for contact form security)
#RECAPTCHA_SECRET_KEY=6LfRKwIsAAAAAHhe9X_99hI7LeqMiQW7rLa3228y
```

## Variable Descriptions

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `RESEND_API_KEY` | API key for Resend email service | `re_xxxxx...` |
| `CONTACT_FROM` | Email address that sends contact form emails (must be verified in Resend) | `"Your Company <noreply@example.com>"` |
| `CONTACT_TO` | Admin email address to receive contact form submissions | `"admin@example.com"` |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 secret key for server-side verification | `6LfRKwIsAAAAA...` |

## After Adding Variables

1. Save the `.env` file
2. Restart your development server:
   ```bash
   pnpm dev
   ```

## Contact Form Flow

1. **Customer fills form** → reCAPTCHA v3 verifies they're human (invisible)
2. **Form submitted** → Backend verifies reCAPTCHA token
3. **Data saved** → Contact information stored in database
4. **Admin notification** → Email sent to `CONTACT_TO` from `CONTACT_FROM`
5. **Customer confirmation** → Email sent to customer's email from `CONTACT_FROM`

## Important Notes - Email

- The `CONTACT_FROM` email must be verified in your Resend account
- If you're using Resend's sandbox mode, emails will only send to verified addresses
- To send to any email address, you need to add and verify your domain in Resend
- Default fallback values are set in the code if variables are not provided

## Important Notes - reCAPTCHA

- **Site Key** (frontend): Already configured in the code
- **Secret Key** (backend): Must be added to `.env` file
- reCAPTCHA v3 runs invisibly in the background (no checkbox)
- Minimum score threshold: 0.5 (scores range from 0.0 to 1.0)
- Higher scores = more likely to be human
- If the secret key is missing, the contact form will not work


