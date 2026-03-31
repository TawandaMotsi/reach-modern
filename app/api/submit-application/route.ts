import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

function generatePDF(data: Record<string, unknown>): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const blue = '#0a4d7c';

    // Header / Letterhead
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 40, { height: 50 });
    }
    doc.fontSize(9).fillColor('#555')
      .text('Design Centre Suite 145A, 52 Upper Street, Islington, London N1 0QH', 300, 45, { align: 'right' })
      .text('T: 0203 441 5474  |  E: recruitment@reach-healthcare.com', { align: 'right' })
      .text('www.reach-healthcare.com', { align: 'right' });

    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(blue).lineWidth(2).stroke();
    doc.moveDown(0.5);

    // Title
    doc.fontSize(16).fillColor(blue).font('Helvetica-Bold')
      .text('JOB APPLICATION FORM', { align: 'center' });
    doc.fontSize(11).fillColor('#333').font('Helvetica')
      .text(`Role: ${data.role || ''}`, { align: 'center' });
    doc.moveDown(1);

    const section = (title: string) => {
      doc.moveDown(0.5);
      doc.rect(50, doc.y, 495, 18).fill(blue);
      doc.fontSize(10).fillColor('#fff').font('Helvetica-Bold')
        .text(title, 55, doc.y - 14);
      doc.fillColor('#333').font('Helvetica').fontSize(9);
      doc.moveDown(0.3);
    };

    const field = (label: string, value: unknown) => {
      if (!value) return;
      doc.fontSize(9).font('Helvetica-Bold').fillColor('#555').text(`${label}: `, { continued: true })
        .font('Helvetica').fillColor('#333').text(String(value));
    };

    // Personal Details
    section('PERSONAL DETAILS');
    field('Full Name', `${data.title || ''} ${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim());
    field('Date of Birth', data.dob as string);
    field('Gender', data.gender as string);
    field('Nationality', data.nationality as string);
    field('NI Number', data.niNumber as string);
    field('NMC Pin', data.nmcPin as string);
    field('Mobile', data.mobileNo as string);
    field('Home Phone', data.homePhone as string);
    field('Email', data.email as string);
    field('Address', `${data.streetAddress}, ${data.city}, ${data.county}, ${data.postcode}`);

    // Employment Eligibility
    section('EMPLOYMENT ELIGIBILITY');
    field('Permitted to Work in UK', data.permittedToWork as string);
    field('Right to Work Proof', data.rightToWorkProof as string);
    field('Visa Type', data.visaType as string);
    field('Visa Expiry', data.visaExpiryDate as string);
    field('Passport No', data.passportNo as string);

    // Driving
    section('DRIVING');
    field('Full Driving Licence', data.hasFullLicence as string);
    field('Licence No', data.drivingLicenceNo as string);
    field('Car Available for Work', data.hasCarForWork as string);

    // Next of Kin
    section('NEXT OF KIN');
    field('Name', `${data.nokFirstName || ''} ${data.nokLastName || ''}`.trim());
    field('Relationship', data.nokRelationship as string);
    field('Phone', data.nokMobile as string);
    field('Email', data.nokEmail as string);

    // References
    section('REFERENCES');
    field('Reference 1', `${data.ref1FirstName || ''} ${data.ref1LastName || ''} (${data.ref1Relationship || ''})`);
    field('Ref 1 Email', data.ref1Email as string);
    field('Ref 1 Phone', data.ref1Phone as string);
    field('Reference 2', `${data.ref2FirstName || ''} ${data.ref2LastName || ''} (${data.ref2Relationship || ''})`);
    field('Ref 2 Email', data.ref2Email as string);
    field('Ref 2 Phone', data.ref2Phone as string);

    // Training & DBS
    section('TRAINING & DBS');
    field('Mandatory Training Completed', data.completedMandatoryTraining as string);
    field('Mandatory Training', Array.isArray(data.mandatoryTraining) ? (data.mandatoryTraining as string[]).join(', ') : '');
    field('DBS Check', data.hasDbs as string);
    field('DBS Clear', data.dbsClear as string);
    field('DBS Issue Date', data.dbsIssueDate as string);
    field('DBS Disclosure No', data.dbsDisclosureNumber as string);

    // Health
    section('HEALTH DECLARATION');
    field('Long Term Illness', data.longTermIllness as string);
    field('Registered Disabled', data.registeredDisabled as string);
    field('BCG Vaccination', data.bcgVaccination as string);
    field('Hepatitis B', data.hepatitisB as string);

    // Declaration
    section('DECLARATION');
    field('Declared By', data.declarationFullName as string);
    field('Date', data.declarationDate as string);
    field('Privacy Consent', data.privacyConsent ? 'Yes' : 'No');

    // Footer
    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(blue).lineWidth(1).stroke();
    doc.moveDown(0.3);
    doc.fontSize(8).fillColor('#888')
      .text('Reach Healthcare Solutions Limited | Registration No: 11888752 | CQC Regulated', { align: 'center' });

    doc.end();
  });
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
