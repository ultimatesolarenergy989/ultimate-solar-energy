import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function GET(request: NextRequest) {
  try {
    console.log("🧪 Testing Resend email configuration...");
    
    const fromEmail = process.env.CONTACT_FROM || "Ultimate Solar Energy <noreply@ultimatesolarenergy.com.au>";
    const toEmail = process.env.CONTACT_TO || "team@ultimatesolarenergy.com.au";

    console.log("From:", fromEmail);
    console.log("To:", toEmail);

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: "Test Email from Ultimate Solar Energy",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify your Resend configuration.</p>
        <p>If you receive this, your email system is working correctly!</p>
        <hr>
        <p><small>Sent at: ${new Date().toISOString()}</small></p>
      `,
    });

    console.log("✅ Test email sent successfully:", result);

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      result,
    });
  } catch (error: any) {
    console.error("❌ Test email failed:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send test email",
        details: error,
      },
      { status: 500 }
    );
  }
}


