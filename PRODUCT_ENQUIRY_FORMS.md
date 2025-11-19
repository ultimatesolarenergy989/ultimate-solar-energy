# Product Enquiry Forms - Documentation

## ✅ Implementation Complete

All three product pages now have fully functional contact forms with unified API and email notifications.

---

## 📦 Product Pages with Forms

1. **20 KW System** - `/products/20-kw-system`
2. **40 KW System** - `/products/40-kw-system`
3. **100 KW System** - `/products/100-kw-system`

All three forms use the **same API endpoint** and email templates.

---

## 🔌 API Endpoint

**URL:** `/api/product-enquiry`  
**Method:** POST  
**Content-Type:** application/json

### Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "0400123456",
  "state": "VIC",
  "postCode": "3000",
  "product": "20 KW System"
}
```

### Required Fields:
- ✅ `firstName` (required)
- ✅ `email` (required)
- ✅ `phone` (required)
- ❌ `lastName` (optional)
- ❌ `state` (optional)
- ❌ `postCode` (optional)
- ✅ `product` (auto-filled based on page)

---

## 📧 Email Notifications

### 1. Admin Notification Email

**To:** `CONTACT_TO` environment variable  
**Subject:** "New Product Enquiry - [Product Name]"  
**Template:** Same design as Get-a-Quote page

```html
<h2>New Product Enquiry - 20 KW System</h2>
<p><strong>A customer has requested information about 20 KW System.</strong></p>

<h3>Contact Information</h3>
<ul>
  <li><strong>Name:</strong> John Doe</li>
  <li><strong>Email:</strong> john@example.com</li>
  <li><strong>Phone:</strong> 0400123456</li>
  <li><strong>State:</strong> VIC</li>
  <li><strong>Postcode:</strong> 3000</li>
</ul>

<h3>Product Interest</h3>
<ul>
  <li><strong>System:</strong> 20 KW System</li>
  <li><strong>Category:</strong> Small Business Solar System</li>
</ul>

<p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; color: #666;">
  This enquiry was submitted from the 20 KW System product page on Ultimate Solar Energy website.
</p>
```

### 2. Customer Confirmation Email

**To:** Customer's email address  
**Subject:** "Your [Product Name] Enquiry - Ultimate Solar Energy"  
**Template:** Same design as Get-a-Quote page

```html
<h2>Thank you for your enquiry!</h2>
<p>Hi John,</p>
<p>Thank you for your interest in the 20 KW System from Ultimate Solar Energy...</p>

<h3>Your Enquiry Details</h3>
<ul>
  <li><strong>Product:</strong> 20 KW System</li>
  <li><strong>Your Email:</strong> john@example.com</li>
  <li><strong>Your Phone:</strong> 0400123456</li>
  <li><strong>Location:</strong> VIC 3000</li>
</ul>

<h3>What happens next?</h3>
<p>Our expert team will review your enquiry and contact you to discuss:</p>
<ul>
  <li>Your specific energy requirements</li>
  <li>System specifications and features</li>
  <li>Pricing and available packages</li>
  <li>Installation timeline and process</li>
  <li>Financing options</li>
</ul>

<p>If you have any urgent questions, feel free to call us at <strong>1300 661 388</strong>.</p>

<p>Best regards,<br>The Ultimate Solar Energy Team</p>

<p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; color: #666; font-size: 12px;">
  Ultimate Solar Energy<br>
  Unit 1/50 Assembly Dr, Tullamarine VIC 3043<br>
  Phone: 1300 661 388<br>
  Email: team@ultimatesolarenergy.com.au
</p>
```

---

## 🎨 Form Features

### UI Elements:
✅ **Sticky Form** - Stays visible on scroll (desktop)  
✅ **Success Messages** - Green box with confirmation  
✅ **Error Messages** - Red box with error details  
✅ **Loading State** - Button shows "SUBMITTING..."  
✅ **Form Reset** - Clears after successful submission  
✅ **Validation** - Required fields enforced  

### Form Fields:
```
┌─────────────────────────────────┐
│ FIRST NAME* (required)          │
├─────────────────────────────────┤
│ LAST NAME                       │
├─────────────────────────────────┤
│ EMAIL* (required)               │
├─────────────────────────────────┤
│ PHONE NUMBER* (required)        │
├─────────────────────────────────┤
│ STATE (dropdown)                │
│ - NSW, VIC, QLD, SA, WA, etc.   │
├─────────────────────────────────┤
│ POSTCODE                        │
├─────────────────────────────────┤
│ [GET IN TOUCH] (Button)         │
└─────────────────────────────────┘
```

---

## 🧪 Testing

### Test 20 KW System Form:
1. Go to: `http://localhost:3000/products/20-kw-system`
2. Scroll to the right-side contact form
3. Fill in:
   - First Name: "Test"
   - Email: "test@example.com"
   - Phone: "0400123456"
   - State: "VIC"
   - Postcode: "3000"
4. Click "GET IN TOUCH"
5. Check:
   - ✅ Green success message appears
   - ✅ Form fields clear
   - ✅ Admin receives email
   - ✅ Customer receives confirmation email

### Test 40 KW System Form:
- Same process at: `http://localhost:3000/products/40-kw-system`
- Email subject will say "40 KW System"

### Test 100 KW System Form:
- Same process at: `http://localhost:3000/products/100-kw-system`
- Email subject will say "100 KW System"

---

## 🔄 Form Workflow

```
1. User fills form on product page
        ↓
2. Clicks "GET IN TOUCH" button
        ↓
3. Button shows "SUBMITTING..."
        ↓
4. POST request to /api/product-enquiry
        ↓
5. API validates required fields
        ↓
6. Admin email sent (with product info)
        ↓
7. Customer confirmation email sent
        ↓
8. Success message shown (green box)
        ↓
9. Form fields reset automatically
```

---

## 📊 Console Logs

### Client Side (Browser):
```
Enquiry submission successful
```

### Server Side (Terminal):
```
📥 Product enquiry received: { product: '20 KW System', name: 'Test User', email: 'test@example.com' }
📧 Sending email to: team@ultimatesolarenergy.com.au
✅ Admin email sent successfully: [email-id]
✅ Customer confirmation email sent successfully
```

### Error Logs:
```
❌ Validation failed: Missing required fields
❌ Product enquiry submission error: [error details]
```

---

## 🎯 Key Differences from Other Forms

### vs Get-a-Quote Form:
- ✅ Simpler fields (no address autocomplete)
- ✅ Product name auto-included
- ✅ Business-focused messaging
- ✅ Same email template design

### vs Feedback Form:
- ✅ Positive intent (inquiry vs complaint)
- ✅ No negative/positive split
- ✅ Product-specific context
- ✅ Same email template design

---

## 🛠️ Technical Implementation

### State Management:
```typescript
const [formData, setFormData] = useState({...});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<...>(null);
```

### Form Submission:
```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const response = await fetch('/api/product-enquiry', {
    method: 'POST',
    body: JSON.stringify({
      ...formData,
      product: '20 KW System' // Auto-filled
    })
  });
  
  // Handle success/error
};
```

### Error Handling:
- ✅ Network errors caught
- ✅ Validation errors displayed
- ✅ User-friendly messages
- ✅ Form stays editable on error

---

## 🚀 Production Checklist

- [x] API endpoint created
- [x] All three pages updated
- [x] Email templates implemented
- [x] Success/error messages added
- [x] Loading states implemented
- [x] Form validation working
- [x] Same design as Get-a-Quote emails
- [x] Customer confirmation emails
- [x] Admin notification emails
- [x] Proper error handling
- [x] Console logging for debugging

---

## 📝 Environment Variables

```env
RESEND_API_KEY=your_api_key
CONTACT_TO=team@ultimatesolarenergy.com.au
CONTACT_FROM=noreply@ultimatesolarenergy.com.au
```

---

## ✨ Summary

✅ **One API** serves all three product page forms  
✅ **Two emails** sent per submission (admin + customer)  
✅ **Same design** as Get-a-Quote page emails  
✅ **User-friendly** with success/error feedback  
✅ **Professional** business solar team branding  
✅ **Fully functional** and ready for production  

All forms are now working perfectly with proper email notifications! 🎉

