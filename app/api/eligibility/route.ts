import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, phone } = data;

    // Validate required fields
    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate Australian phone number
    const phoneDigits = phone.replace(/\D/g, ""); // Remove all non-digits
    const isValidAustralianPhone =
      // Mobile: 04XX XXX XXX (10 digits starting with 04)
      /^04\d{8}$/.test(phoneDigits) ||
      // Landline: 02/03/07/08 XXXX XXXX (10 digits)
      /^0[2378]\d{8}$/.test(phoneDigits) ||
      // Toll-free: 1300/1800 XXX XXX (10 digits)
      /^1[38]00\d{6}$/.test(phoneDigits) ||
      // International format: +61 4XX XXX XXX (starts with +61)
      /^61[2378]\d{8}$/.test(phoneDigits) ||
      /^614\d{8}$/.test(phoneDigits);

    if (!isValidAustralianPhone) {
      return NextResponse.json(
        {
          error:
            "Invalid Australian phone number. Please use format: 0400 123 456 (mobile) or 02 1234 5678 (landline)",
        },
        { status: 400 }
      );
    }

    const CONTACT_TO = process.env.CONTACT_TO || "team@ultimatesolarenergy.com.au";
    const CONTACT_FROM = process.env.CONTACT_FROM || "noreply@ultimatesolarenergy.com.au";

    console.log("📧 Sending eligibility emails to:", CONTACT_TO);

    // Admin notification email with professional template design
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
              <h1>🎯 New Solar Tax Eligibility Check</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 25px;">
                A customer has requested information about <strong>Solar Tax Benefits Eligibility</strong> from your website.
              </p>

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

              <div class="highlight-box">
                <p>📋 Request Type: Solar Tax Benefits Eligibility</p>
                <p>💼 Inquiry: Asset Write-off, Depreciation, SBTO, GST Credits</p>
              </div>

              <p style="font-size: 14px; color: #666; margin-top: 25px;">
                📅 Submitted: ${new Date().toLocaleString("en-AU", {
                  dateStyle: "full",
                  timeStyle: "short",
                  timeZone: "Australia/Melbourne",
                })}
              </p>
            </div>

            <div class="footer">
              <p style="margin: 0 0 10px 0;">
                <strong>Ultimate Solar Energy</strong>
              </p>
              <p style="margin: 0;">
                This eligibility check was submitted from your website.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send admin notification
    const adminEmail = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: "🎯 New Solar Tax Eligibility Check - Ultimate Solar Energy",
      html: adminEmailBody,
    });

    console.log("✅ Admin email sent successfully:", adminEmail.data?.id);

    // Customer confirmation email with professional template design
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
            .benefits-list {
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              text-align: left;
            }
            .benefits-list h3 {
              color: #002866;
              font-size: 16px;
              margin: 0 0 15px 0;
            }
            .benefits-list ul {
              margin: 0;
              padding-left: 20px;
            }
            .benefits-list li {
              color: #666;
              margin: 8px 0;
              font-size: 14px;
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
              <h1>Your Solar Tax Benefits Guide</h1>
            </div>
            
            <div class="content">
              <p class="greeting">Thank You for Your Interest!</p>
              
              <p class="message">
                We've received your eligibility check request for <strong>Solar Tax Benefits</strong>. A detailed guide has been sent to your email and is also available for download.
              </p>

              <div class="highlight-box">
                <h2>What Happens Next?</h2>
                <p>📧 Check your email for the eligibility guide</p>
                <p>📄 Review the tax benefits information</p>
                <p>📞 Our team will contact you within 24 hours</p>
                <p>💡 Get personalized advice for your situation</p>
              </div>

              <div class="benefits-list">
                <h3>Solar Tax Benefits You May Qualify For:</h3>
                <ul>
                  <li>✅ <strong>Asset Write-off</strong> - Deduct your solar investment</li>
                  <li>✅ <strong>Depreciation Deduction</strong> - Annual tax deductions</li>
                  <li>✅ <strong>Small Business Tax Offset (SBTO)</strong> - Additional tax relief</li>
                  <li>✅ <strong>GST Credits</strong> - Claim back GST on your purchase</li>
                  <li>✅ <strong>Government Rebates</strong> - State and federal incentives</li>
                </ul>
              </div>

              <p class="message">
                Our solar tax specialists will review your details and provide personalized recommendations to maximize your tax benefits and savings.
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

    // Send customer confirmation
    await resend.emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: "Your Solar Tax Benefits Eligibility Guide - Ultimate Solar Energy",
      html: customerEmailBody,
    });

    console.log("✅ Customer confirmation email sent successfully");

    return NextResponse.json({
      success: true,
      message: "Eligibility check submitted successfully",
    });
  } catch (error) {
    console.error("❌ Eligibility API error:", error);
    return NextResponse.json(
      { error: "Failed to process eligibility check" },
      { status: 500 }
    );
  }
}

