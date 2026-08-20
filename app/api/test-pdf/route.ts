// Development-only endpoint — generates PDF and returns it without sending email.
import { NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  try {
    const formData = await request.formData();
    const data = JSON.parse(formData.get('data') as string) as Record<string, unknown>;

    // Inline PDF generation (same logic as submit-application/route.ts)
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
      if (y < 80) { page = pdfDoc.addPage([595, 842]); y = 800; }
    };

    page.drawRectangle({ x: 0, y: 742, width: 595, height: 100, color: blue });
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      const logo = await pdfDoc.embedPng(fs.readFileSync(logoPath));
      const d = logo.scale(0.13);
      page.drawImage(logo, { x: 30, y: 762, width: d.width, height: d.height });
    }
    const ix = 340;
    page.drawText('Design Centre Suite 145A', { x: ix, y: 820, font: regular, size: 8, color: white });
    page.drawText('52 Upper Street, Islington', { x: ix, y: 808, font: regular, size: 8, color: white });
    page.drawText('London N1 0QH',             { x: ix, y: 796, font: regular, size: 8, color: white });
    page.drawText('T: 0203 441 5474',          { x: ix, y: 784, font: regular, size: 8, color: white });
    page.drawText('www.reach-healthcare.com',  { x: ix, y: 772, font: regular, size: 8, color: white });
    page.drawText('recruitment@reach-healthcare.com', { x: ix, y: 760, font: regular, size: 8, color: white });

    y = 730;
    page.drawText('JOB APPLICATION FORM', { x: 50, y, font: bold, size: 18, color: blue });
    y -= 20;
    page.drawText(`Role Applied For: ${data.role || ''}`, { x: 50, y, font: regular, size: 11, color: dark });
    y -= 8;
    page.drawRectangle({ x: 50, y, width: 495, height: 1.5, color: blue });
    y -= 20;

    const section = (title: string) => {
      checkPage(); y -= 6;
      page.drawRectangle({ x: 50, y: y - 2, width: 495, height: 20, color: blue });
      page.drawText(title, { x: 56, y: y + 4, font: bold, size: 10, color: white });
      y -= 26;
    };

    let rowCount = 0;
    const field = (label: string, value: unknown) => {
      if (value === null || value === undefined || String(value).trim() === '') return;
      checkPage();
      if (rowCount % 2 === 0) page.drawRectangle({ x: 50, y: y - 3, width: 495, height: 16, color: lightGrey });
      page.drawText(`${label}:`, { x: 56, y, font: bold, size: 9, color: grey });
      const v = String(value); 
      page.drawText(v.length > 80 ? v.substring(0, 77) + '...' : v, { x: 210, y, font: regular, size: 9, color: dark });
      y -= 16; rowCount++;
    };

    section('PERSONAL DETAILS'); rowCount = 0;
    field('Full Name', `${data.title||''} ${data.firstName||''} ${data.middleName||''} ${data.lastName||''}`.trim());
    field('Date of Birth', data.dob); field('Gender', data.gender); field('Nationality', data.nationality);
    field('Ethnicity', data.ethnicity); field('Religion', data.religion); field('Sexual Orientation', data.sexualOrientation);
    field('NI Number', data.niNumber); field('NMC Pin', data.nmcPin); field('RCN Number', data.rcnNumber);
    field('HPC Number', data.hpcNumber); field('Band', data.band);
    field('Mobile', data.mobileNo); field('Home Phone', data.homePhone); field('Email', data.email);
    field('Address', [data.streetAddress,data.city,data.county,data.postcode].filter(Boolean).join(', '));

    section('EMPLOYMENT ELIGIBILITY'); rowCount = 0;
    field('Permitted to Work in UK', data.permittedToWork); field('Can Provide Evidence', data.canProvideEvidence);
    field('Right to Work Proof', data.rightToWorkProof); field('Visa Type', data.visaType);
    field('Permit Doc Number', data.permitDocNumber); field('Passport No', data.passportNo);
    field('Visa Expiry Date', data.visaExpiryDate);

    section('DRIVING'); rowCount = 0;
    field('Full Driving Licence', data.hasFullLicence); field('Licence Number', data.drivingLicenceNo);
    field('Car Available for Work', data.hasCarForWork); field('Driving Ban', data.drivingBan);
    field('Vehicle Docs Up to Date', data.vehicleDocsUpToDate); field('Travel to Work', data.travelToWork);

    section('WORK PREFERENCES'); rowCount = 0;
    field('Availability', Array.isArray(data.availability) ? (data.availability as string[]).join(', ') : String(data.availability||''));
    field('Working Time Directive (>48hrs)', data.workingTimeDirective);

    section('NEXT OF KIN'); rowCount = 0;
    field('Name', `${data.nokTitle||''} ${data.nokFirstName||''} ${data.nokLastName||''}`.trim());
    field('Relationship', data.nokRelationship); field('Mobile', data.nokMobile);
    field('Home Phone', data.nokHomePhone); field('Email', data.nokEmail);
    field('Address', [data.nokStreet,data.nokCity,data.nokCounty,data.nokPostcode].filter(Boolean).join(', '));

    section('REFERENCE 1'); rowCount = 0;
    field('Name', `${data.ref1FirstName||''} ${data.ref1LastName||''}`.trim());
    field('Relationship', data.ref1Relationship); field('Email', data.ref1Email); field('Phone', data.ref1Phone);
    field('Address', [data.ref1Street,data.ref1City,data.ref1County,data.ref1Postcode].filter(Boolean).join(', '));

    section('REFERENCE 2'); rowCount = 0;
    field('Name', `${data.ref2FirstName||''} ${data.ref2LastName||''}`.trim());
    field('Relationship', data.ref2Relationship); field('Email', data.ref2Email); field('Phone', data.ref2Phone);
    field('Address', [data.ref2Street,data.ref2City,data.ref2County,data.ref2Postcode].filter(Boolean).join(', '));

    section('TRAINING & DBS'); rowCount = 0;
    field('Completed Mandatory Training', data.completedMandatoryTraining);
    field('Mandatory Training', Array.isArray(data.mandatoryTraining) ? (data.mandatoryTraining as string[]).join(', ') : '');
    field('Mandatory Training Dates', data.mandatoryTrainingDates);
    field('Completed Other Training', data.completedOtherTraining);
    field('Other Training', Array.isArray(data.otherTraining) ? (data.otherTraining as string[]).join(', ') : '');
    field('Other Training Dates', data.otherTrainingDates);
    field('Has DBS Certificate', data.hasDbs); field('DBS Clear', data.dbsClear);
    field('DBS Issue Date', data.dbsIssueDate); field('DBS Certificate No', data.dbsDisclosureNumber);

    section('HEALTH DECLARATION'); rowCount = 0;
    field('Long Term Illness', data.longTermIllness); field('Sick Leave (Back/Neck)', data.sickLeaveBackNeck);
    field('Back/Neck Injury Details', data.backNeckInjury); field('Contact with Contagious', data.contactContagious);
    field('Communicable Disease', data.communicableDisease); field('Active Medical Attention', data.activemedicalAttention);
    field('Health Details', data.healthDetails); field('Registered Disabled', data.registeredDisabled);
    field('Days Absent (Illness)', data.illnessDaysAbsent); field('Absence Reasons', data.absenceReasons);
    field('Illness Affects Work', data.illnessAffectsWork); field('Illness Caused by Work', data.illnessCausedByWork);
    field('Awaiting Treatment', data.awaitingTreatment); field('Needs Adjustments', data.needsAdjustments);
    field('Medical Additional Info', data.medicalAdditional);

    section('TB SCREENING'); rowCount = 0;
    field('Lived in UK 5+ Years', data.livedInUK5Years); field('Countries Lived In', data.countriesLived);
    field('BCG Vaccination', data.bcgVaccination); field('BCG Date', data.bcgDate);
    field('Persistent Cough', data.persistentCough); field('Unexplained Weight Loss', data.unexplainedWeightLoss);
    field('Unexplained Fever', data.unexplainedFever); field('Had TB', data.hadTB); field('TB Additional Info', data.tbAdditional);

    section('IMMUNISATION'); rowCount = 0;
    field('Had Chicken Pox', data.hadChickenPox); field('Chicken Pox Date', data.chickenPoxDate);
    field('Triple Vaccination', data.tripleVaccination); field('Polio', data.polio); field('Tetanus', data.tetanus);
    field('Hepatitis B', data.hepatitisB); field('Hepatitis B Details', data.hepatitisBDetails);
    field('Exposure Prone Procedures', data.exposureProneProcedures);

    section('CRIMINAL RECORD DECLARATION'); rowCount = 0;
    field('Criminal Conviction', data.criminalConviction); field('Cautioned or Warned', data.cautionedOrWarned);
    field('Criminal Details', data.criminalDetails); field('Right to Work Document', data.rightToWorkDocument);

    section('FINAL DECLARATION'); rowCount = 0;
    field('Declared By', data.declarationFullName); field('Date', data.declarationDate);
    field('Privacy Consent', data.privacyConsent ? 'Yes' : 'No');
    field('DBS Declaration Confirmed', data.dbsDeclarationConfirm ? 'Yes' : 'No');
    field('Health Declaration Confirmed', data.healthDeclarationConfirm ? 'Yes' : 'No');

    y -= 16;
    page.drawRectangle({ x: 50, y, width: 495, height: 1, color: blue });
    y -= 14;
    page.drawText('Reach Healthcare Solutions Limited | Registration No: 11888752 | CQC Regulated', { x: 90, y, font: regular, size: 8, color: grey });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="test-application.pdf"',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
