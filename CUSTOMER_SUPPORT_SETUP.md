# Customer Support Form Setup

## ✅ Completed
- [x] Prisma schema updated with `CustomerSupport` table
- [x] Database schema pushed to Supabase
- [x] Customer support page converted to client component
- [x] API route created for handling submissions
- [x] Email templates created (admin + customer)

## 📦 Create Supabase Bucket (REQUIRED)

You need to create the `customer-support` bucket in Supabase Storage:

### Steps:
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Storage** in the left sidebar
4. Click **New bucket**
5. Enter bucket name: `customer-support`
6. Set it to **Public** (so admins can click links to view files)
7. Click **Create bucket**

### Alternative: Use SQL Editor
```sql
-- Create the bucket
insert into storage.buckets (id, name, public)
values ('customer-support', 'customer-support', true);

-- Set up access policies
create policy "Allow public read access"
on storage.objects for select
using (bucket_id = 'customer-support');

create policy "Allow authenticated uploads"
on storage.objects for insert
with check (bucket_id = 'customer-support');
```

## 📧 Email Configuration

The system uses the same email setup as your other forms:
- **Admin emails**: Sent to `CONTACT_TO` environment variable
- **Customer emails**: Sent from `CONTACT_FROM` environment variable
- **Email provider**: Resend API

Email templates include:
- Professional header with company branding
- Ticket ID prominently displayed
- All form details in organized sections
- Direct link to attachment (if uploaded)
- Company contact information

## 🎫 Ticket ID Format

Tickets are auto-generated in format: `CS-YYYYNNNNNN`

Examples:
- `CS-2025000001` - First ticket in 2025
- `CS-2025000042` - 42nd ticket in 2025

## 📋 Form Fields

**Required:**
- What do you need help with? (dropdown)
- Email
- Phone Number
- Street Address
- Subject

**Optional:**
- Invoice/Quote Number
- Description
- Ticket Name
- Ticket Description
- File Attachment (max 10MB)

## 🗄️ Database Table

Table: `customer_support`

Fields:
- `id` - UUID primary key
- `ticketId` - Unique ticket identifier (CS-YYYY######)
- `helpWith` - Support category
- `email`, `phone`, `streetAddress` - Contact info
- `invoiceNumber` - Optional reference
- `subject`, `description` - Request details
- `ticketName`, `ticketDescription` - Additional info
- `attachmentUrl` - Supabase Storage URL
- `status` - new, in-progress, resolved
- `createdAt`, `updatedAt` - Timestamps

## 🧪 Testing

1. Navigate to: http://localhost:3000/why-ultimate-solar-energy/customer-support
2. Fill out the form
3. Optionally upload a file
4. Submit
5. Check:
   - Success message appears with ticket ID
   - Admin receives email with all details + file link
   - Customer receives confirmation email with ticket ID
   - Database record created in `customer_support` table
   - If file uploaded, it appears in Supabase `customer-support` bucket

## 🔧 File Upload Details

- **Storage**: Supabase Storage `customer-support` bucket
- **Max size**: 10MB
- **Allowed types**: .pdf, .doc, .docx, .jpg, .jpeg, .png, .gif
- **File naming**: `{timestamp}-{random}.{extension}`
- **Path**: `customer-support/{filename}`
- **Access**: Public URL sent via email

## 🎨 Email Design

Both emails use:
- Navy blue header (#002866)
- Gold accent colors (#FDB714)
- Clean, professional layout
- Responsive design
- Company branding
- Contact information in footer

Same design as your Get Code and Contact forms for consistency.

## 🚀 Deployment Notes

Before deploying to Vercel, ensure:
- Supabase bucket `customer-support` is created
- Environment variables are set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `RESEND_API_KEY`
  - `CONTACT_TO`
  - `CONTACT_FROM`
- Database schema is synced
- Test the form works locally first

## 📱 Features

- ✅ Form validation
- ✅ File upload with progress
- ✅ Success/error messages
- ✅ Auto-generated ticket IDs
- ✅ Dual email notifications
- ✅ Professional email templates
- ✅ File attachment links
- ✅ Database persistence
- ✅ Responsive design
- ✅ Loading states

