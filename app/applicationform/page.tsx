"use client";

import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1 – Personal Details
  role: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  homePhone: string;
  mobileNo: string;
  email: string;
  dob: string;
  niNumber: string;
  nmcPin: string;
  rcnNumber: string;
  hpcNumber: string;
  band: string;
  // Address
  streetAddress: string;
  city: string;
  county: string;
  postcode: string;
  // Personal Details 2
  nationality: string;
  gender: string;
  religion: string;
  ethnicity: string;
  sexualOrientation: string;
  idPhoto: File | null;
  // Employment Eligibility
  permittedToWork: string;
  canProvideEvidence: string;
  rightToWorkProof: string;
  visaType: string;
  permitDocNumber: string;
  passportNo: string;
  visaExpiryDate: string;
  passportCopy: File | null;
  proofOfAddress: File | null;
  // Driving
  hasFullLicence: string;
  drivingLicenceNo: string;
  hasCarForWork: string;
  drivingBan: string;
  vehicleDocsUpToDate: string;
  travelToWork: string;
  // Next of Kin
  nokTitle: string;
  nokFirstName: string;
  nokLastName: string;
  nokRelationship: string;
  nokHomePhone: string;
  nokMobile: string;
  nokEmail: string;
  nokStreet: string;
  nokCity: string;
  nokCounty: string;
  nokPostcode: string;
  // Work Preference
  availability: string[];

  // Step 2 – Employment & Education
  cvFile: File | null;
  // Reference 1
  ref1Relationship: string;
  ref1FirstName: string;
  ref1LastName: string;
  ref1Email: string;
  ref1EmailConfirm: string;
  ref1Phone: string;
  ref1Street: string;
  ref1City: string;
  ref1County: string;
  ref1Postcode: string;
  // Reference 2
  ref2Relationship: string;
  ref2FirstName: string;
  ref2LastName: string;
  ref2Email: string;
  ref2EmailConfirm: string;
  ref2Phone: string;
  ref2Street: string;
  ref2City: string;
  ref2County: string;
  ref2Postcode: string;

  // Step 3 – Skills & Training
  completedMandatoryTraining: string;
  mandatoryTraining: string[];
  trainingCert: File | null;
  mandatoryTrainingDates: string;
  completedOtherTraining: string;
  otherTraining: string[];
  otherTrainingDates: string;
  // DBS
  hasDbs: string;
  dbsClear: string;
  dbsIssueDate: string;
  dbsDisclosureNumber: string;

  // Step 4 – Declarations
  // Health
  longTermIllness: string;
  sickLeaveBackNeck: string;
  backNeckInjury: string;
  contactContagious: string;
  communicableDisease: string;
  activemedicalAttention: string;
  healthDetails: string;
  registeredDisabled: string;
  illnessDaysAbsent: string;
  absenceReasons: string;
  // Medical History
  illnessAffectsWork: string;
  illnessCausedByWork: string;
  awaitingTreatment: string;
  needsAdjustments: string;
  medicalAdditional: string;
  // TB
  livedInUK5Years: string;
  countriesLived: string;
  bcgVaccination: string;
  bcgDate: string;
  persistentCough: string;
  unexplainedWeightLoss: string;
  unexplainedFever: string;
  hadTB: string;
  tbAdditional: string;
  // Chicken Pox
  hadChickenPox: string;
  chickenPoxDate: string;
  // Immunisation
  tripleVaccination: string;
  polio: string;
  tetanus: string;
  hepatitisB: string;
  hepatitisBDetails: string;
  // EPP
  exposureProneProcedures: string;
  // DBS Declaration
  criminalConviction: string;
  cautionedOrWarned: string;
  criminalDetails: string;
  dbsDeclarationConfirm: boolean;
  healthDeclarationConfirm: boolean;
  // Right to Work
  rightToWorkDocument: string;
  // Working Time
  workingTimeDirective: string;
  // Final Declaration
  declarationDate: string;
  declarationFullName: string;
  privacyConsent: boolean;
}

const initialForm: FormData = {
  role: "", title: "", firstName: "", middleName: "", lastName: "",
  homePhone: "", mobileNo: "", email: "", dob: "", niNumber: "", nmcPin: "",
  rcnNumber: "", hpcNumber: "", band: "",
  streetAddress: "", city: "", county: "", postcode: "",
  nationality: "", gender: "", religion: "", ethnicity: "", sexualOrientation: "",
  idPhoto: null,
  permittedToWork: "", canProvideEvidence: "", rightToWorkProof: "",
  visaType: "", permitDocNumber: "", passportNo: "", visaExpiryDate: "",
  passportCopy: null, proofOfAddress: null,
  hasFullLicence: "", drivingLicenceNo: "", hasCarForWork: "", drivingBan: "",
  vehicleDocsUpToDate: "", travelToWork: "",
  nokTitle: "", nokFirstName: "", nokLastName: "", nokRelationship: "",
  nokHomePhone: "", nokMobile: "", nokEmail: "",
  nokStreet: "", nokCity: "", nokCounty: "", nokPostcode: "",
  availability: [],
  cvFile: null,
  ref1Relationship: "", ref1FirstName: "", ref1LastName: "",
  ref1Email: "", ref1EmailConfirm: "", ref1Phone: "",
  ref1Street: "", ref1City: "", ref1County: "", ref1Postcode: "",
  ref2Relationship: "", ref2FirstName: "", ref2LastName: "",
  ref2Email: "", ref2EmailConfirm: "", ref2Phone: "",
  ref2Street: "", ref2City: "", ref2County: "", ref2Postcode: "",
  completedMandatoryTraining: "", mandatoryTraining: [], trainingCert: null,
  mandatoryTrainingDates: "", completedOtherTraining: "", otherTraining: [],
  otherTrainingDates: "",
  hasDbs: "", dbsClear: "", dbsIssueDate: "", dbsDisclosureNumber: "",
  longTermIllness: "", sickLeaveBackNeck: "", backNeckInjury: "",
  contactContagious: "", communicableDisease: "", activemedicalAttention: "",
  healthDetails: "", registeredDisabled: "", illnessDaysAbsent: "", absenceReasons: "",
  illnessAffectsWork: "", illnessCausedByWork: "", awaitingTreatment: "",
  needsAdjustments: "", medicalAdditional: "",
  livedInUK5Years: "", countriesLived: "", bcgVaccination: "", bcgDate: "",
  persistentCough: "", unexplainedWeightLoss: "", unexplainedFever: "", hadTB: "",
  tbAdditional: "",
  hadChickenPox: "", chickenPoxDate: "",
  tripleVaccination: "", polio: "", tetanus: "", hepatitisB: "", hepatitisBDetails: "",
  exposureProneProcedures: "",
  criminalConviction: "", cautionedOrWarned: "", criminalDetails: "",
  dbsDeclarationConfirm: false, healthDeclarationConfirm: false,
  rightToWorkDocument: "", workingTimeDirective: "",
  declarationDate: new Date().toISOString().split("T")[0],
  declarationFullName: "", privacyConsent: false,
};

// ─── Style helpers ────────────────────────────────────────────────────────────

const C = {
  navy: "#062e4f",
  blue: "#0984e3",
  blueMid: "#0a5a8c",
  bgPage: "#f4f8fc",
  bgCard: "#fff",
  bgField: "#f7fbff",
  border: "#dde9f5",
  borderFocus: "#0984e3",
  text: "#1a2a3a",
  textMuted: "#6b7f99",
  textLabel: "#4a607a",
  section: "#e8f2fc",
  green: "#22bb6e",
  red: "#e55353",
  amber: "#f59e0b",
};

const fieldStyle = (focused: boolean, err?: boolean): React.CSSProperties => ({
  width: "100%", boxSizing: "border-box",
  padding: "11px 14px", border: `1.5px solid ${err ? C.red : focused ? C.borderFocus : C.border}`,
  borderRadius: 8, background: C.bgField, color: C.text,
  fontFamily: "'Lato', sans-serif", fontSize: "0.875rem", outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxShadow: focused ? `0 0 0 3px rgba(9,132,227,0.12)` : "none",
});
const selectStyle = (focused: boolean): React.CSSProperties => ({
  ...fieldStyle(focused),
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7f99' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36,
});
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.7rem", fontWeight: 700,
  color: C.textLabel, letterSpacing: "0.08em", textTransform: "uppercase" as const,
  marginBottom: 5, fontFamily: "'Lato', sans-serif",
};
const sectionHeadStyle: React.CSSProperties = {
  fontFamily: "'Georgia', serif", color: C.navy, fontSize: "1rem",
  fontWeight: 700, borderBottom: `2px solid ${C.section}`,
  paddingBottom: 8, marginBottom: 20, marginTop: 28,
};
const gridStyle = (cols = 2): React.CSSProperties => ({
  display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "14px 16px",
});
const radioRow: React.CSSProperties = {
  display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" as const,
};

// ─── Reusable components ──────────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.red }}> *</span>}</label>
      {children}
    </div>
  );
}

function TextInput({ name, value, onChange, placeholder, type = "text", required }: {
  name: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  const [f, setF] = useState(false);
  return (
    <input type={type} value={value} placeholder={placeholder}
      required={required}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={fieldStyle(f)} />
  );
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; placeholder?: string;
}) {
  const [f, setF] = useState(false);
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={selectStyle(f)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function RadioGroup({ name, value, onChange, options }: {
  name: string; value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={radioRow}>
      {options.map(o => (
        <label key={o.value} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: C.text }}>
          <input type="radio" name={name} value={o.value} checked={value === o.value}
            onChange={() => onChange(o.value)}
            style={{ accentColor: C.blue, width: 16, height: 16, cursor: "pointer" }} />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function CheckGroup({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => {
    onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "8px 12px" }}>
      {options.map(o => (
        <label key={o} style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "0.85rem", color: C.text, lineHeight: 1.4 }}>
          <input type="checkbox" checked={selected.includes(o)} onChange={() => toggle(o)}
            style={{ accentColor: C.blue, width: 15, height: 15, marginTop: 2, cursor: "pointer", flexShrink: 0 }} />
          {o}
        </label>
      ))}
    </div>
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  const [f, setF] = useState(false);
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ ...fieldStyle(f), resize: "vertical" as const }} />
  );
}

function FileInput({ label, onChange }: { label: string; onChange: (f: File | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input ref={ref} type="file" style={{ display: "none" }}
        onChange={e => { const f = e.target.files?.[0] || null; setName(f?.name || ""); onChange(f); }} />
      <button type="button" onClick={() => ref.current?.click()}
        style={{ padding: "9px 18px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: C.bgField, color: C.textMuted, fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", cursor: "pointer" }}>
        Choose File
      </button>
      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: name ? C.text : C.textMuted }}>
        {name || "No file chosen"}
      </span>
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return <h3 style={sectionHeadStyle}>{children}</h3>;
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#f0f6ff", border: `1px solid #c8ddf5`, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
      <p style={{ margin: 0, fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: "#3a567a", lineHeight: 1.7 }}>{children}</p>
    </div>
  );
}

const YN = [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }];

// ─── Step Progress Bar ────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: "Your Personal Details" },
  { n: 2, label: "Employment & Education" },
  { n: 3, label: "Skills & Training" },
  { n: 4, label: "Declaration & Terms" },
];

function StepBar({ current }: { current: Step }) {
  return (
    <div style={{ display: "flex", marginBottom: 36, position: "relative" }}>
      {/* connector line */}
      <div style={{ position: "absolute", top: 17, left: "6%", right: "6%", height: 2, background: C.border, zIndex: 0 }} />
      <div style={{ position: "absolute", top: 17, left: "6%", width: `${Math.max(0, (current - 1) / 3 * 88)}%`, height: 2, background: C.blue, zIndex: 0, transition: "width 0.4s ease" }} />
      {STEPS.map(s => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: done ? C.blue : active ? C.navy : C.bgPage, border: `2px solid ${done || active ? C.blue : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: active ? `0 0 0 4px rgba(9,132,227,0.15)` : "none", transition: "all 0.3s" }}>
              {done
                ? <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M2 7L5.5 10.5L12 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                : <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: active ? "#fff" : C.textMuted }}>{s.n}</span>}
            </div>
            <span style={{ marginTop: 7, fontFamily: "'Lato', sans-serif", fontSize: "0.68rem", fontWeight: active ? 700 : 400, color: active ? C.navy : done ? C.blue : C.textMuted, textAlign: "center", lineHeight: 1.3 }}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── STEP 1: Personal Details ─────────────────────────────────────────────────

function Step1({ f, set }: { f: FormData; set: (v: Partial<FormData>) => void }) {
  const titleOpts = ["Mr.", "Mrs.", "Miss", "Ms.", "Dr.", "Prof.", "Rev."].map(v => ({ value: v, label: v }));
  const bandOpts = ["Band 1","Band 2","Band 3","Band 4","Band 5","Band 6","Band 7","Band 8A","Band 8B","Band 8C","Band 8D","Band 9"].map(v => ({ value: v, label: v }));
  const availOpts = ["Mornings","Evenings","Afternoons","Occasional Weeks","Full Time","Part Time","Nights","Weekends","Anytime"];
  const rtw = ["British Birth Certificate","British Passport","Settled Status/Leave to Remain","Visa / Work Permit","Other"];

  return (
    <div>
      {/* Role */}
      <SectionHead>Post Applying For</SectionHead>
      <div style={gridStyle(1)}>
        <Field label="Role" required>
          <Select value={f.role} onChange={v => set({ role: v })} placeholder="Select Job Role"
            options={["Care Assistant","RMN","RGN","Other"].map(v => ({ value: v, label: v }))} />
        </Field>
      </div>

      {/* Personal Details 1 */}
      <SectionHead>Personal Details</SectionHead>
      <div style={gridStyle(4)}>
        <Field label="Title">
          <Select value={f.title} onChange={v => set({ title: v })} placeholder="Select" options={titleOpts} />
        </Field>
        <Field label="First Name" required>
          <TextInput name="firstName" value={f.firstName} onChange={v => set({ firstName: v })} placeholder="First" />
        </Field>
        <Field label="Middle Name">
          <TextInput name="middleName" value={f.middleName} onChange={v => set({ middleName: v })} />
        </Field>
        <Field label="Last Name" required>
          <TextInput name="lastName" value={f.lastName} onChange={v => set({ lastName: v })} placeholder="Last" />
        </Field>
      </div>
      <div style={{ ...gridStyle(3), marginTop: 14 }}>
        <Field label="Home Phone">
          <TextInput name="homePhone" value={f.homePhone} onChange={v => set({ homePhone: v })} type="tel" />
        </Field>
        <Field label="Mobile No" required>
          <TextInput name="mobileNo" value={f.mobileNo} onChange={v => set({ mobileNo: v })} type="tel" />
        </Field>
        <Field label="Email" required>
          <TextInput name="email" value={f.email} onChange={v => set({ email: v })} type="email" />
        </Field>
        <Field label="Date of Birth" required>
          <TextInput name="dob" value={f.dob} onChange={v => set({ dob: v })} type="date" />
        </Field>
        <Field label="National Insurance No" required>
          <TextInput name="niNumber" value={f.niNumber} onChange={v => set({ niNumber: v })} placeholder="AB 12 34 56 C" />
        </Field>
        <Field label="NMC Pin No" required>
          <TextInput name="nmcPin" value={f.nmcPin} onChange={v => set({ nmcPin: v })} />
        </Field>
        <Field label="RCN Number" required>
          <TextInput name="rcnNumber" value={f.rcnNumber} onChange={v => set({ rcnNumber: v })} />
        </Field>
        <Field label="HPC Number" required>
          <TextInput name="hpcNumber" value={f.hpcNumber} onChange={v => set({ hpcNumber: v })} />
        </Field>
        <Field label="Band" required>
          <Select value={f.band} onChange={v => set({ band: v })} placeholder="Please select" options={bandOpts} />
        </Field>
      </div>

      {/* Address */}
      <SectionHead>Address</SectionHead>
      <div style={gridStyle(1)}>
        <Field label="Street Address" required>
          <TextInput name="streetAddress" value={f.streetAddress} onChange={v => set({ streetAddress: v })} />
        </Field>
      </div>
      <div style={{ ...gridStyle(3), marginTop: 14 }}>
        <Field label="City" required>
          <TextInput name="city" value={f.city} onChange={v => set({ city: v })} />
        </Field>
        <Field label="County / Region" required>
          <TextInput name="county" value={f.county} onChange={v => set({ county: v })} />
        </Field>
        <Field label="Postcode" required>
          <TextInput name="postcode" value={f.postcode} onChange={v => set({ postcode: v })} />
        </Field>
      </div>

      {/* Personal Details 2 */}
      <SectionHead>Personal Details 2</SectionHead>
      <div style={gridStyle(2)}>
        <Field label="Nationality" required>
          <Select value={f.nationality} onChange={v => set({ nationality: v })} placeholder="Please select"
            options={["British","EU Citizen","Other"].map(v => ({ value: v, label: v }))} />
        </Field>
        <Field label="Gender">
          <Select value={f.gender} onChange={v => set({ gender: v })} placeholder="Please select"
            options={["Female","Male","Other","Prefer not to say"].map(v => ({ value: v, label: v }))} />
        </Field>
        <Field label="Religion">
          <Select value={f.religion} onChange={v => set({ religion: v })} placeholder="Please select"
            options={["Buddhist","Christian","Jewish","Hindu","Muslim","Sikh","Other","None"].map(v => ({ value: v, label: v }))} />
        </Field>
        <Field label="Race / Ethnicity">
          <Select value={f.ethnicity} onChange={v => set({ ethnicity: v })} placeholder="Please select"
            options={["White British","White (other)","White Irish","Mixed race","Indian","Pakistani","Bangladeshi","Other Asian (non-Chinese)","Black Caribbean","Black African","Black (others)","Chinese","Other"].map(v => ({ value: v, label: v }))} />
        </Field>
        <Field label="Sexual Orientation" required>
          <Select value={f.sexualOrientation} onChange={v => set({ sexualOrientation: v })} placeholder="Please select"
            options={["Straight/Heterosexual","Bisexual","Gay Man","Gay Woman/Lesbian","Prefer not to answer","Other"].map(v => ({ value: v, label: v }))} />
        </Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Upload ID Photo">
          <FileInput label="id-photo" onChange={v => set({ idPhoto: v })} />
          <p style={{ margin: "5px 0 0", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.textMuted }}>This photo will be used for your ID badge and profile. Please ensure your face is clearly visible.</p>
        </Field>
      </div>

      {/* Employment Eligibility */}
      <SectionHead>Employment Eligibility</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Are you permitted to work in the UK?" required>
          <RadioGroup name="permittedToWork" value={f.permittedToWork} onChange={v => set({ permittedToWork: v })} options={YN} />
        </Field>
        {f.permittedToWork === "Yes" && (
          <Field label="Can you provide evidence to prove eligibility?" required>
            <RadioGroup name="canProvideEvidence" value={f.canProvideEvidence} onChange={v => set({ canProvideEvidence: v })} options={YN} />
          </Field>
        )}
        {(f.nationality === "EU Citizen" || f.nationality === "Other") && (
          <Field label="What proof of Right to Work in the UK do you hold?" required>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rtw.map(o => (
                <label key={o} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: C.text }}>
                  <input type="radio" name="rightToWorkProof" value={o} checked={f.rightToWorkProof === o} onChange={() => set({ rightToWorkProof: o })} style={{ accentColor: C.blue }} />
                  {o}
                </label>
              ))}
            </div>
          </Field>
        )}
        <div style={gridStyle(2)}>
          <Field label="Passport No" required>
            <TextInput name="passportNo" value={f.passportNo} onChange={v => set({ passportNo: v })} />
          </Field>
          <Field label="Visa/Permit Expiry Date" required>
            <TextInput name="visaExpiryDate" value={f.visaExpiryDate} onChange={v => set({ visaExpiryDate: v })} type="date" />
          </Field>
          {f.rightToWorkProof === "Other" && (
            <Field label="Please state what visa/permit you hold">
              <TextInput name="visaType" value={f.visaType} onChange={v => set({ visaType: v })} />
            </Field>
          )}
          {f.canProvideEvidence === "Yes" && (
            <Field label="Permit/Document No">
              <TextInput name="permitDocNumber" value={f.permitDocNumber} onChange={v => set({ permitDocNumber: v })} />
            </Field>
          )}
        </div>
        <Field label="Upload a copy of your passport/permit">
          <FileInput label="passport-copy" onChange={v => set({ passportCopy: v })} />
        </Field>
        <Field label="Upload proof of address (Bank Statement, Utility Bill, Driving Licence, etc.)">
          <FileInput label="proof-address" onChange={v => set({ proofOfAddress: v })} />
        </Field>
        <InfoBox>Please note: you must provide copies of all IELTS certificates held by you.</InfoBox>
      </div>

      {/* Driving Details */}
      <SectionHead>Driving Details</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Do you have a full Driving Licence valid in the UK?" required>
          <RadioGroup name="hasFullLicence" value={f.hasFullLicence} onChange={v => set({ hasFullLicence: v })} options={YN} />
        </Field>
        {f.hasFullLicence === "Yes" && (
          <>
            <Field label="Driving Licence No" required>
              <TextInput name="drivingLicenceNo" value={f.drivingLicenceNo} onChange={v => set({ drivingLicenceNo: v })} />
            </Field>
            <Field label="Do you have access to a car for work?" required>
              <RadioGroup name="hasCarForWork" value={f.hasCarForWork} onChange={v => set({ hasCarForWork: v })} options={YN} />
            </Field>
            <Field label="Have you been banned from driving or have current endorsements?" required>
              <RadioGroup name="drivingBan" value={f.drivingBan} onChange={v => set({ drivingBan: v })} options={YN} />
            </Field>
            {f.hasCarForWork === "Yes" && (
              <Field label="Are all your vehicle documents up to date and valid?" required>
                <RadioGroup name="vehicleDocsUpToDate" value={f.vehicleDocsUpToDate} onChange={v => set({ vehicleDocsUpToDate: v })} options={YN} />
              </Field>
            )}
          </>
        )}
        <Field label="How would you travel to work if assigned?" required>
          <Select value={f.travelToWork} onChange={v => set({ travelToWork: v })} placeholder="Please select"
            options={["Drive","Public Transport","Will get a lift","Bicycle","Other"].map(v => ({ value: v, label: v }))} />
        </Field>
      </div>

      {/* Next of Kin */}
      <SectionHead>Next of Kin Details</SectionHead>
      <div style={gridStyle(3)}>
        <Field label="Prefix">
          <Select value={f.nokTitle} onChange={v => set({ nokTitle: v })} placeholder=""
            options={["Mr.","Mrs.","Miss","Ms.","Dr.","Prof.","Rev."].map(v => ({ value: v, label: v }))} />
        </Field>
        <Field label="First Name" required>
          <TextInput name="nokFirstName" value={f.nokFirstName} onChange={v => set({ nokFirstName: v })} />
        </Field>
        <Field label="Last Name" required>
          <TextInput name="nokLastName" value={f.nokLastName} onChange={v => set({ nokLastName: v })} />
        </Field>
        <Field label="Relationship to you" required>
          <TextInput name="nokRelationship" value={f.nokRelationship} onChange={v => set({ nokRelationship: v })} />
        </Field>
        <Field label="Home / Work Phone">
          <TextInput name="nokHomePhone" value={f.nokHomePhone} onChange={v => set({ nokHomePhone: v })} type="tel" />
        </Field>
        <Field label="Mobile No" required>
          <TextInput name="nokMobile" value={f.nokMobile} onChange={v => set({ nokMobile: v })} type="tel" />
        </Field>
        <Field label="Email">
          <TextInput name="nokEmail" value={f.nokEmail} onChange={v => set({ nokEmail: v })} type="email" />
        </Field>
      </div>
      <div style={{ marginTop: 14 }}>
        <Field label="Street Address" required>
          <TextInput name="nokStreet" value={f.nokStreet} onChange={v => set({ nokStreet: v })} />
        </Field>
      </div>
      <div style={{ ...gridStyle(3), marginTop: 14 }}>
        <Field label="City" required>
          <TextInput name="nokCity" value={f.nokCity} onChange={v => set({ nokCity: v })} />
        </Field>
        <Field label="County / Region" required>
          <TextInput name="nokCounty" value={f.nokCounty} onChange={v => set({ nokCounty: v })} />
        </Field>
        <Field label="Postcode" required>
          <TextInput name="nokPostcode" value={f.nokPostcode} onChange={v => set({ nokPostcode: v })} />
        </Field>
      </div>

      {/* Work Preference */}
      <SectionHead>Your Work Preference</SectionHead>
      <Field label="When are you able to work?" required>
        <CheckGroup options={availOpts} selected={f.availability} onChange={v => set({ availability: v })} />
      </Field>
    </div>
  );
}

// ─── STEP 2: Employment & Education ───────────────────────────────────────────

function Step2({ f, set }: { f: FormData; set: (v: Partial<FormData>) => void }) {
  const RefBlock = ({ n, prefix }: { n: 1 | 2; prefix: "ref1" | "ref2" }) => (
    <div style={{ background: "#f7fafd", border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 18px" }}>
      <h4 style={{ margin: "0 0 16px", fontFamily: "'Georgia', serif", color: C.navy, fontSize: "0.95rem" }}>Reference {n}</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Relationship" required>
          <TextInput name={`${prefix}Relationship`} value={(f as any)[`${prefix}Relationship`]} onChange={v => set({ [`${prefix}Relationship`]: v })} />
        </Field>
        <div style={gridStyle(2)}>
          <Field label="First Name" required>
            <TextInput name={`${prefix}FirstName`} value={(f as any)[`${prefix}FirstName`]} onChange={v => set({ [`${prefix}FirstName`]: v })} />
          </Field>
          <Field label="Last Name" required>
            <TextInput name={`${prefix}LastName`} value={(f as any)[`${prefix}LastName`]} onChange={v => set({ [`${prefix}LastName`]: v })} />
          </Field>
          <Field label="Email" required>
            <TextInput name={`${prefix}Email`} value={(f as any)[`${prefix}Email`]} onChange={v => set({ [`${prefix}Email`]: v })} type="email" />
          </Field>
          <Field label="Confirm Email" required>
            <TextInput name={`${prefix}EmailConfirm`} value={(f as any)[`${prefix}EmailConfirm`]} onChange={v => set({ [`${prefix}EmailConfirm`]: v })} type="email" />
          </Field>
          <Field label="Phone" required>
            <TextInput name={`${prefix}Phone`} value={(f as any)[`${prefix}Phone`]} onChange={v => set({ [`${prefix}Phone`]: v })} type="tel" />
          </Field>
        </div>
        <Field label="Street Address" required>
          <TextInput name={`${prefix}Street`} value={(f as any)[`${prefix}Street`]} onChange={v => set({ [`${prefix}Street`]: v })} />
        </Field>
        <div style={gridStyle(3)}>
          <Field label="City" required>
            <TextInput name={`${prefix}City`} value={(f as any)[`${prefix}City`]} onChange={v => set({ [`${prefix}City`]: v })} />
          </Field>
          <Field label="County / Region" required>
            <TextInput name={`${prefix}County`} value={(f as any)[`${prefix}County`]} onChange={v => set({ [`${prefix}County`]: v })} />
          </Field>
          <Field label="Postcode" required>
            <TextInput name={`${prefix}Postcode`} value={(f as any)[`${prefix}Postcode`]} onChange={v => set({ [`${prefix}Postcode`]: v })} />
          </Field>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <SectionHead>Education & Employment History</SectionHead>
      <InfoBox>
        Please complete this section even if you have a CV. The NHS states that "Employment history should be recorded on an Application Form which is signed." Ensure no gaps are left unaccounted for, covering full work history including education. Dates should be in mm/yy format with no gaps.
      </InfoBox>
      <Field label="Upload CV" required>
        <FileInput label="cv" onChange={v => set({ cvFile: v })} />
        <p style={{ margin: "5px 0 0", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.textMuted }}>Accepted: PDF, DOC, DOCX, JPG, PNG. Max 128MB.</p>
      </Field>

      <SectionHead>References</SectionHead>
      <InfoBox>
        Please supply two professional referees. One must be from your present or most recent employer, must be a senior grade to yourself, and you must have worked for that person for not less than three months. By entering their details, you give permission to contact them.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <RefBlock n={1} prefix="ref1" />
        <RefBlock n={2} prefix="ref2" />
      </div>
    </div>
  );
}

// ─── STEP 3: Skills & Training ────────────────────────────────────────────────

function Step3({ f, set }: { f: FormData; set: (v: Partial<FormData>) => void }) {
  const mandatoryOpts = ["Moving & Handling","Basic life support","Health and Safety","Fire Safety","First Aid","Infection Control","Food Safety & Nutrition","Medication Administration","Safeguarding Vulnerable Adults & Children"];
  const otherOpts = ["Diploma in Health & Social Care L3","Diploma in Health & Social Care L2","Personal Safety (Mental Health & Learning Disability)","Intermediate Life Support","Advanced Life Support","Complaints Handling","Handling Violence and Aggression","DoLs & Mental Capacity","COSHH","Data Protection","Equality & Inclusion","Lone Worker Training","Resuscitation of the Newborn (Midwifery)","Interpretation of Cardiotocograph Traces (Midwifery)"];

  return (
    <div>
      <SectionHead>Skills, Experience & Training</SectionHead>
      <Field label="Have you completed mandatory training within the last year?" required>
        <RadioGroup name="completedMandatoryTraining" value={f.completedMandatoryTraining} onChange={v => set({ completedMandatoryTraining: v })} options={YN} />
      </Field>

      {f.completedMandatoryTraining === "Yes" && (
        <>
          <div style={{ marginTop: 20 }}>
            <SectionHead>Mandatory Training</SectionHead>
            <Field label="Please tick if you have completed the following in the last 12 months" required>
              <CheckGroup options={mandatoryOpts} selected={f.mandatoryTraining} onChange={v => set({ mandatoryTraining: v })} />
              <p style={{ margin: "8px 0 0", fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: C.textMuted }}>Please enclose copies of your training certificates.</p>
            </Field>
          </div>
          <div style={{ marginTop: 14 }}>
            <Field label="Training Certificates">
              <FileInput label="training-cert" onChange={v => set({ trainingCert: v })} />
            </Field>
          </div>
          <div style={{ marginTop: 14 }}>
            <Field label="Training Dates">
              <Textarea value={f.mandatoryTrainingDates} onChange={v => set({ mandatoryTrainingDates: v })} placeholder="Please add dates of training." rows={4} />
            </Field>
          </div>
        </>
      )}

      <div style={{ marginTop: 24 }}>
        <Field label="Have you completed other health care training?" required>
          <RadioGroup name="completedOtherTraining" value={f.completedOtherTraining} onChange={v => set({ completedOtherTraining: v })} options={YN} />
        </Field>
      </div>

      {f.completedOtherTraining === "Yes" && (
        <>
          <div style={{ marginTop: 20 }}>
            <SectionHead>Other Training / Courses & Qualifications</SectionHead>
            <Field label="Please check which training you have completed (certificates must be provided)">
              <CheckGroup options={otherOpts} selected={f.otherTraining} onChange={v => set({ otherTraining: v })} />
            </Field>
          </div>
          <div style={{ marginTop: 14 }}>
            <Field label="Training Dates">
              <Textarea value={f.otherTrainingDates} onChange={v => set({ otherTrainingDates: v })} placeholder="Please add dates of training." rows={4} />
            </Field>
          </div>
        </>
      )}

      <SectionHead>Your DBS Status</SectionHead>
      <InfoBox>
        Please send a copy of your most recent DBS Disclosure (formerly known as CRB). All applicants who cannot provide a registered DBS or full immunisation record will be required to complete these at their own cost.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Do you have a current DBS (Disclosure Barring Service)?" required>
          <RadioGroup name="hasDbs" value={f.hasDbs} onChange={v => set({ hasDbs: v })} options={YN} />
        </Field>
        {f.hasDbs === "Yes" && (
          <>
            <Field label="Clear?" required>
              <RadioGroup name="dbsClear" value={f.dbsClear} onChange={v => set({ dbsClear: v })} options={YN} />
            </Field>
            <div style={gridStyle(2)}>
              <Field label="Date of Issue" required>
                <TextInput name="dbsIssueDate" value={f.dbsIssueDate} onChange={v => set({ dbsIssueDate: v })} type="date" />
              </Field>
              <Field label="Disclosure Number">
                <TextInput name="dbsDisclosureNumber" value={f.dbsDisclosureNumber} onChange={v => set({ dbsDisclosureNumber: v })} />
              </Field>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── STEP 4: Declaration & Terms ──────────────────────────────────────────────

function Step4({ f, set }: { f: FormData; set: (v: Partial<FormData>) => void }) {
  return (
    <div>
      {/* Health Declaration */}
      <SectionHead>Health Declaration</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { key: "longTermIllness", q: "Do you or have you ever suffered from long term illness?" },
          { key: "sickLeaveBackNeck", q: "Have you ever required sick leave for a back or neck injury?" },
          { key: "backNeckInjury", q: "Do you suffer from any back or neck injuries?" },
          { key: "contactContagious", q: "Have you been in contact with anyone suffering from a contagious illness within the last six weeks?" },
          { key: "communicableDisease", q: "Do you suffer with a communicable disease?" },
          { key: "activemedicalAttention", q: "Are you currently receiving active medical attention?" },
        ].map(({ key, q }) => (
          <Field key={key} label={q} required>
            <RadioGroup name={key} value={(f as any)[key]} onChange={v => set({ [key]: v })} options={YN} />
          </Field>
        ))}
        <Field label="If you have answered 'Yes' to any of the above, please give details:">
          <Textarea value={f.healthDetails} onChange={v => set({ healthDetails: v })} rows={4} />
        </Field>
        <Field label="Are you registered disabled?" required>
          <RadioGroup name="registeredDisabled" value={f.registeredDisabled} onChange={v => set({ registeredDisabled: v })} options={YN} />
        </Field>
        <Field label="How many days have you been absent from work due to illness in the last 12 months?">
          <TextInput name="illnessDaysAbsent" value={f.illnessDaysAbsent} onChange={v => set({ illnessDaysAbsent: v })} type="number" />
        </Field>
        <Field label="State reason(s) for absence:">
          <Textarea value={f.absenceReasons} onChange={v => set({ absenceReasons: v })} rows={3} />
        </Field>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px", background: "#f0f6ff", borderRadius: 10, border: `1px solid #c8ddf5`, cursor: "pointer" }}
          onClick={() => set({ healthDeclarationConfirm: !f.healthDeclarationConfirm })}>
          <input type="checkbox" checked={f.healthDeclarationConfirm} onChange={() => set({ healthDeclarationConfirm: !f.healthDeclarationConfirm })}
            style={{ accentColor: C.blue, width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
          <p style={{ margin: 0, fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: "#3a567a", lineHeight: 1.65 }}>
            I declare that the answers to the above questions are true and complete to the best of my knowledge and belief. I also give consent for our appointed Occupational Health Services provider to make recommendations to my employer.
          </p>
        </div>
      </div>

      {/* Medical History */}
      <SectionHead>Medical History</SectionHead>
      <p style={{ margin: "0 0 14px", fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: C.textMuted }}>All staff groups complete this section.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { key: "illnessAffectsWork", q: "Do you have any illness/impairment/disability (physical or psychological) which may affect your work?" },
          { key: "illnessCausedByWork", q: "Have you ever had any illness/impairment/disability which may have been caused or made worse by your work?" },
          { key: "awaitingTreatment", q: "Are you having, or waiting for treatment (including medication) or investigations at present?" },
          { key: "needsAdjustments", q: "Do you think you may need any adjustments or assistance to help you do the job?" },
        ].map(({ key, q }) => (
          <Field key={key} label={q}>
            <RadioGroup name={key} value={(f as any)[key]} onChange={v => set({ [key]: v })} options={YN} />
          </Field>
        ))}
        <Field label="Additional Information (if you answered Yes to any above):">
          <Textarea value={f.medicalAdditional} onChange={v => set({ medicalAdditional: v })} rows={4} />
        </Field>
      </div>

      {/* Tuberculosis */}
      <SectionHead>Tuberculosis</SectionHead>
      <InfoBox>Clinical diagnosis and management of tuberculosis, and measures for its prevention and control (NICE 2006).</InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Have you lived continuously in the UK for the last 5 years?">
          <RadioGroup name="livedInUK5Years" value={f.livedInUK5Years} onChange={v => set({ livedInUK5Years: v })} options={YN} />
        </Field>
        {f.livedInUK5Years === "No" && (
          <Field label="Please list all countries you have lived in over the last 5 years" required>
            <Textarea value={f.countriesLived} onChange={v => set({ countriesLived: v })} rows={3} />
          </Field>
        )}
        <Field label="Have you had a BCG vaccination in relation to Tuberculosis?">
          <RadioGroup name="bcgVaccination" value={f.bcgVaccination} onChange={v => set({ bcgVaccination: v })} options={YN} />
        </Field>
        {f.bcgVaccination === "Yes" && (
          <Field label="Please state when" required>
            <TextInput name="bcgDate" value={f.bcgDate} onChange={v => set({ bcgDate: v })} type="date" />
          </Field>
        )}
        <p style={{ margin: "4px 0", fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: C.textMuted, fontWeight: 600 }}>Do you currently experience any of the following?</p>
        {[
          { key: "persistentCough", q: "A cough which has lasted for more than 3 weeks" },
          { key: "unexplainedWeightLoss", q: "Unexplained weight loss" },
          { key: "unexplainedFever", q: "Unexplained fever" },
          { key: "hadTB", q: "Have you had tuberculosis (TB) or been in recent contact with open TB?" },
        ].map(({ key, q }) => (
          <Field key={key} label={q}>
            <RadioGroup name={key} value={(f as any)[key]} onChange={v => set({ [key]: v })} options={YN} />
          </Field>
        ))}
        {(f.persistentCough === "Yes" || f.unexplainedWeightLoss === "Yes" || f.unexplainedFever === "Yes" || f.hadTB === "Yes") && (
          <Field label="Additional Information (if you answered Yes to any above)" required>
            <Textarea value={f.tbAdditional} onChange={v => set({ tbAdditional: v })} rows={4} />
          </Field>
        )}
      </div>

      {/* Chicken Pox */}
      <SectionHead>Chicken Pox or Shingles</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Have you ever had chicken pox or shingles?">
          <RadioGroup name="hadChickenPox" value={f.hadChickenPox} onChange={v => set({ hadChickenPox: v })} options={YN} />
        </Field>
        {f.hadChickenPox === "Yes" && (
          <Field label="Please state when" required>
            <TextInput name="chickenPoxDate" value={f.chickenPoxDate} onChange={v => set({ chickenPoxDate: v })} type="date" />
          </Field>
        )}
      </div>

      {/* Immunisation */}
      <SectionHead>Immunisation History</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { key: "tripleVaccination", q: "Triple vaccination as a child (Diphtheria / Tetanus / Whooping cough)?" },
          { key: "polio", q: "Polio" },
          { key: "tetanus", q: "Tetanus" },
          { key: "hepatitisB", q: "Hepatitis B" },
        ].map(({ key, q }) => (
          <Field key={key} label={q}>
            <RadioGroup name={key} value={(f as any)[key]} onChange={v => set({ [key]: v })} options={YN} />
          </Field>
        ))}
        {f.hepatitisB === "Yes" && (
          <Field label="Provide details about your Hepatitis B immunisation, including dates" required>
            <Textarea value={f.hepatitisBDetails} onChange={v => set({ hepatitisBDetails: v })} rows={4} />
          </Field>
        )}
        <div style={{ background: "#f7fafd", border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
          <p style={{ margin: "0 0 8px", fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: C.text, fontWeight: 700 }}>Important: Required immunisation documents</p>
          {[
            ["Varicella", "Written statement confirming chicken pox/shingles, or serology test result showing varicella immunity."],
            ["Tuberculosis", "Occupational health/GP certificate of positive scar or record of positive skin test result."],
            ["Rubella, Measles & Mumps", "Certificate of two MMR vaccinations or proof of positive antibody."],
            ["Hepatitis B", "Copy of most recent pathology report showing titre levels of 100 lu/l or above."],
            ["Hepatitis B Surface Antigen", "Evidence of a negative Surface Antigen Test Report — identified validated sample (IVS)."],
            ["Hepatitis C", "Evidence of a negative antibody test Report — IVS."],
            ["HIV", "Evidence of a negative antibody test Report — IVS."],
          ].map(([title, desc]) => (
            <p key={title} style={{ margin: "6px 0", fontFamily: "'Lato', sans-serif", fontSize: "0.8rem", color: C.textMuted, lineHeight: 1.6 }}>
              <strong style={{ color: C.text }}>{title}:</strong> {desc}
            </p>
          ))}
        </div>
      </div>

      {/* Exposure Prone Procedures */}
      <SectionHead>Exposure Prone Procedures</SectionHead>
      <Field label="Will your role involve Exposure Prone Procedures?" required>
        <RadioGroup name="exposureProneProcedures" value={f.exposureProneProcedures} onChange={v => set({ exposureProneProcedures: v })} options={YN} />
      </Field>

      {/* DBS */}
      <SectionHead>Disclosure Barring Service (DBS)</SectionHead>
      <InfoBox>
        The DBS (formerly CRB) conducts checks on criminal records. We are a registered body for receipt of DBS disclosure information. NHS Trusts and private sector hospitals insist on DBS checks for all staff. It is a condition of proceeding with your application that you apply for a DBS disclosure check.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Have you been convicted of a criminal offence?" required>
          <RadioGroup name="criminalConviction" value={f.criminalConviction} onChange={v => set({ criminalConviction: v })} options={YN} />
        </Field>
        <Field label="Have you ever been cautioned or issued with a formal warning for a criminal offence?" required>
          <RadioGroup name="cautionedOrWarned" value={f.cautionedOrWarned} onChange={v => set({ cautionedOrWarned: v })} options={YN} />
        </Field>
        {(f.criminalConviction === "Yes" || f.cautionedOrWarned === "Yes") && (
          <Field label="If you answered 'Yes' to either above, please list details including dates:">
            <Textarea value={f.criminalDetails} onChange={v => set({ criminalDetails: v })} rows={4} />
          </Field>
        )}
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px", background: "#f0f6ff", borderRadius: 10, border: `1px solid #c8ddf5`, cursor: "pointer" }}
          onClick={() => set({ dbsDeclarationConfirm: !f.dbsDeclarationConfirm })}>
          <input type="checkbox" checked={f.dbsDeclarationConfirm} onChange={() => set({ dbsDeclarationConfirm: !f.dbsDeclarationConfirm })}
            style={{ accentColor: C.blue, width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
          <p style={{ margin: 0, fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: "#3a567a", lineHeight: 1.65 }}>
            I confirm the above is true and I understand that a DBS check will be sought in the event of a successful application.
          </p>
        </div>
      </div>

      {/* Right to Work */}
      <SectionHead>Right To Work</SectionHead>
      <InfoBox>It is a legal requirement that all candidates provide confirmation of their eligibility to work in the UK before any offer of work can be made.</InfoBox>
      <Field label="Please select your right to work document:">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "A passport describing the holder as a British Citizen or as having a right of abode / Settled Status / Indefinite Leave to Remain in the UK.",
            "A passport or identity card issued by an EU/EEA State describing the holder as a national of that state.",
            "A letter issued by the Home Office or the DfE indicating permission to take agency work, or a biometric residence permit.",
          ].map(o => (
            <label key={o} style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer", fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: C.text, lineHeight: 1.55 }}>
              <input type="radio" name="rightToWorkDocument" value={o} checked={f.rightToWorkDocument === o} onChange={() => set({ rightToWorkDocument: o })} style={{ accentColor: C.blue, marginTop: 3, flexShrink: 0 }} />
              {o}
            </label>
          ))}
        </div>
      </Field>

      {/* Working Time */}
      <SectionHead>Work Time Directive</SectionHead>
      <InfoBox>You cannot work more than 48 hours per week on average. Adults can choose to opt out of the 48-hour week.</InfoBox>
      <Field label="Working hours preference" required>
        <RadioGroup name="workingTimeDirective" value={f.workingTimeDirective} onChange={v => set({ workingTimeDirective: v })}
          options={[
            { value: "I DO NOT wish to work more than 48 hours per week", label: "I DO NOT wish to work more than 48 hours per week" },
            { value: "I DO wish to work more than 48 hours per week", label: "I DO wish to work more than 48 hours per week" },
          ]} />
      </Field>

      {/* Final Declaration */}
      <SectionHead>Registration Form Declaration</SectionHead>
      <InfoBox>
        I declare that all information given in this registration form is to the best of my knowledge complete and accurate in all respects and that I am eligible to work in the UK. I understand that any false or misleading information may result in my removal from the register of members.
      </InfoBox>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={gridStyle(2)}>
          <Field label="Today's Date" required>
            <TextInput name="declarationDate" value={f.declarationDate} onChange={v => set({ declarationDate: v })} type="date" />
          </Field>
          <Field label="Full Name" required>
            <TextInput name="declarationFullName" value={f.declarationFullName} onChange={v => set({ declarationFullName: v })} />
          </Field>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "14px 16px", background: "#f0f7ee", borderRadius: 10, border: `1px solid #b4dfc4`, cursor: "pointer" }}
          onClick={() => set({ privacyConsent: !f.privacyConsent })}>
          <input type="checkbox" checked={f.privacyConsent} onChange={() => set({ privacyConsent: !f.privacyConsent })}
            style={{ accentColor: C.green, width: 16, height: 16, marginTop: 2, flexShrink: 0 }} />
          <p style={{ margin: 0, fontFamily: "'Lato', sans-serif", fontSize: "0.83rem", color: "#2d5a3d", lineHeight: 1.65 }}>
            By using this form you agree with the storage and handling of your data by this website as defined in our <a href="/privacy-policy" style={{ color: C.blue }}>Privacy Policy</a>. <strong>*</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ApplicationPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setFormRaw] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const set = (v: Partial<FormData>) => setFormRaw(p => ({ ...p, ...v }));

  const next = () => {
    setStep(s => Math.min(4, s + 1) as Step);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const prev = () => {
    setStep(s => Math.max(1, s - 1) as Step);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const submit = () => {
    if (!form.privacyConsent) { alert("Please accept the Privacy Policy to submit."); return; }
    setSubmitted(true);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ── Submitted ──────────────────────────────────────────────────────────────
  if (submitted) return (
    <main style={{ minHeight: "80vh", background: C.bgPage, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#e6f9ee", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
            <path d="M6 18L14 26L30 10" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "'Georgia', serif", color: C.navy, fontSize: "clamp(1.6rem,3vw,2.2rem)", marginBottom: 16 }}>Application Submitted!</h1>
        <p style={{ color: C.textMuted, fontFamily: "'Lato', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 28 }}>
          Thank you, <strong style={{ color: C.text }}>{form.firstName}</strong>. Your full application has been received by the Reach Healthcare team. We will review your details and be in touch within 2–3 working days.
        </p>
        <a href="/" style={{ display: "inline-block", background: C.blue, color: "#fff", borderRadius: 50, padding: "14px 36px", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.92rem", boxShadow: "0 4px 18px rgba(9,132,227,0.3)" }}>
          Return to Home
        </a>
      </div>
    </main>
  );

  return (
    <main style={{ background: C.bgPage, fontFamily: "'Lato', sans-serif", overflowX: "hidden" }}>
      <Header />
      {/* Hero */}
      <section style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.blueMid} 55%, ${C.blue} 100%)`, padding: "80px 24px 52px", textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Lato', sans-serif" }}>
          Step 3 of 3 — Full Application
        </p>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
          Apply to Join Reach Healthcare
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", maxWidth: 440, margin: "0 auto" }}>
          Complete all four sections. Required fields are marked with an asterisk&nbsp;(*).
        </p>
      </section>

      {/* Form */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "44px 20px 80px" }}>
        <div ref={topRef} style={{ background: C.bgCard, borderRadius: 20, padding: "clamp(20px,5vw,40px)", boxShadow: "0 6px 40px rgba(9,100,200,0.09)", border: `1px solid #e0ebf7` }}>

          <StepBar current={step} />

          {/* Step body */}
          <div style={{ minHeight: 300 }}>
            {step === 1 && <Step1 f={form} set={set} />}
            {step === 2 && <Step2 f={form} set={set} />}
            {step === 3 && <Step3 f={form} set={set} />}
            {step === 4 && <Step4 f={form} set={set} />}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 36, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            {step > 1
              ? <button type="button" onClick={prev}
                  style={{ padding: "12px 28px", borderRadius: 50, border: `1.5px solid ${C.border}`, background: "#fff", color: C.textMuted, fontFamily: "'Lato', sans-serif", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" }}>
                  ← Previous
                </button>
              : <div />}

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: C.textMuted }}>Step {step} of 4</span>
              {step < 4
                ? <button type="button" onClick={next}
                    style={{ padding: "13px 32px", borderRadius: 50, border: "none", background: C.blue, color: "#fff", fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 16px rgba(9,132,227,0.28)", transition: "all 0.2s" }}>
                    Continue →
                  </button>
                : <button type="button" onClick={submit}
                    style={{ padding: "13px 32px", borderRadius: 50, border: "none", background: C.green, color: "#fff", fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 16px rgba(34,187,110,0.3)", transition: "all 0.2s" }}>
                    Submit Application ✓
                  </button>}
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
