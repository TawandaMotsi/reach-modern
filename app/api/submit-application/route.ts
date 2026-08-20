import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Increase body size limit to 20MB to accommodate CV, passport, and other uploads
export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '20mb',
  },
};

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

  const drawHeader = () => {
    page.drawRectangle({ x: 0, y: 742, width: 595, height: 100, color: blue });
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      // embedded async — we skip in inner pages for simplicity
    }
    const infoX = 340;
    page.drawText('Design Centre Suite 145A', { x: infoX, y: 820, font: regular, size: 8, color: white });
    page.drawText('52 Upper Street, Islington', { x: infoX, y: 808, font: regular, size: 8, color: white });
    page.drawText('London N1 0QH', { x: infoX, y: 796, font: regular, size: 8, color: white });
    page.drawText('T: 0203 441 5474', { x: infoX, y: 784, font: regular, size: 8, color: white });
    page.drawText('www.reach-healthcare.com', { x: infoX, y: 772, font: regular, size: 8, color: white });
    page.drawText('recruitment@reach-healthcare.com', { x: infoX, y: 760, font: regular, size: 8, color: white });
  };

  const checkPage = () => {
    if (y < 80) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }
  };

  // ── First page header ──
  drawHeader();

  // Logo on first page
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    const logoBytes = fs.readFileSync(logoPath);
    const logo = await pdfDoc.embedPng(logoBytes);
    const logoDims = logo.scale(0.13);
    page.drawImage(logo, { x: 30, y: 762, width: logoDims.width, height: logoDims.height });
  }

  y = 730;
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
    const strVal = String(value);
    if (strVal.trim() === '') return;
    checkPage();
    if (rowCount % 2 === 0) {
      page.drawRectangle({ x: 50, y: y - 3, width: 495, height: 16, color: lightGrey });
    }
    page.drawText(`${label}:`, { x: 56, y, font: bold, size: 9, color: grey });
    // Truncate long values to fit in the column
    const displayVal = strVal.length > 80 ? strVal.substring(0, 77) + '...' : strVal;
    page.drawText(displayVal, { x: 210, y, font: regular, size: 9, color: dark });
    y -= 16;
    rowCount++;
  };

  // ── SECTION 1: PERSONAL DETAILS ──────────────────────────────────────────
  section('PERSONAL DETAILS');
  rowCount = 0;
  field('Full Name', `${data.title || ''} ${data.firstName || ''} ${data.middleName || ''} ${data.lastName || ''}`.trim());
  field('Date of Birth', data.dob);
  field('Gender', data.gender);
  field('Nationality', data.nationality);
  field('Ethnicity', data.ethnicity);
  field('Religion', data.religion);
  field('Sexual Orientation', data.sexualOrientation);
  field('NI Number', data.niNumber);
  field('NMC Pin', data.nmcPin);
  field('RCN Number', data.rcnNumber);
  field('HPC Number', data.hpcNumber);
  field('Band', data.band);
  field('Mobile', data.mobileNo);
  field('Home Phone', data.homePhone);
  field('Email', data.email);
  field('Address', [data.streetAddress, data.city, data.county, data.postcode].filter(Boolean).join(', '));

  // ── SECTION 2: EMPLOYMENT ELIGIBILITY ────────────────────────────────────
  section('EMPLOYMENT ELIGIBILITY');
  rowCount = 0;
  field('Permitted to Work in UK', data.permittedToWork);
  field('Can Provide Evidence', data.canProvideEvidence);
  field('Right to Work Proof', data.rightToWorkProof);
  field('Visa Type', data.visaType);
  field('Permit Doc Number', data.permitDocNumber);
  field('Passport No', data.passportNo);
  field('Visa Expiry Date', data.visaExpiryDate);

  // ── SECTION 3: DRIVING ───────────────────────────────────────────────────
  section('DRIVING');
  rowCount = 0;
  field('Full Driving Licence', data.hasFullLicence);
  field('Licence Number', data.drivingLicenceNo);
  field('Car Available for Work', data.hasCarForWork);
  field('Driving Ban', data.drivingBan);
  field('Vehicle Docs Up to Date', data.vehicleDocsUpToDate);
  field('Travel to Work', data.travelToWork);

  // ── SECTION 4: WORK PREFERENCES ──────────────────────────────────────────
  section('WORK PREFERENCES');
  rowCount = 0;
  field('Availability', Array.isArray(data.availability) ? (data.availability as string[]).join(', ') : String(data.availability || ''));
  field('Working Time Directive (>48hrs)', data.workingTimeDirective);

  // ── SECTION 5: NEXT OF KIN ───────────────────────────────────────────────
  section('NEXT OF KIN');
  rowCount = 0;
  field('Name', `${data.nokTitle || ''} ${data.nokFirstName || ''} ${data.nokLastName || ''}`.trim());
  field('Relationship', data.nokRelationship);
  field('Mobile', data.nokMobile);
  field('Home Phone', data.nokHomePhone);
  field('Email', data.nokEmail);
  field('Address', [data.nokStreet, data.nokCity, data.nokCounty, data.nokPostcode].filter(Boolean).join(', '));

  // ── SECTION 6: REFERENCES ────────────────────────────────────────────────
  section('REFERENCE 1');
  rowCount = 0;
  field('Name', `${data.ref1FirstName || ''} ${data.ref1LastName || ''}`.trim());
  field('Relationship', data.ref1Relationship);
  field('Email', data.ref1Email);
  field('Phone', data.ref1Phone);
  field('Address', [data.ref1Street, data.ref1City, data.ref1County, data.ref1Postcode].filter(Boolean).join(', '));

  section('REFERENCE 2');
  rowCount = 0;
  field('Name', `${data.ref2FirstName || ''} ${data.ref2LastName || ''}`.trim());
  field('Relationship', data.ref2Relationship);
  field('Email', data.ref2Email);
  field('Phone', data.ref2Phone);
  field('Address', [data.ref2Street, data.ref2City, data.ref2County, data.ref2Postcode].filter(Boolean).join(', '));

  // ── SECTION 7: TRAINING & DBS ────────────────────────────────────────────
  section('TRAINING & DBS');
  rowCount = 0;
  field('Completed Mandatory Training', data.completedMandatoryTraining);
  field('Mandatory Training', Array.isArray(data.mandatoryTraining) ? (data.mandatoryTraining as string[]).join(', ') : '');
  field('Mandatory Training Dates', data.mandatoryTrainingDates);
  field('Completed Other Training', data.completedOtherTraining);
  field('Other Training', Array.isArray(data.otherTraining) ? (data.otherTraining as string[]).join(', ') : '');
  field('Other Training Dates', data.otherTrainingDates);
  field('Has DBS Certificate', data.hasDbs);
  field('DBS Clear', data.dbsClear);
  field('DBS Issue Date', data.dbsIssueDate);
  field('DBS Certificate No', data.dbsDisclosureNumber);

  // ── SECTION 8: HEALTH DECLARATION ────────────────────────────────────────
  section('HEALTH DECLARATION');
  rowCount = 0;
  field('Long Term Illness', data.longTermIllness);
  field('Sick Leave (Back/Neck)', data.sickLeaveBackNeck);
  field('Back/Neck Injury Details', data.backNeckInjury);
  field('Contact with Contagious', data.contactContagious);
  field('Communicable Disease', data.communicableDisease);
  field('Active Medical Attention', data.activemedicalAttention);
  field('Health Details', data.healthDetails);
  field('Registered Disabled', data.registeredDisabled);
  field('Days Absent (Illness)', data.illnessDaysAbsent);
  field('Absence Reasons', data.absenceReasons);
  field('Illness Affects Work', data.illnessAffectsWork);
  field('Illness Caused by Work', data.illnessCausedByWork);
  field('Awaiting Treatment', data.awaitingTreatment);
  field('Needs Adjustments', data.needsAdjustments);
  field('Medical Additional Info', data.medicalAdditional);

  // ── SECTION 9: TB SCREENING ───────────────────────────────────────────────
  section('TB SCREENING');
  rowCount = 0;
  field('Lived in UK 5+ Years', data.livedInUK5Years);
  field('Countries Lived In', data.countriesLived);
  field('BCG Vaccination', data.bcgVaccination);
  field('BCG Date', data.bcgDate);
  field('Persistent Cough', data.persistentCough);
  field('Unexplained Weight Loss', data.unexplainedWeightLoss);
  field('Unexplained Fever', data.unexplainedFever);
  field('Had TB', data.hadTB);
  field('TB Additional Info', data.tbAdditional);

  // ── SECTION 10: IMMUNISATION ──────────────────────────────────────────────
  section('IMMUNISATION');
  rowCount = 0;
  field('Had Chicken Pox', data.hadChickenPox);
  field('Chicken Pox Date', data.chickenPoxDate);
  field('Triple Vaccination', data.tripleVaccination);
  field('Polio', data.polio);
  field('Tetanus', data.tetanus);
  field('Hepatitis B', data.hepatitisB);
  field('Hepatitis B Details', data.hepatitisBDetails);
  field('Exposure Prone Procedures', data.exposureProneProcedures);

  // ── SECTION 11: CRIMINAL RECORD ───────────────────────────────────────────
  section('CRIMINAL RECORD DECLARATION');
  rowCount = 0;
  field('Criminal Conviction', data.criminalConviction);
  field('Cautioned or Warned', data.cautionedOrWarned);
  field('Criminal Details', data.criminalDetails);
  field('Right to Work Document', data.rightToWorkDocument);

  // ── SECTION 12: FINAL DECLARATION ────────────────────────────────────────
  section('FINAL DECLARATION');
  rowCount = 0;
  field('Declared By', data.declarationFullName);
  field('Date', data.declarationDate);
  field('Privacy Consent', data.privacyConsent ? 'Yes' : 'No');
  field('DBS Declaration Confirmed', data.dbsDeclarationConfirm ? 'Yes' : 'No');
  field('Health Declaration Confirmed', data.healthDeclarationConfirm ? 'Yes' : 'No');

  // Footer on last page
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

    // Basic server-side validation
    const requiredFields = ['firstName', 'lastName', 'email', 'mobileNo', 'role'];
    const missingFields = requiredFields.filter(f => !data[f]);
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    // Collect uploaded files
    const fileFields = ['idPhoto', 'passportCopy', 'proofOfAddress', 'cvFile', 'trainingCert'];
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file

    for (const field of fileFields) {
      const file = formData.get(field) as File | null;
      if (file && file.size > 0) {
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({
            success: false,
            message: `File "${file.name}" is too large. Maximum size per file is 5MB.`,
          }, { status: 400 });
        }
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

    // Send confirmation email to applicant
    if (data.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email as string,
        subject: `Application Received — Reach Healthcare Solutions`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
            <div style="background:#0a4d7c;padding:24px 32px">
              <h1 style="color:#fff;margin:0;font-size:20px">Application Received</h1>
            </div>
            <div style="padding:28px 32px;background:#fff">
              <p style="font-size:14px;color:#333;line-height:1.7">Dear ${data.firstName},</p>
              <p style="font-size:14px;color:#333;line-height:1.7">Thank you for submitting your application for the <strong>${data.role}</strong> position at Reach Healthcare Solutions.</p>
              <p style="font-size:14px;color:#333;line-height:1.7">We have received your application and our recruitment team will review it within 2–3 working days. We will be in touch regarding next steps.</p>
              <p style="font-size:14px;color:#333;line-height:1.7">If you have any questions in the meantime, please contact us at <a href="mailto:recruitment@reach-healthcare.com">recruitment@reach-healthcare.com</a> or call 0203 441 5474.</p>
              <p style="font-size:14px;color:#555;margin-top:24px">Kind regards,<br><strong>Reach Healthcare Recruitment Team</strong></p>
            </div>
            <div style="background:#f5f5f5;padding:16px 32px;font-size:12px;color:#999;text-align:center">
              Reach Healthcare Solutions Limited | Registration No: 11888752
            </div>
          </div>
        `,
      }).catch(() => { /* Don't fail the submission if confirmation email fails */ });
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('ECONNREFUSED') || message.includes('ETIMEDOUT')) {
      return NextResponse.json({
        success: false,
        message: 'Email service is temporarily unavailable. Please try again in a few minutes or contact recruitment@reach-healthcare.com directly.',
      }, { status: 503 });
    }
    if (message.includes('auth') || message.includes('credentials')) {
      return NextResponse.json({
        success: false,
        message: 'There is a server configuration issue. Please contact recruitment@reach-healthcare.com directly.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: false,
      message: 'Failed to submit application. Please try again or contact recruitment@reach-healthcare.com if the problem persists.',
    }, { status: 500 });
  }
}
