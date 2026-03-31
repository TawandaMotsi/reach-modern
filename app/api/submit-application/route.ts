import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF(data: Record<string, unknown>): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const { height } = page.getSize();

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const blue = rgb(0.04, 0.30, 0.49);
  const white = rgb(1, 1, 1);
  const dark = rgb(0.2, 0.2, 0.2);
  const grey = rgb(0.4, 0.4, 0.4);

  let y = height - 50;

  // Logo
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    const logoBytes = fs.readFileSync(logoPath);
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDims = logo.scale(0.15);
    page.drawImage(logo, { x: 50, y: y - logoDims.height, width: logoDims.width, height: logoDims.height });
  }

  // Company info top right
  page.drawText('Design Centre Suite 145A, 52 Upper Street', { x: 350, y, font: regular, size: 8, color: grey });
  page.drawText('Islington, London N1 0QH', { x: 350, y: y - 12, font: regular, size: 8, color: grey });
  page.drawText('T: 0203 441 5474', { x: 350, y: y - 24, font: regular, size: 8, color: grey });
  page.drawText('www.reach-healthcare.com', { x: 350, y: y - 36, font: regular, size: 8, color: grey });

  y -= 70;

  // Blue divider
  page.drawRectangle({ x: 50, y, width: 495, height: 2, color: blue });
  y -= 20;

  // Title
  page.drawText('JOB APPLICATION FORM', { x: 175, y, font: bold, size: 16, color: blue });
  y -= 18;
  page.drawText(`Role: ${data.role || ''}`, { x: 220, y, font: regular, size: 11, color: dark });
  y -= 25;

  const section = (title: string) => {
    page.drawRectangle({ x: 50, y: y - 4, width: 495, height: 18, color: blue });
    page.drawText(title, { x: 55, y, font: bold, size: 10, color: white });
    y -= 24;
  };

  const field = (label: string, value: unknown) => {
    if (!value) return;
    page.drawText(`${label}:`, { x: 55, y, font: bold, size: 9, color: grey });
    page.drawText(String(value).substring(0, 80), { x: 200, y, font: regular, size: 9, color: dark });
    y -= 14;
    if (y < 60) { pdfDoc.addPage([595, 842]); y = 800; }
  };

  section('PERSONAL DETAILS');
  field('Full Name', `${data.title || ''} ${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim());
  field('Date of Birth', data.dob);
  field('Gender', data.gender);
  field('Nationality', data.nationality);
  field('NI Number', data.niNumber);
  field('NMC Pin', data.nmcPin);
  field('Mobile', data.mobileNo);
  field('Email', data.email);
  field('Address', `${data.streetAddress}, ${data.city}, ${data.county}, ${data.postcode}`);

  section('EMPLOYMENT ELIGIBILITY');
  field('Permitted to Work in UK', data.permittedToWork);
  field('Right to Work Proof', data.rightToWorkProof);
  field('Visa Type', data.visaType);
  field('Visa Expiry', data.visaExpiryDate);
  field('Passport No', data.passportNo);

  section('DRIVING');
  field('Full Driving Licence', data.hasFullLicence);
  field('Licence No', data.drivingLicenceNo);
  field('Car Available for Work', data.hasCarForWork);

  section('NEXT OF KIN');
  field('Name', `${data.nokFirstName || ''} ${data.nokLastName || ''}`.trim());
  field('Relationship', data.nokRelationship);
  field('Phone', data.nokMobile);
  field('Email', data.nokEmail);

  section('REFERENCES');
  field('Reference 1', `${data.ref1FirstName || ''} ${data.ref1LastName || ''} (${data.ref1Relationship || ''})`);
  field('Ref 1 Email', data.ref1Email);
  field('Ref 1 Phone', data.ref1Phone);
  field('Reference 2', `${data.ref2FirstName || ''} ${data.ref2LastName || ''} (${data.ref2Relationship || ''})`);
  field('Ref 2 Email', data.ref2Email);
  field('Ref 2 Phone', data.ref2Phone);

  section('TRAINING & DBS');
  field('Mandatory Training', Array.isArray(data.mandatoryTraining) ? (data.mandatoryTraining as string[]).join(', ') : '');
  field('DBS Check', data.hasDbs);
  field('DBS Clear', data.dbsClear);
  field('DBS Issue Date', data.dbsIssueDate);
  field('DBS Disclosure No', data.dbsDisclosureNumber);

  section('HEALTH DECLARATION');
  field('Long Term Illness', data.longTermIllness);
  field('Registered Disabled', data.registeredDisabled);
  field('BCG Vaccination', data.bcgVaccination);
  field('Hepatitis B', data.hepatitisB);

  section('DECLARATION');
  field('Declared By', data.declarationFullName);
  field('Date', data.declarationDate);
  field('Privacy Consent', data.privacyConsent ? 'Yes' : 'No');

  // Footer
  y -= 10;
  page.drawRectangle({ x: 50, y, width: 495, height: 1, color: blue });
  y -= 14;
  page.drawText('Reach Healthcare Solutions Limited | Registration No: 11888752 | CQC Regulated', { x: 100, y, font: regular, size: 8, color: grey });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.reach-healthcare.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const pdfBuffer = await generatePDF(data);

    const htmlBody = `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#0a4d7c;padding:24px 32px;display:flex;align-items:center">
          <div>
            <h1 style="color:#fff;margin:0;font-size:20px">New Job Application</h1>
            <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:13px">Reach Healthcare Solutions</p>
          </div>
        </div>
        <div style="padding:28px 32px;background:#fff">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#555;width:40%"><strong>Name</strong></td><td style="padding:8px 0">${data.title || ''} ${data.firstName} ${data.lastName}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 0;color:#555"><strong>Role Applied For</strong></td><td style="padding:8px 0">${data.role}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>Email</strong></td><td style="padding:8px 0">${data.email}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 0;color:#555"><strong>Mobile</strong></td><td style="padding:8px 0">${data.mobileNo}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>Address</strong></td><td style="padding:8px 0">${data.streetAddress}, ${data.city}, ${data.county}, ${data.postcode}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 0;color:#555"><strong>Date of Birth</strong></td><td style="padding:8px 0">${data.dob}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>NI Number</strong></td><td style="padding:8px 0">${data.niNumber}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px 0;color:#555"><strong>DBS Check</strong></td><td style="padding:8px 0">${data.hasDbs}</td></tr>
            <tr><td style="padding:8px 0;color:#555"><strong>Declaration Date</strong></td><td style="padding:8px 0">${data.declarationDate}</td></tr>
          </table>
          <p style="margin-top:24px;font-size:13px;color:#888">Full application details are attached as a PDF.</p>
        </div>
        <div style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center">
          Reach Healthcare Solutions Limited | Registration No: 11888752
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Application: ${data.firstName} ${data.lastName} — ${data.role}`,
      html: htmlBody,
      attachments: [
        {
          filename: `Application_${data.firstName}_${data.lastName}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
