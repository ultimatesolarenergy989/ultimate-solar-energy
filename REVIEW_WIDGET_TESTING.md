# Review Widget - Testing Guide

## ✅ What's Working

The review widget feedback form is now fully functional with:
- ✅ Form validation
- ✅ Error handling and display
- ✅ Success confirmations
- ✅ Email notifications to admin
- ✅ Loading states
- ✅ Reset functionality
- ✅ Professional email templates
- ✅ Comprehensive logging

---

## 🧪 How to Test

### 1. Navigate to Reviews Page
```
http://localhost:3000/reviews
```

### 2. Test Positive Feedback Flow
1. Click the **👍 Thumbs Up** button
2. You should see two options:
   - **Google** logo button
   - **Facebook** logo button
3. Click either button → Opens review page in new tab
4. Click "← Back" → Returns to initial state

### 3. Test Negative Feedback Flow

**Step 1: Open Form**
1. Click the **👎 Thumbs Down** button
2. Form should appear with fields:
   - Your Name* (required)
   - Phone (optional)
   - Email* (required)
   - Message (optional)

**Step 2: Test Validation**
1. Try submitting empty form
2. Should show browser validation for required fields

**Step 3: Submit Valid Feedback**
1. Fill in:
   - Name: "Test Customer"
   - Email: "test@example.com"
   - Phone: "0400123456"
   - Message: "Testing the feedback form"
2. Click **SEND MESSAGE**
3. Button text changes to "SENDING..."
4. Success screen should appear with:
   - ✅ Green checkmark icon
   - "Thank you!" heading
   - Confirmation message
   - "← Back" button

**Step 4: Check Email Delivery**
1. Admin email sent to `CONTACT_TO` address
2. Subject: "⚠️ Customer Concern - Immediate Attention Required"
3. Email includes:
   - Red header with alert icon
   - Customer name, email, phone
   - Message content
   - Timestamp

**Step 5: Test Reset**
1. Click "← Back" button
2. Should return to initial thumbs up/down screen
3. All form data cleared
4. No error messages visible

---

## 🐛 Error Scenarios to Test

### Network Error
1. Turn off internet
2. Submit form
3. Should show: "Network error. Please check your connection and try again."

### Missing Required Fields
1. Leave Name or Email empty
2. Submit form
3. Browser validation should catch it

### API Error (Simulated)
If Resend API key is missing or invalid:
1. Submit form
2. Should show specific error message from API

---

## 📧 Email Template Preview

**Subject:** ⚠️ Customer Concern - Immediate Attention Required

**Content:**
```
⚠️ Customer Concern Alert

A customer has expressed concerns and needs attention.

Customer Name: [Name]
Email: [Email]
Phone: [Phone if provided]
Message: [Message if provided]

This message was submitted from the review widget on Ultimate Solar Energy website.
Please contact this customer as soon as possible to address their concerns.
```

---

## 🔧 Technical Details

### API Endpoint
- **URL:** `/api/feedback`
- **Method:** POST
- **Content-Type:** application/json

### Request Body
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "message": "string (optional)"
}
```

### Success Response
```json
{
  "success": true,
  "message": "Feedback submitted successfully"
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

### Status Codes
- `200` - Success
- `400` - Validation error (missing name or email)
- `500` - Server error (email sending failed)

---

## 📊 Console Logs

When testing, check browser console and terminal for logs:

### Client Side (Browser Console)
```
Submitting feedback...
✅ Feedback submitted successfully
```

### Server Side (Terminal)
```
📥 Feedback received: { name: 'Test Customer', email: 'test@example.com', hasPhone: true, hasMessage: true }
📧 Sending email to: team@ultimatesolarenergy.com.au
✅ Email sent successfully: [email-id]
```

### Error Logs
```
❌ Validation failed: Missing required fields
❌ Feedback submission error: [error details]
```

---

## 🎨 UI States

### Initial State
- Thumbs up/down buttons visible
- Logo and company info displayed
- Clean white card design

### Positive State
- Google and Facebook buttons
- "Thank you! We need your help." message
- Link to get in touch for private concerns
- Back button

### Negative State (Form)
- All form fields visible
- Error message area (hidden when no errors)
- Blue "SEND MESSAGE" button
- Back button

### Success State
- Green checkmark icon
- "Thank you!" heading
- Confirmation message
- Back button

### Loading State
- Button text: "SENDING..."
- Button disabled
- Form inputs remain visible

### Error State
- Red error box appears above form
- Error message displayed
- Form remains editable
- Submit button re-enabled

---

## ✨ Features Included

1. **Form Validation**
   - Required fields marked with *
   - Browser native validation
   - API-level validation

2. **Error Handling**
   - Network errors caught and displayed
   - API errors shown to user
   - Validation errors highlighted

3. **User Feedback**
   - Loading states during submission
   - Success confirmation screen
   - Error messages that are helpful

4. **Email Notifications**
   - Professional HTML email template
   - Red alert styling for urgency
   - All customer details included
   - Call to action for support team

5. **State Management**
   - Clean state transitions
   - Form data persistence during edit
   - Complete reset on back button
   - No memory leaks

6. **Accessibility**
   - Proper form labels
   - Keyboard navigation works
   - Button states clear
   - Error messages descriptive

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Test all three states (initial, positive, negative)
- [ ] Verify email delivery to correct address
- [ ] Check email formatting in Gmail, Outlook, etc.
- [ ] Test on mobile devices
- [ ] Test error scenarios
- [ ] Verify form validation works
- [ ] Check console for any errors
- [ ] Test with real email addresses
- [ ] Verify reset functionality
- [ ] Test Google/Facebook links open correctly

---

## 🔐 Environment Variables Required

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO=admin@ultimatesolarenergy.com.au
CONTACT_FROM=noreply@ultimatesolarenergy.com.au
```

---

## 📝 Notes

- Form data is NOT saved to database (only sent via email)
- Email is sent immediately upon submission
- Widget is sticky on desktop (follows scroll)
- Widget stacks below reviews on mobile
- All state resets when navigating away from page
- Form can be submitted multiple times
- No rate limiting implemented (add if needed)

---

## 🎯 Success Criteria

✅ Form submits successfully  
✅ Admin receives email notification  
✅ Customer sees success confirmation  
✅ Errors are handled gracefully  
✅ UI states are clear and intuitive  
✅ Mobile responsive  
✅ Accessible to all users  
✅ Professional appearance  
✅ Fast and reliable  

