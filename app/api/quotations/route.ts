import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";

// Helper function to format lookingFor value for display
function formatLookingFor(value: string): string {
  const formatMap: { [key: string]: string } = {
    "solar-panels": "Solar Panels",
    "solar-battery": "Solar Battery",
    "ev-charger": "EV Charger",
    "heat-pump": "Heat Pump",
    "air-conditioning": "Air Conditioning",
    "other": "Other",
  };
  return formatMap[value] || value;
}

// GET all quotations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = status && status !== "all" ? { status } : {};

    const quotations = await prisma.quotation.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(quotations);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotations" },
      { status: 500 }
    );
  }
}

// POST create new quotation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, state, postCode, lookingFor, categories } =
      body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !postCode ||
      !lookingFor ||
      !categories ||
      categories.length === 0
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // reCAPTCHA validation temporarily disabled for testing

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save to database
    const quotation = await prisma.quotation.create({
      data: {
        firstName,
        lastName,
        phone,
        email,
        state: state || "",
        postCode,
        lookingFor,
        categories,
        status: "new",
      },
    });

    // Send emails using Resend
    try {
      const fromEmail = process.env.CONTACT_FROM || "Ultimate Solar Energy <onboarding@resend.dev>";
      const toEmail = process.env.CONTACT_TO || "team@ultimatesolarenergy.com.au";

      console.log("📧 Attempting to send emails...");
      console.log("From:", fromEmail);
      console.log("Admin To:", toEmail);
      console.log("Client To:", email);

      // Format categories for display
      const categoriesDisplay = categories.join(", ");
      const lookingForDisplay = formatLookingFor(lookingFor);

      // Send notification to admin
      console.log("🔄 Sending admin notification...");
      const adminEmail = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Quote Request: ${firstName} ${lastName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body {
                  margin: 0;
                  padding: 20px;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                  background-color: #f5f5f5;
                }
                .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .header {
                  background: #002866;
                  color: white;
                  padding: 20px;
                  border-bottom: 4px solid #FFD700;
                }
                .header h1 {
                  margin: 0;
                  font-size: 20px;
                  font-weight: 600;
                }
                .content {
                  padding: 30px;
                }
                .details-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                .details-table tr {
                  border-bottom: 1px solid #e5e5e5;
                }
                .details-table tr:last-child {
                  border-bottom: none;
                }
                .details-table td {
                  padding: 12px 8px;
                  vertical-align: top;
                }
                .details-table td:first-child {
                  font-weight: 600;
                  color: #002866;
                  width: 140px;
                  font-size: 13px;
                }
                .details-table td:last-child {
                  color: #333;
                  font-size: 14px;
                }
                .highlight-box {
                  background: #f8f9fa;
                  border-left: 3px solid #FFD700;
                  padding: 15px;
                  margin-top: 8px;
                  border-radius: 4px;
                  color: #002866;
                  font-weight: 600;
                }
                a {
                  color: #002866;
                  text-decoration: none;
                }
                a:hover {
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <h1>📋 New Quote Request</h1>
                </div>
                <div class="content">
                  <table class="details-table">
                    <tr>
                      <td>Name</td>
                      <td><strong>${firstName} ${lastName}</strong></td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td><a href="tel:${phone}">${phone}</a></td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>${state ? `${state}, ${postCode}` : postCode}</td>
                    </tr>
                    <tr>
                      <td>Looking For</td>
                      <td>
                        <div class="highlight-box">${lookingForDisplay}</div>
                      </td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td><strong>${categoriesDisplay}</strong></td>
                    </tr>
                  </table>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      console.log("✅ Admin email sent:", adminEmail);

      // Send confirmation to client
      console.log("🔄 Sending client confirmation...");
      const clientEmail = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "Thank You - Ultimate Solar Energy",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body {
                  margin: 0;
                  padding: 20px;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                  background-color: #f5f5f5;
                }
                .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }
                .header {
                  background: #002866;
                  padding: 40px 30px;
                  text-align: center;
                  border-bottom: 4px solid #FFD700;
                }
                .header h1 {
                  color: white;
                  margin: 0 0 8px 0;
                  font-size: 28px;
                  font-weight: 600;
                }
                .header p {
                  color: rgba(255,255,255,0.9);
                  margin: 0;
                  font-size: 15px;
                }
                .content {
                  padding: 40px 30px;
                }
                .greeting {
                  font-size: 18px;
                  color: #002866;
                  font-weight: 600;
                  margin-bottom: 20px;
                }
                .message {
                  color: #555;
                  line-height: 1.7;
                  margin-bottom: 24px;
                  font-size: 15px;
                }
                .info-box {
                  background: #f8f9fa;
                  border-left: 4px solid #FFD700;
                  padding: 20px;
                  margin: 24px 0;
                  border-radius: 4px;
                }
                .info-box p {
                  margin: 8px 0;
                  color: #333;
                  font-size: 14px;
                  line-height: 1.6;
                }
                .info-box strong {
                  color: #002866;
                }
                .contact-box {
                  background: #002866;
                  padding: 24px;
                  text-align: center;
                  border-radius: 6px;
                  margin-top: 30px;
                }
                .contact-box p {
                  color: #FFD700;
                  font-weight: 600;
                  margin: 0 0 12px 0;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .contact-link {
                  color: white;
                  text-decoration: none;
                  font-size: 16px;
                  display: inline-block;
                  margin: 4px 0;
                }
                .footer {
                  text-align: center;
                  padding: 24px;
                  background: #f8f9fa;
                  border-top: 1px solid #e5e5e5;
                }
                .footer p {
                  margin: 4px 0;
                  color: #888;
                  font-size: 12px;
                }
                @media only screen and (max-width: 600px) {
                  .content {
                    padding: 30px 20px !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <h1>✓ Thank You</h1>
                  <p>We've received your quote request</p>
                </div>
                
                <div class="content">
                  <p class="greeting">Hi ${firstName},</p>
                  
                  <p class="message">
                    Thank you for your interest in <strong>Ultimate Solar Energy</strong>. Your quote request is important to us.
                  </p>

                  <div class="info-box">
                    <p><strong>What's next?</strong></p>
                    <p>→ Our team will review your request</p>
                    <p>→ We'll contact you within <strong>24 hours</strong></p>
                    <p>→ We'll provide you with a customized quote for ${lookingForDisplay}</p>
                  </div>

                  <p class="message">
                    We're here to help you achieve energy independence with sustainable solar solutions.
                  </p>

                  <div class="contact-box">
                    <p>Need immediate help?</p>
                    <a href="tel:1300661388" class="contact-link">📞 1300 661 388</a>
                    <br>
                    <a href="mailto:team@ultimatesolarenergy.com.au" class="contact-link">✉️ team@ultimatesolarenergy.com.au</a>
                  </div>
                </div>

                <div class="footer">
                  <p><strong>Ultimate Solar Energy</strong></p>
                  <p>1/50 Assembly Drive, Tullamarine VIC 3043</p>
                  <p>© ${new Date().getFullYear()} Ultimate Solar Energy</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
      console.log("✅ Client email sent:", clientEmail);

    } catch (emailError) {
      console.error("❌ Error sending emails:", emailError);
      console.error("Error details:", JSON.stringify(emailError, null, 2));
      // Don't fail the request if emails fail, just log it
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your quote request has been sent successfully!",
        quotation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating quotation:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request" },
      { status: 500 }
    );
  }
}

