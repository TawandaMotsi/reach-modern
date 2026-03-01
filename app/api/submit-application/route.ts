import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    if (!process.env.RESEND_API_KEY) {
      console.log('Application submitted (no email configured):', data);
      return NextResponse.json({ success: true, message: 'Application submitted successfully' });
    }
    
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'applications@reach-healthcare.com',
      to: ['infor@reach-healthcare.com', 'recruitment@reach-healthcare.com'],
      subject: `New Application: ${data.firstName} ${data.lastName}`,
      html: `
        <h2>New Application Submitted</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Address:</strong> ${data.streetAddress}, ${data.city}, ${data.county}, ${data.postcode}</p>
        <hr/>
        <p>Full application data attached in JSON format.</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `,
    });
    
    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
