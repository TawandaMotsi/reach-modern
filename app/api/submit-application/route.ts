import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtpout.secureserver.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Application: ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Application Submitted</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.mobileNo}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Address:</strong> ${data.streetAddress}, ${data.city}, ${data.county}, ${data.postcode}</p>
        <hr/>
        <h3>Full Application Details</h3>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `,
    });
    
    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
