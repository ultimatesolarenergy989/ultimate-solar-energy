import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate ticket ID like CS-2025001
async function generateTicketId(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.customerSupport.count();
  const ticketNumber = (count + 1).toString().padStart(6, '0');
  return `CS-${year}${ticketNumber}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const helpWith = formData.get('helpWith') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const invoiceNumber = formData.get('invoiceNumber') as string || null;
    const streetAddress = formData.get('streetAddress') as string;
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string || null;
    const ticketName = formData.get('ticketName') as string || null;
    const ticketDescription = formData.get('ticketDescription') as string || null;
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!helpWith || !email || !phone || !streetAddress || !subject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle file upload if present
    let attachmentUrl: string | null = null;
    if (file) {
      try {
        // Initialize Supabase client
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
          console.error('Missing Supabase credentials');
          return NextResponse.json(
            { error: 'File upload service not configured' },
            { status: 500 }
          );
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          return NextResponse.json(
            { error: 'File size too large. Maximum 10MB allowed.' },
            { status: 400 }
          );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `${timestamp}-${randomString}.${fileExt}`;
        const filePath = `customer-support/${fileName}`;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('customer-support')
          .upload(filePath, buffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Supabase upload error:', uploadError);
          // Continue without attachment if upload fails
          console.warn('Continuing without attachment');
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('customer-support')
            .getPublicUrl(filePath);
          
          attachmentUrl = urlData.publicUrl;
        }
      } catch (fileError) {
        console.error('File upload error:', fileError);
        // Continue without attachment
      }
    }

    // Generate ticket ID
    const ticketId = await generateTicketId();

    // Save to database
    const supportTicket = await prisma.customerSupport.create({
      data: {
        ticketId,
        helpWith,
        email,
        phone,
        invoiceNumber,
        streetAddress,
        subject,
        description,
        ticketName,
        ticketDescription,
        attachmentUrl,
        status: 'new',
      },
    });

    // Prepare email content for admin
    const CONTACT_TO = process.env.CONTACT_TO || 'team@ultimatesolarenergy.com.au';
    const CONTACT_FROM = process.env.CONTACT_FROM || 'noreply@ultimatesolarenergy.com.au';

    const adminEmailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #002866;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              color: #002866;
            }
            .value {
              margin-top: 5px;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ccc;
              color: #666;
              font-size: 12px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #FDB714;
              color: #002866;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Customer Support Request</h1>
              <p>Ticket ID: ${ticketId}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Help Category:</div>
                <div class="value">${helpWith}</div>
              </div>
              
              <div class="field">
                <div class="label">Contact Information:</div>
                <div class="value">
                  <strong>Email:</strong> ${email}<br>
                  <strong>Phone:</strong> ${phone}<br>
                  <strong>Address:</strong> ${streetAddress}
                </div>
              </div>

              ${invoiceNumber ? `
              <div class="field">
                <div class="label">Invoice/Quote Number:</div>
                <div class="value">${invoiceNumber}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>

              ${description ? `
              <div class="field">
                <div class="label">Description:</div>
                <div class="value">${description}</div>
              </div>
              ` : ''}

              ${ticketName ? `
              <div class="field">
                <div class="label">Ticket Name:</div>
                <div class="value">${ticketName}</div>
              </div>
              ` : ''}

              ${ticketDescription ? `
              <div class="field">
                <div class="label">Ticket Description:</div>
                <div class="value">${ticketDescription}</div>
              </div>
              ` : ''}

              ${attachmentUrl ? `
              <div class="field">
                <div class="label">Attachment:</div>
                <div class="value">
                  <a href="${attachmentUrl}" target="_blank" class="button">View Attachment</a>
                </div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>This support request was submitted from the Ultimate Solar Energy website.</p>
              <p>Created at: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send admin notification
    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: `New Support Request - ${ticketId} - ${helpWith}`,
      html: adminEmailBody,
    });

    // Prepare customer confirmation email
    const customerEmailBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #002866;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .ticket-box {
              background-color: #FDB714;
              color: #002866;
              padding: 15px;
              text-align: center;
              border-radius: 8px;
              margin: 20px 0;
              font-size: 18px;
              font-weight: bold;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ccc;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Support Request Received</h1>
            </div>
            <div class="content">
              <p>Dear Customer,</p>
              <p>Thank you for contacting Ultimate Solar Energy. We have received your support request and our team will get back to you shortly.</p>
              
              <div class="ticket-box">
                Your Ticket ID: ${ticketId}
              </div>

              <p><strong>Request Summary:</strong></p>
              <ul>
                <li><strong>Category:</strong> ${helpWith}</li>
                <li><strong>Subject:</strong> ${subject}</li>
                ${invoiceNumber ? `<li><strong>Invoice/Quote Number:</strong> ${invoiceNumber}</li>` : ''}
              </ul>

              <p>Please keep your ticket ID for reference when following up on this request.</p>

              <p>Our support team typically responds within 24 hours. If you have any urgent questions, please call us at <strong>1300 661 388</strong>.</p>

              <p>Best regards,<br>
              <strong>Ultimate Solar Energy Support Team</strong></p>
            </div>
            <div class="footer">
              <p><strong>Ultimate Solar Energy</strong><br>
              Unit 1/50 Assembly Dr, Tullamarine VIC 3043<br>
              Phone: 1300 661 388<br>
              Email: team@ultimatesolarenergy.com.au</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send customer confirmation
    await resend.emails.send({
      from: CONTACT_FROM,
      to: email,
      subject: `Support Request Confirmed - ${ticketId}`,
      html: customerEmailBody,
    });

    return NextResponse.json({
      success: true,
      ticketId: supportTicket.ticketId,
      message: 'Support request submitted successfully',
    });

  } catch (error) {
    console.error('Customer support submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit support request. Please try again.' },
      { status: 500 }
    );
  }
}

