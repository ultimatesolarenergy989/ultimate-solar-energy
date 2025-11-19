# Feedback Form Email Templates

## ✅ Updated to Match Get-a-Quote Page Design

The feedback form now sends **TWO emails** with the exact same design as the Get-a-Quote page:

---

## 📧 Email 1: Admin Notification

**To:** `CONTACT_TO` (admin email)  
**Subject:** ⚠️ Customer Concern - Immediate Attention Required

### Template:
```html
<h2>⚠️ Customer Concern Alert</h2>
<p><strong>A customer has expressed concerns and needs attention.</strong></p>

<h3>Contact Information</h3>
<ul>
  <li><strong>Name:</strong> [Customer Name]</li>
  <li><strong>Email:</strong> [Customer Email]</li>
  <li><strong>Phone:</strong> [Customer Phone] (if provided)</li>
</ul>

<h3>Customer Message</h3>
<p>[Customer's message content] (if provided)</p>

<p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; color: #666;">
  This message was submitted from the review widget on Ultimate Solar Energy website.<br>
  <strong>Action Required:</strong> Please contact this customer as soon as possible to address their concerns.
</p>
```

### Design:
- ⚠️ Alert icon in header
- Simple, clean HTML layout
- Bold emphasis on action required
- Matches Get-a-Quote admin email format

---

## 📧 Email 2: Customer Confirmation

**To:** Customer's email address  
**Subject:** We received your feedback - Ultimate Solar Energy

### Template:
```html
<h2>Thank you for your feedback!</h2>
<p>Hi [Customer Name],</p>
<p>Thank you for taking the time to share your feedback with Ultimate Solar Energy. We have received your message and take your concerns very seriously.</p>

<h3>What happens next?</h3>
<p>Our customer support team will review your feedback and a member of our team will be in touch with you shortly to discuss your concerns and work towards a resolution.</p>

<p>We strive for 100% customer satisfaction and appreciate the opportunity to address any issues you may have experienced.</p>

<p>If you have any urgent questions, feel free to call us at <strong>1300 661 388</strong>.</p>

<p>Best regards,<br>
The Ultimate Solar Energy Team</p>

<p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; color: #666; font-size: 12px;">
  Ultimate Solar Energy<br>
  Unit 1/50 Assembly Dr, Tullamarine VIC 3043<br>
  Phone: 1300 661 388<br>
  Email: team@ultimatesolarenergy.com.au
</p>
```

### Design:
- Friendly, reassuring tone
- Clear explanation of next steps
- Company contact information in footer
- **Exact same format as Get-a-Quote confirmation email**

---

## 🎨 Design Consistency

Both email templates now match the Get-a-Quote page design:

✅ **Simple HTML** - No complex CSS or inline styles  
✅ **Clean Headers** - `<h2>` and `<h3>` tags  
✅ **Bulleted Lists** - `<ul>` for contact information  
✅ **Footer Format** - Border-top separator with company details  
✅ **Typography** - Same font sizes and spacing  
✅ **Professional Tone** - Consistent messaging style  

---

## 📊 Email Flow

When a customer submits negative feedback:

1. **Form Submitted** → Data sent to `/api/feedback`
2. **Admin Email Sent** → Alert notification with customer details
3. **Customer Email Sent** → Confirmation and reassurance
4. **Success Response** → "Thank you!" screen shown in widget

---

## 🧪 Test the Emails

### Test Negative Feedback:
1. Go to: http://localhost:3000/reviews
2. Click 👎 thumbs down
3. Fill form:
   - Name: "Test Customer"
   - Email: "your-email@example.com"
   - Phone: "0400123456"
   - Message: "Testing the email templates"
4. Click "SEND MESSAGE"
5. Check both emails:
   - **Admin email** → sent to `CONTACT_TO`
   - **Customer email** → sent to the email you entered

---

## 📝 Email Content Comparison

### Get-a-Quote Customer Email:
```
Subject: Your Solar Quote Request - Ultimate Solar Energy

Thank you for your quote request!
Hi [Name],
Thank you for requesting a solar quote from Ultimate Solar Energy...
[Details about their quote]
...Company footer
```

### Feedback Customer Email:
```
Subject: We received your feedback - Ultimate Solar Energy

Thank you for your feedback!
Hi [Name],
Thank you for taking the time to share your feedback...
[What happens next]
...Company footer
```

### ✅ Same Structure:
- Personalized greeting
- Thank you message
- Details section
- Next steps
- Contact information
- Company footer with address & phone

---

## 🔧 Technical Details

### Environment Variables Used:
```env
RESEND_API_KEY=your_api_key
CONTACT_TO=team@ultimatesolarenergy.com.au
CONTACT_FROM=noreply@ultimatesolarenergy.com.au
```

### Email Service:
- **Provider:** Resend
- **From:** `noreply@ultimatesolarenergy.com.au`
- **Reply-To:** `team@ultimatesolarenergy.com.au`

### Logging:
```
📥 Feedback received: {...}
📧 Sending email to: team@ultimatesolarenergy.com.au
✅ Admin email sent successfully: [id]
✅ Customer confirmation email sent successfully
```

---

## ✨ Key Improvements

1. **Two Emails Instead of One**
   - Before: Only admin notification
   - Now: Admin notification + Customer confirmation

2. **Consistent Design**
   - Before: Complex HTML with inline CSS
   - Now: Simple HTML matching Get-a-Quote format

3. **Better Customer Experience**
   - Before: No confirmation to customer
   - Now: Reassuring confirmation email sent

4. **Professional Appearance**
   - Before: Technical alert-style email
   - Now: Friendly, branded communication

---

## 📋 Checklist

- [x] Admin email uses same format as Get-a-Quote
- [x] Customer email uses same format as Get-a-Quote
- [x] Both emails sent on form submission
- [x] Company footer included in both
- [x] Contact information displayed correctly
- [x] Subject lines are clear and professional
- [x] Email logging for debugging
- [x] Error handling in place
- [x] Consistent branding and tone

---

## 🎯 Result

The feedback form now provides a **professional, consistent email experience** that matches your Get-a-Quote page perfectly! Both admin and customer receive well-formatted emails with clear information and next steps. ✅

