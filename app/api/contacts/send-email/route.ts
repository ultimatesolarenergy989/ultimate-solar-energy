import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactId, subject, message } = body;

    if (!contactId || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const fromEmail = process.env.CONTACT_FROM || "Ultimate Solar Energy <onboarding@resend.dev>";

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: contact.email,
      subject,
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
                background-color: #f7f7f7;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                background: #002866;
                color: white;
                padding: 24px;
                border-bottom: 4px solid #FFD700;
              }
              .header h1 {
                margin: 0;
                font-size: 22px;
              }
              .content {
                padding: 24px;
                color: #333;
                line-height: 1.7;
                font-size: 15px;
              }
              .footer {
                padding: 20px;
                text-align: center;
                background: #f5f5f5;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Ultimate Solar Energy</h1>
              </div>
              <div class="content">
                <p>Hi ${contact.firstName || contact.lastName ? `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim() : "there"},</p>
                <p>${message.replace(/\n/g, "<br/>")}</p>
              </div>
              <div class="footer">
                <p>Ultimate Solar Energy &bull; 1300 661 388 &bull; team@ultimatesolarenergy.com.au</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, response: emailResponse });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}



