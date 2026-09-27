export type LegalDocumentCategory = "fir" | "legal_notice" | "application";

export type LegalDocumentTemplate = {
  id: string;
  title: string;
  category: LegalDocumentCategory;
  description: string;
  fields: string[];
  body: string;
};

export const legalDocumentTemplates: LegalDocumentTemplate[] = [
  {
    id: "fir-mobile-theft",
    title: "Mobile Theft / Snatching FIR draft",
    category: "fir",
    description:
      "A first information report draft for reporting a stolen or snatched mobile phone, including incident details and device identifiers.",
    fields: [
      "complainant_name",
      "incident_date",
      "incident_location",
      "description",
      "phone_model",
      "imei",
    ],
    body: "I, {{complainant_name}}, hereby lodge a First Information Report regarding the theft of my mobile phone on {{incident_date}} at {{incident_location}}. The incident description is as follows: {{description}}. The device details are Model: {{phone_model}}, IMEI: {{imei}}."
  },
  {
    id: "legal-notice-general",
    title: "General Legal Notice",
    category: "legal_notice",
    description:
      "A general legal notice you can adapt to demand action, payment, or a response from another party.",
    fields: [
      "sender_name",
      "recipient_name",
      "incident_date",
      "incident_location",
      "description",
      "demand",
    ],
    body: "Dear {{recipient_name}},\n\nThis is a legal notice from {{sender_name}} dated {{incident_date}} concerning the incident at {{incident_location}}. {{description}}. Accordingly, we demand {{demand}}.\n\nSincerely,\n{{sender_name}}"
  },
  {
    id: "application-general",
    title: "General Application",
    category: "application",
    description:
      "A general application to a police station or other authority requesting action, a copy of a record, or official assistance.",
    fields: [
      "applicant_name",
      "authority_name",
      "incident_date",
      "incident_location",
      "description",
      "relief_sought",
    ],
    body: "To: {{authority_name}}\n\nSubject: Application dated {{incident_date}}\n\nI, {{applicant_name}}, hereby apply for the following relief: {{relief_sought}}. The incident occurred at {{incident_location}}. Details: {{description}}.\n\nThank you."
  },
];
