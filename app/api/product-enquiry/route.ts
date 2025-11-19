import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('📥 Product enquiry received:', { 
      product: data.product, 
      name: `${data.firstName} ${data.lastName}`, 
      email: data.email 
    });
    
    const { firstName, lastName, email, phone, state, postCode, product } = data;

    // Validate required fields
    if (!firstName || !email || !phone) {
      console.error('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'First name, email, and phone number are required' },
        { status: 400 }
      );
    }

    const CONTACT_TO = process.env.CONTACT_TO || 'team@ultimatesolarenergy.com.au';
    const CONTACT_FROM = process.env.CONTACT_FROM || 'noreply@ultimatesolarenergy.com.au';
    
    console.log('📧 Sending email to:', CONTACT_TO);

    // Admin email with professional template design (matching Contact/Get-a-Quote pages)
    const adminEmailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #002866, #003580);
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
            }
            .info-row {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e0e0e0;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              color: #002866;
              font-weight: bold;
              font-size: 12px;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
              font-size: 16px;
            }
            .highlight-box {
              background: linear-gradient(135deg, #FFD700, #FDB714);
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
            }
            .highlight-box p {
              margin: 5px 0;
              color: #002866;
              font-weight: bold;
              font-size: 15px;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Product Enquiry - ${product}</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 25px;">
                A customer has requested information about <strong>${product}</strong> from your website.
              </p>

              <div class="info-row">
                <div class="label">Customer Name</div>
                <div class="value">${firstName} ${lastName || ''}</div>
              </div>

              <div class="info-row">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #002866; text-decoration: none;">${email}</a>
                </div>
              </div>

              <div class="info-row">
                <div class="label">Phone Number</div>
                <div class="value">
                  <a href="tel:${phone}" style="color: #002866; text-decoration: none;">${phone}</a>
                </div>
              </div>

              ${state || postCode ? `
              <div class="info-row">
                <div class="label">Location</div>
                <div class="value">${state || ''}${state && postCode ? ', ' : ''}${postCode || ''}</div>
              </div>
              ` : ''}

              <div class="highlight-box">
                <p>📦 Product: ${product}</p>
                <p>🏢 Category: Small Business Solar System</p>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                <strong>Ultimate Solar Energy</strong>
              </p>
              <p style="margin: 0;">
                This enquiry was submitted from the ${product} product page on your website.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send admin notification
    const emailResult = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: `New Product Enquiry - ${product}`,
      html: adminEmailBody,
    });

    console.log('✅ Admin email sent successfully:', emailResult.data?.id);

    // Customer confirmation email with professional template design (matching Contact/Get-a-Quote pages)
    const customerEmailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #002866, #003580);
              padding: 40px 30px;
              text-align: center;
            }
            .logo {
              width: 80px;
              height: 80px;
              background-color: #FFD700;
              border-radius: 50%;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 48px;
              font-weight: bold;
              color: #002866;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .greeting {
              font-size: 20px;
              color: #002866;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              color: #666;
              line-height: 1.8;
              margin-bottom: 30px;
            }
            .highlight-box {
              background: linear-gradient(135deg, #FFD700, #FDB714);
              padding: 25px;
              border-radius: 8px;
              margin: 30px 0;
            }
            .highlight-box h2 {
              color: #002866;
              font-size: 18px;
              margin: 0 0 15px 0;
            }
            .highlight-box p {
              color: #002866;
              margin: 8px 0;
              font-size: 15px;
              text-align: left;
            }
            .enquiry-details {
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              text-align: left;
            }
            .enquiry-details p {
              margin: 8px 0;
              font-size: 14px;
              color: #666;
            }
            .enquiry-details strong {
              color: #002866;
            }
            .contact-info {
              margin-top: 30px;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 8px;
            }
            .contact-info p {
              margin: 8px 0;
              font-size: 14px;
              color: #666;
            }
            .footer {
              background-color: #f5f5f5;
              padding: 25px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">✓</div>
              <h1>Thank You for Your Enquiry!</h1>
            </div>
            
            <div class="content">
              <p class="greeting">Hi ${firstName},</p>
              
              <p class="message">
                Thank you for your interest in the <strong>${product}</strong> from Ultimate Solar Energy. We have received your enquiry and one of our business solar specialists will be in touch with you shortly.
              </p>

              <div class="enquiry-details">
                <p><strong>Product:</strong> ${product}</p>
                <p><strong>Your Email:</strong> ${email}</p>
                <p><strong>Your Phone:</strong> ${phone}</p>
                ${state || postCode ? `<p><strong>Location:</strong> ${state || ''}${state && postCode ? ', ' : ''}${postCode || ''}</p>` : ''}
              </div>

              <div class="highlight-box">
                <h2>What Happens Next?</h2>
                <p>📋 Our expert team will review your enquiry</p>
                <p>🔍 We'll assess your specific energy requirements</p>
                <p>📞 A specialist will contact you to discuss:</p>
                <p style="margin-left: 20px;">• System specifications and features</p>
                <p style="margin-left: 20px;">• Pricing and available packages</p>
                <p style="margin-left: 20px;">• Installation timeline and process</p>
                <p style="margin-left: 20px;">• Financing options</p>
              </div>

              <div class="contact-info">
                <p><strong>Need immediate assistance?</strong></p>
                <p>📞 Call us: <a href="tel:1300661388" style="color: #002866; text-decoration: none;">1300 661 388</a></p>
                <p>✉️ Email: <a href="mailto:team@ultimatesolarenergy.com.au" style="color: #002866; text-decoration: none;">team@ultimatesolarenergy.com.au</a></p>
                <p style="margin-top: 15px; font-size: 12px;">Monday to Friday: 9:00 AM - 6:00 PM AEDT</p>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                <strong>Ultimate Solar Energy</strong>
              </p>
              <p style="margin: 0 0 5px 0;">
                1/50 Assembly Drive, Tullamarine VIC 3043
              </p>
              <p style="margin: 0 0 15px 0;">
                Level 6, 143 St Georges Terrace, Perth WA 6000
              </p>
              <p style="margin: 0; font-size: 11px;">
                © 2024 Ultimate Solar Energy. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: `Your ${product} Enquiry - Ultimate Solar Energy`,
      html: customerEmailBody,
    });

    console.log('✅ Customer confirmation email sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
    });

  } catch (error) {
    console.error('❌ Product enquiry submission error:', error);
    
    // Provide more specific error message
    let errorMessage = 'Failed to submit enquiry';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

