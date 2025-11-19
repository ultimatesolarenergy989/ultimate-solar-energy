import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    console.log('📥 Feedback received:', { name: data.name, email: data.email, hasPhone: !!data.phone, hasMessage: !!data.message });
    
    const { name, phone, email, message } = data;

    // Validate required fields
    if (!name || !email) {
      console.error('❌ Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const CONTACT_TO = process.env.CONTACT_TO || 'team@ultimatesolarenergy.com.au';
    const CONTACT_FROM = process.env.CONTACT_FROM || 'noreply@ultimatesolarenergy.com.au';
    
    console.log('📧 Sending email to:', CONTACT_TO);

    // Admin email with proper template design (matching Contact/Get-a-Quote pages)
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
              background: linear-gradient(135deg, #dc2626, #ef4444);
              color: #ffffff;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }
            .alert-badge {
              background-color: #ffffff;
              color: #dc2626;
              display: inline-block;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: bold;
              margin-bottom: 15px;
              font-size: 14px;
            }
            .content {
              padding: 30px;
            }
            .alert-message {
              background-color: #fef2f2;
              border-left: 4px solid #dc2626;
              padding: 15px;
              margin-bottom: 25px;
              border-radius: 4px;
            }
            .info-row {
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #e0e0e0;
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
            .message-box {
              background-color: #f9f9f9;
              border-left: 4px solid #FFD700;
              padding: 15px;
              margin-top: 10px;
              border-radius: 4px;
            }
            .action-required {
              background: linear-gradient(135deg, #FFD700, #FDB714);
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin: 25px 0;
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
              <div class="alert-badge">⚠️ URGENT</div>
              <h1>Customer Concern Alert</h1>
            </div>
            
            <div class="content">
              <div class="alert-message">
                <p style="margin: 0; font-size: 16px; color: #dc2626; font-weight: bold;">
                  ⚠️ A customer has expressed concerns and needs immediate attention.
                </p>
              </div>

              <p style="font-size: 16px; margin-bottom: 25px;">
                A customer has submitted feedback through the review widget indicating they are not satisfied with their experience.
              </p>

              <div class="info-row">
                <div class="label">Customer Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="info-row">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #002866; text-decoration: none;">${email}</a>
                </div>
              </div>

              ${phone ? `
              <div class="info-row">
                <div class="label">Phone Number</div>
                <div class="value">
                  <a href="tel:${phone}" style="color: #002866; text-decoration: none;">${phone}</a>
                </div>
              </div>
              ` : ''}

              ${message ? `
              <div class="info-row" style="border-bottom: none;">
                <div class="label">Customer Message</div>
                <div class="message-box">${message}</div>
              </div>
              ` : ''}

              <div class="action-required">
                <p style="margin: 0; color: #002866; font-weight: bold; font-size: 16px;">
                  ⏰ ACTION REQUIRED: Please contact this customer within 24 hours
                </p>
              </div>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                <strong>Ultimate Solar Energy</strong>
              </p>
              <p style="margin: 0;">
                This email was sent from the review widget on your website.
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
      subject: '⚠️ Customer Concern - Immediate Attention Required',
      html: adminEmailBody,
    });

    console.log('✅ Admin email sent successfully:', emailResult.data?.id);

    // Customer confirmation email with proper template design (matching Contact/Get-a-Quote pages)
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
              <h1>Thank You for Your Feedback!</h1>
            </div>
            
            <div class="content">
              <p class="greeting">Hi ${name},</p>
              
              <p class="message">
                Thank you for taking the time to share your feedback with Ultimate Solar Energy. We take your concerns very seriously and appreciate the opportunity to make things right.
              </p>

              <div class="highlight-box">
                <h2>What Happens Next?</h2>
                <p>📋 Our support team will review your feedback</p>
                <p>📞 A team member will contact you shortly</p>
                <p>🤝 We'll work together to resolve your concerns</p>
                <p>⭐ We're committed to 100% customer satisfaction</p>
              </div>

              <p class="message">
                We strive for excellence in everything we do, and your feedback helps us improve. A member of our team will be in touch with you soon to discuss your concerns and find a resolution.
              </p>

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
      subject: 'We received your feedback - Ultimate Solar Energy',
      html: customerEmailBody,
    });

    console.log('✅ Customer confirmation email sent successfully');

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });

  } catch (error) {
    console.error('❌ Feedback submission error:', error);
    
    // Provide more specific error message
    let errorMessage = 'Failed to submit feedback';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

