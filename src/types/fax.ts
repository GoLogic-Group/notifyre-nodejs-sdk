import { Recipient } from '.';

export interface ListSentFaxesRequest {
  fromDate: Date;
  toDate: Date;
  sort: string;
  statusType?: string;
  limit?: number;
}

export interface ListSentFaxesResponse {
  faxes: SentFax[];
}

export interface SentFax {
  id: string;
  friendlyID: string;
  recipientID: string;
  fromNumber: string;
  to: string;
  reference: string;
  createdDateUtc: number;
  queuedDateUtc: number | null;
  lastModifiedDateUtc: number | null;
  highQuality: boolean;
  pages: number;
  status: string;
}

export interface SubmitFaxRequest {
  templateName: string;
  recipients: Recipient[];
  sendFrom: string;
  isHighQuality: boolean;
  clientReference: string;
  documents: FaxDocument[];
  header: string;
  subject: string;
  scheduledDate: Date | null;
}

export interface SubmitFaxResponse {
  faxID: string;
  friendlyID: string;
}

export interface UploadDocumentResponse {
  fileID: string;
  fileName: string;
}

export interface FaxDocument {
  base64Str: string;
  contentType: string;
}

export interface DownloadSentFaxRequest {
  id: string;
  fileType: string;
}

export interface DownloadSentFaxResponse {
  base64Str: string;
}

export interface ListCoverPagesResponse {
  name: string;
  html: string;
  isDefault: boolean;
}

export interface ListReceivedFaxesRequest {
  toNumber: string;
  limit?: number;
}

export interface ListReceivedFaxesResponse {
  id: string;
  from: string;
  to: string;
  timestamp: number;
  status: string;
  pages: number;
  duration: number;
  read: boolean;
}

export interface DownloadReceivedFaxResponse {
  tiffBase64: string;
}

export interface ListFaxNumbersResponse {
  numbers: FaxNumber[];
}

export interface FaxNumber {
  id: number;
  countryCode: number;
  region: string;
  assignedNumber: number;
  e164: string;
  status: string;
}
