import { Recipient } from '.';

export interface ListSentSmsRequest {
  fromDate: Date;
  toDate: Date;
  sort: string;
  statusType?: string;
  limit?: number;
}

export interface ListSentSmsResponse {
  smsMessages: SentSms[];
}

export interface SentSms {
  accountID: string;
  completedDateUtc: number | null;
  createdBy: string;
  createdDateUtc: number;
  friendlyID: string;
  id: string;
  lastModifiedDateUtc: number | null;
  recipient: SmsRecipient;
  status: string;
  submittedDateUtc: number | null;
  totalCost: number;
}

export interface SmsRecipient {
  completedDateUtc: number | null;
  cost: number;
  costPerPart: number;
  fromNumber: string;
  id: string;
  messageParts: number;
  queuedDateUtc: number | null;
  status: string;
  toNumber: string;
}

export interface SubmitSmsRequest {
  body: string;
  recipients: Recipient[];
  from: string;
  scheduledDate: Date | null;
  optOutMessage: boolean | false;
  addUnsubscribeLink: boolean | false;
}

export interface SubmitSmsResponse {
  smsMessageID: string;
  friendlyID: string;
  invalidToNumbers: InvalidSmsToNumber[] | null;
}

export interface InvalidSmsToNumber {
  number: string;
  message: string;
}

export interface GetSmsRequest {
  messageID: string;
  recipientID: string;
}

export interface GetSmsResponse extends SentSms {}

export interface ListSmsRepliesRequest {
  fromDate: Date;
  toDate: Date;
  sort: string;
  limit?: number;
}

export interface ListSmsRepliesResponse {
  smsReplies: SmsReply[];
}

export interface SmsReply {
  recipientID: string;
  recipientNumber: string;
  senderNumber: string;
  replyID: string;
  message: string;
  receivedDateUtc: number;
  contactDetails: SenderContactDetails | null;
}

export interface SenderContactDetails {
  firstName: string;
  lastName: string;
  organization: string;
}

export interface GetSmsReplyResponse extends SmsReply {}

export interface ListSmsNumbersResponse {
  smsNumbers: SmsNumber[];
  smsSenderIds: SmsSenderID[];
}

export interface SmsNumber {
  id: string;
  countryCode: number;
  assignedNumber: number;
  e164: string;
  provider: string;
  subscriptionID: string;
  createdDateUtc: number | null;
  lastModifiedDateUtc: number | null;
  startDateUtc: number;
  status: string;
  finishDateUtc: number | null;
}

export interface SmsSenderID {
  id: string;
  name: string;
  status: string;
  createdDateUtc: number;
  lastModifiedDateUtc: number | null;
}
