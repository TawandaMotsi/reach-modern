import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, role } = await request.json();

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.reach-healthcare.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Registration Started: ${firstName} ${lastName} — ${role || 'Role not specified'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
          <div style="background:#0a4d7c;padding:24px 32px">
            <h1 style="color:#fff;margin:0;font-size:20px">New Registration Started</h1>
            <p style="color:rgba(255,255,255,0.7);margin:6px 0 0;font-size:13px">Someone has begun the application process — they may not have completed the full form yet.</p>
          </div>
          <div style="padding:28px 32px;background:#fff">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:10px 0;color:#555;width:40%;border-bottom:1px solid #f0f0f0"><strong>Name</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:10px 0;color:#555;border-bottom:1px solid #f0f0f0"><strong>Email</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${email}" style="color:#0a4d7c">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#555;border-bottom:1px solid #f0f0f0"><strong>Phone</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="tel:${phone}" style="color:#0a4d7c">${phone}</a></td></tr>
              <tr><td style="padding:10px 0;color:#555;border-bottom:1px solid #f0f0f0"><strong>Role Applied For</strong></td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${role || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;color:#555"><strong>Registered At</strong></td><td style="padding:10px 0">${submittedAt}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#fff8e1;border-radius:8px;border-left:4px solid #f59e0b">
              <p style="margin:0;font-size:13px;color:#78560a">
                <strong>Action required:</strong> If this applicant does not complete the full form within 48 hours, consider reaching out to them directly at <a href="mailto:${email}" style="color:#0a4d7c">${email}</a> or <a href="tel:${phone}" style="color:#0a4d7c">${phone}</a>.
              </p>
            </div>
          </div>
          <div style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center">
            Reach Healthcare Solutions Limited | Registration No: 11888752
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Don't block the user flow if this notification fails
    console.error('Registration notification error:', error);
    return NextResponse.json({ success: true }); // still return success
  }
}
