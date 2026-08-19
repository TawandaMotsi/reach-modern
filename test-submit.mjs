/**
 * Test script — tests both registration notification and full application submission.
 * Usage:
 *   node test-submit.mjs                        (tests localhost:3000)
 *   node test-submit.mjs https://reach-healthcare.com  (tests production)
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

const testRegistration = {
  firstName: 'Test',
  lastName: 'Applicant',
  email: 'test@example.com',
  phone: '07700900000',
  role: 'Care Worker',
};

const testApplication = {
  title: 'Mr',
  firstName: 'Test',
  middleName: '',
  lastName: 'Applicant',
  dob: '1990-01-15',
  gender: 'Male',
  nationality: 'British',
  niNumber: 'AB123456C',
  nmcPin: '',
  mobileNo: '07700900000',
  homePhone: '02034415474',
  email: 'test@example.com',
  streetAddress: '52 Upper Street',
  city: 'London',
  county: 'Greater London',
  postcode: 'N1 0QH',
  role: 'Care Worker',
  permittedToWork: 'Yes',
  rightToWorkProof: 'Passport',
  visaType: '',
  visaExpiryDate: '',
  passportNo: 'GB12345678',
  hasFullLicence: 'Yes',
  drivingLicenceNo: 'APPLI901015TF9PQ',
  hasCarForWork: 'Yes',
  nokFirstName: 'Jane',
  nokLastName: 'Applicant',
  nokRelationship: 'Spouse',
  nokMobile: '07700900001',
  nokEmail: 'jane@example.com',
  ref1FirstName: 'Dr',
  ref1LastName: 'Smith',
  ref1Relationship: 'Previous Employer',
  ref1Email: 'drsmith@example.com',
  ref1Phone: '07700900002',
  ref2FirstName: 'Ms',
  ref2LastName: 'Jones',
  ref2Relationship: 'Previous Employer',
  ref2Email: 'msjones@example.com',
  ref2Phone: '07700900003',
  mandatoryTraining: ['Manual Handling', 'First Aid'],
  hasDbs: 'Yes',
  dbsClear: 'Yes',
  dbsIssueDate: '2023-06-01',
  dbsDisclosureNumber: 'DBS123456789',
  longTermIllness: 'No',
  registeredDisabled: 'No',
  bcgVaccination: 'Yes',
  hepatitisB: 'Yes',
  declarationFullName: 'Test Applicant',
  declarationDate: new Date().toISOString().split('T')[0],
  privacyConsent: true,
};

async function testRegistrationNotification() {
  console.log('\n── TEST 1: Registration Notification ──────────────────');
  const url = `${BASE_URL}/api/notify-registration`;
  console.log(`POST ${url}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testRegistration),
  });
  const json = await res.json();

  console.log(`Status:  ${res.status}`);
  console.log(`Success: ${json.success}`);
  if (json.message) console.log(`Message: ${json.message}`);
  console.log(json.success ? '✅ Registration notification sent.' : '❌ Failed.');
}

async function testApplicationSubmission() {
  console.log('\n── TEST 2: Full Application Submission ────────────────');
  const url = `${BASE_URL}/api/submit-application`;
  console.log(`POST ${url}`);

  const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
  const body = `--${boundary}\r\nContent-Disposition: form-data; name="data"\r\n\r\n${JSON.stringify(testApplication)}\r\n--${boundary}--\r\n`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}` },
    body,
  });
  const json = await res.json();

  console.log(`Status:  ${res.status}`);
  console.log(`Success: ${json.success}`);
  console.log(`Message: ${json.message}`);
  console.log(json.success ? '✅ Application submitted — check inbox.' : '❌ Failed.');
}

async function run() {
  console.log(`\nTarget: ${BASE_URL}`);
  try {
    await testRegistrationNotification();
    await testApplicationSubmission();
  } catch (err) {
    console.error('\n❌ Request failed:', err.message);
    console.error('Make sure the server is running or the URL is correct.');
  }
  console.log('\n───────────────────────────────────────────────────────\n');
}

run();
