export interface LeadSource {
  id: string;
  name: string;
}

export interface Interest {
  id: string;
  name: string;
}

export interface LeadCapturePayload {
  leadSourceId: string;
  interestId: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;

  referrer?: string;
  landingPage?: string;
}