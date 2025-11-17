import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Map form data to quotation model
    const categories = [];
    if (data.homeowner === 'yes' || data.homeowner === 'residential') {
      categories.push('residence');
    } else if (data.homeowner === 'commercial') {
      categories.push('business');
    }

    // Determine what they're looking for based on vertical
    let lookingFor = 'solar-panels';
    if (data.vertical === 5) {
      lookingFor = 'solar-battery';
    } else if (data.vertical === 6) {
      lookingFor = 'battery';
    } else if (data.vertical === 32) {
      lookingFor = 'battery';
    }

    // Create quotation in database
    const quotation = await prisma.quotation.create({
      data: {
        firstName: data.name.split(' ')[0] || data.name,
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        phone: data.phone,
        email: data.email,
        state: data.state || '',
        postCode: data.zip || '',
        lookingFor,
        categories,
        status: 'new',
      },
    });

    // Prepare email content
    const emailSubject = data.homeowner === 'commercial' 
      ? 'New Commercial Solar Quote Request'
      : 'New Residential Solar Quote Request';

    const emailBody = `
      <h2>${emailSubject}</h2>
      <p><strong>Quote ID:</strong> ${quotation.id}</p>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        ${data.company ? `<li><strong>Company:</strong> ${data.company}</li>` : ''}
        ${data.position ? `<li><strong>Position:</strong> ${data.position}</li>` : ''}
      </ul>

      <h3>Property Details</h3>
      <ul>
        <li><strong>Address:</strong> ${data.address}</li>
        <li><strong>City:</strong> ${data.city}</li>
        <li><strong>State:</strong> ${data.state}</li>
        <li><strong>Postcode:</strong> ${data.zip}</li>
      </ul>

      <h3>Solar Requirements</h3>
      <ul>
        <li><strong>System Type:</strong> ${
          data.vertical === 5 ? 'Solar + Battery System' :
          data.vertical === 6 ? 'Energy Storage Alone' :
          'Solar Alone'
        }</li>
        <li><strong>Current Solar:</strong> ${data.hassolar === 'yes' ? 'Yes' : 'No'}</li>
        ${data.hassolar === 'yes' ? `<li><strong>Action:</strong> ${data.solartype}</li>` : ''}
        <li><strong>Energy Bill:</strong> ${data.bill}</li>
        ${data.companyowned ? `<li><strong>Company Owned:</strong> ${data.companyowned}</li>` : ''}
        ${data.provider ? `<li><strong>Electricity Provider:</strong> ${data.provider}</li>` : ''}
        ${data.purchase ? `<li><strong>Finance Option:</strong> ${data.purchase}</li>` : ''}
      </ul>

      ${data.call_at && data.call_at.length > 0 ? `
        <h3>Preferred Call Times</h3>
        <ul>
          ${data.call_at.map((time: string) => `<li>${time}</li>`).join('')}
        </ul>
      ` : ''}

      <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; color: #666;">
        This quote request was submitted from the Ultimate Solar Energy website.
      </p>
    `;

    // Send admin notification email
    const CONTACT_TO = process.env.CONTACT_TO || 'team@ultimatesolarenergy.com.au';
    const CONTACT_FROM = process.env.CONTACT_FROM || 'noreply@ultimatesolarenergy.com.au';

    await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: emailSubject,
      html: emailBody,
    });

    // Send confirmation email to customer
    const customerEmailBody = `
      <h2>Thank you for your quote request!</h2>
      <p>Hi ${data.name},</p>
      <p>Thank you for requesting a solar quote from Ultimate Solar Energy. We have received your request and one of our solar experts will be in touch with you shortly.</p>
      
      <h3>Your Request Details</h3>
      <ul>
        <li><strong>Quote Reference:</strong> ${quotation.id}</li>
        <li><strong>System Type:</strong> ${
          data.vertical === 5 ? 'Solar + Battery System' :
          data.vertical === 6 ? 'Energy Storage Alone' :
          'Solar Alone'
        }</li>
        <li><strong>Location:</strong> ${data.city}, ${data.state}</li>
      </ul>

      <p>We will analyze your requirements and provide you with a customized quote that best suits your needs.</p>
      
      <p>If you have any urgent questions, feel free to call us at <strong>1300 661 388</strong>.</p>
      
      <p>Best regards,<br>
      The Ultimate Solar Energy Team</p>

      <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; color: #666; font-size: 12px;">
        Ultimate Solar Energy<br>
        Unit 1/50 Assembly Dr, Tullamarine VIC 3043<br>
        Phone: 1300 661 388<br>
        Email: team@ultimatesolarenergy.com.au
      </p>
    `;

    await resend.emails.send({
      from: CONTACT_FROM,
      to: data.email,
      subject: 'Your Solar Quote Request - Ultimate Solar Energy',
      html: customerEmailBody,
    });

    return NextResponse.json({ 
      success: true, 
      quotationId: quotation.id,
      message: 'Quote request submitted successfully' 
    });

  } catch (error) {
    console.error('Free quote submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}

