import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, firstName } = await request.json();

    if (!email || !firstName) {
      return NextResponse.json({ success: false, message: 'Email and name required' }, { status: 400 });
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

    const siteUrl = process.env.SITE_URL || 'https://www.reach-healthcare.com';

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Application Has Been Saved — Reach Healthcare',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
          <div style="background:#0a4d7c;padding:24px 32px">
            <h1 style="color:#fff;margin:0;font-size:20px">Application Saved</h1>
          </div>
          <div style="padding:28px 32px;background:#fff">
            <p style="font-size:14px;color:#333;line-height:1.7">Dear ${firstName},</p>
            <p style="font-size:14px;color:#333;line-height:1.7">Your application progress has been saved. You can return to complete it at any time by visiting the link below on the same device and browser:</p>
            <p style="text-align:center;margin:24px 0">
              <a href="${siteUrl}/applicationform" style="display:inline-block;background:#0984e3;color:#fff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;font-size:14px">Resume Application</a>
            </p>
            <p style="font-size:13px;color:#666;line-height:1.7">Please note: your draft is saved in your browser. If you clear your browsing data or use a different device, you will need to start again.</p>
            <p style="font-size:14px;color:#333;line-height:1.7">If you have any questions, contact us at <a href="mailto:recruitment@reach-healthcare.com">recruitment@reach-healthcare.com</a> or call 0203 441 5474.</p>
            <p style="font-size:14px;color:#555;margin-top:24px">Kind regards,<br><strong>Reach Healthcare Recruitment Team</strong></p>
          </div>
          <div style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center">
            Reach Healthcare Solutions Limited | Registration No: 11888752
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save draft email error:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}
