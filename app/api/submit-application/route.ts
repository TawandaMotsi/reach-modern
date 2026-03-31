import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF(data: Record<string, unknown>): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]);

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const blue = rgb(0.04, 0.30, 0.49);
  const white = rgb(1, 1, 1);
  const dark = rgb(0.2, 0.2, 0.2);
  const grey = rgb(0.4, 0.4, 0.4);
  const lightGrey = rgb(0.96, 0.96, 0.96);

  let y = 792;

  const checkPage = () => {
    if (y < 80) {
      page = pdfDoc.addPage([595, 842]);
      y = 792;
    }
  };

  // ── Header background ──
  page.drawRectangle({ x: 0, y: 742, width: 595, height: 100, color: blue });

  // Logo
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    const logoBytes = fs.readFileSync(logoPath);
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDims = logo.scale(0.13);
    page.drawImage(logo, { x: 30, y: 762, width: logoDims.width, height: logoDims.height });
  }

  // Company info — right side of header
  const infoX = 340;
  page.drawText('Design Centre Suite 145A', { x: infoX, y: 820, font: regular, size: 8, color: white });
  page.drawText('52 Upper Street, Islington', { x: infoX, y: 808, font: regular, size: 8, color: white });
  page.drawText('London N1 0QH', { x: infoX, y: 796, font: regular, size: 8, color: white });
  page.drawText('T: 0203 441 5474', { x: infoX, y: 784, font: regular, size: 8, color: white });
  page.drawText('www.reach-healthcare.com', { x: infoX, y: 772, font: regular, size: 8, color: white });
  page.drawText('recruitment@reach-healthcare.com', { x: infoX, y: 760, font: regular, size: 8, color: white });

  y = 730;

  // Title block
  page.drawText('JOB APPLICATION FORM', { x: 50, y, font: bold, size: 18, color: blue });
  y -= 20;
  page.drawText(`Role Applied For: ${data.role || ''}`, { x: 50, y, font: regular, size: 11, color: dark });
  y -= 8;
  page.drawRectangle({ x: 50, y, width: 495, height: 1.5, color: blue });
  y -= 20;

  const section = (title: string) => {
    checkPage();
    y -= 6;
    page.drawRectangle({ x: 50, y: y - 2, width: 495, height: 20, color: blue });
    page.drawText(title, { x: 56, y: y + 4, font: bold, size: 10, color: white });
    y -= 26;
  };

  let rowCount = 0;
  const field = (label: string, value: unknown) => {
    if (value === null || value === undefined || value === '') return;
    checkPage();
    if (rowCount % 2 === 0) {
      page.drawRectangle({ x: 50, y: y - 3, width: 495, height: 16, color: lightGrey });
    }
    page.drawText(`${label}:`, { x: 56, y, font: bold, size: 9, color: grey });
    page.drawText(String(value).substring(0, 85), { x: 200, y, font: regular, size: 9, color: dark });
    y -= 16;
    rowCount++;
  };

  section('PERSONAL DETAILS');
  rowCount = 0;
  field('Full Name', `${data.title || ''} ${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim());
  field('Date of Birth', data.dob);
  field('Gender', data.gender);
  field('Nationality', data.nationality);
  field('NI Number', data.niNumber);
  field('NMC Pin', data.nmcPin);
  field('Mobile', data.mobileNo);
  field('Home Phone', data.homePhone);
  field('Email', data.email);
  field('Address', `${data.streetAddress}, ${data.city}, ${data.county}, ${data.postcode}`);

  section('EMPLOYMENT ELIGIBILITY');
  rowCount = 0;
  field('Permitted to Work in UK', data.permittedToWork);
  field('Right to Work Proof', data.rightToWorkProof);
  field('Visa Type', data.visaType);
  field('Visa Expiry', data.visaExpiryDate);
  field('Passport No', data.passportNo);

  section('DRIVING');
  rowCount = 0;
  field('Full Driving Licence', data.hasFullLicence);
  field('Licence No', data.drivingLicenceNo);
  field('Car Available for Work', data.hasCarForWork);

  section('NEXT OF KIN');
  rowCount = 0;
  field('Name', `${data.nokFirstName || ''} ${data.nokLastName || ''}`.trim());
  field('Relationship', data.nokRelationship);
  field('Phone', data.nokMobile);
  field('Email', data.nokEmail);

  section('REFERENCES');
  rowCount = 0;
  field('Reference 1', `${data.ref1FirstName || ''} ${data.ref1LastName || ''} (${data.ref1Relationship || ''})`);
  field('Ref 1 Email', data.ref1Email);
  field('Ref 1 Phone', data.ref1Phone);
  field('Reference 2', `${data.ref2FirstName || ''} ${data.ref2LastName || ''} (${data.ref2Relationship || ''})`);
  field('Ref 2 Email', data.ref2Email);
  field('Ref 2 Phone', data.ref2Phone);

  section('TRAINING & DBS');
  rowCount = 0;
  field('Mandatory Training', Array.isArray(data.mandatoryTraining) ? (data.mandatoryTraining as string[]).join(', ') : '');
  field('DBS Check', data.hasDbs);
  field('DBS Clear', data.dbsClear);
  field('DBS Issue Date', data.dbsIssueDate);
  field('DBS Disclosure No', data.dbsDisclosureNumber);

  section('HEALTH DECLARATION');
  rowCount = 0;
  field('Long Term Illness', data.longTermIllness);
  field('Registered Disabled', data.registeredDisabled);
  field('BCG Vaccination', data.bcgVaccination);
  field('Hepatitis B', data.hepatitisB);

  section('DECLARATION');
  rowCount = 0;
  field('Declared By', data.declarationFullName);
  field('Date', data.declarationDate);
  field('Privacy Consent', data.privacyConsent ? 'Yes' : 'No');

  // Footer
  y -= 16;
  page.drawRectangle({ x: 50, y, width: 495, height: 1, color: blue });
  y -= 14;
  page.drawText('Reach Healthcare Solutions Limited | Registration No: 11888752 | CQC Regulated', { x: 90, y, font: regular, size: 8, color: grey });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string) as Record<string, unknown>;

    // Collect uploaded files
    const fileFields = ['idPhoto', 'passportCopy', 'proofOfAddress', 'cvFile', 'trainingCert'];
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

    for (const field of fileFields) {
      const file = formData.get(field) as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({ filename: file.name, content: buffer, contentType: file.type });
      }
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
        ...attachments,
      ],
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
