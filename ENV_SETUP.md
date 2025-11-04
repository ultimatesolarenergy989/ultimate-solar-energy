# Environment Variables Setup

Add these environment variables to your `.env` file:

```env
# Resend Email API Key
RESEND_API_KEY=re_fTeTecjF_LfGPg7wj9kMraqvbB9KdWwoo

# Email Configuration for Contact Form
CONTACT_FROM="Ultimate Solar Energy <noreply@ultimatesolarenergy.com.au>"
CONTACT_TO="team@ultimatesolarenergy.com.au"
```

## Variable Descriptions

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `RESEND_API_KEY` | API key for Resend email service | `re_xxxxx...` |
| `CONTACT_FROM` | Email address that sends contact form emails (must be verified in Resend) | `"Your Company <noreply@example.com>"` |
| `CONTACT_TO` | Admin email address to receive contact form submissions | `"admin@example.com"` |

## After Adding Variables

1. Save the `.env` file
2. Restart your development server:
   ```bash
   pnpm dev
   ```

## Email Flow

1. **Customer submits form** → Data saved to database
2. **Admin notification** → Sent to `CONTACT_TO` from `CONTACT_FROM`
3. **Customer confirmation** → Sent to customer's email from `CONTACT_FROM`

## Important Notes

- The `CONTACT_FROM` email must be verified in your Resend account
- If you're using Resend's sandbox mode, emails will only send to verified addresses
- To send to any email address, you need to add and verify your domain in Resend
- Default fallback values are set in the code if variables are not provided


