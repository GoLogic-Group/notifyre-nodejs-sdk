import { Recipient } from '.';
export interface ListSentSmsRequest {
    fromDate: number | null;
    toDate: number | null;
    toNumber?: string;
    fromNumber?: string;
    statusType?: string;
    search?: string;
    sort?: string;
    limit?: number;
    skip?: number;
}
export interface ListSentSmsResponse {
    smsMessages: SentSms[];
    total: number;
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
    metadata?: object | null;
}
export interface SmsRecipient {
    completedDateUtc: number | null;
    cost: number;
    costPerPart: number;
    fromNumber: string;
    id: string;
    friendlyID: string;
    messageParts: number;
    queuedDateUtc: number | null;
    status: string;
    toNumber: string;
    statusMessage: string;
    deliveryStatus: string;
}
export interface SubmitSmsRequest {
    body: string;
    recipients: Recipient[];
    from: string;
    scheduledDate: number | null;
    addUnsubscribeLink?: boolean;
    callbackUrl?: string;
    metadata?: object;
    callbackFormat?: string;
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
export interface GetSmsResponse {
    id: string;
    friendlyID: string;
    accountID: string;
    createdBy: string;
    recipients: SmsRecipient[];
    metadata?: object;
    createdDateUtc: number | null;
    submittedDateUtc: number | null;
    completedDateUtc: number | null;
    lastModifiedDateUtc: number | null;
}
export interface GetSmsRecipientRequest {
    messageID: string;
    recipientID: string;
}
export interface GetSmsRecipientResponse {
    accountID: string;
    completedDateUtc: number | null;
    createdBy: string;
    createdDateUtc: number;
    friendlyID: string;
    id: string;
    lastModifiedDateUtc: number | null;
    recipient: SmsMessageRecipient;
    status: string;
    submittedDateUtc: number | null;
    totalCost: number;
    metadata?: object | null;
}
export interface SmsMessageRecipient extends SmsRecipient {
    message: string;
}
export interface ListSmsRepliesRequest {
    fromDate: number | null;
    toDate: number | null;
    toNumber?: string;
    fromNumber?: string;
    recipientID?: string;
    includeReplyContent?: boolean;
    sort: string;
    limit?: number;
    skip?: number;
}
export interface ListSmsRepliesResponse {
    smsReplies: SmsReply[];
    total: number;
}
export interface SmsReply {
    recipientID: string;
    friendlyID: string;
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
export interface SmsReplyDetails {
    replyID: string;
    externalReplyID: string;
    provider: string;
    receivedDateUtc: number;
    createdDateUtc: number | null;
}
export interface SmsReply {
    recipientID: string;
    friendlyID: string;
    recipientNumber: string;
    senderNumber: string;
    replyID: string;
    message: string;
    receivedDateUtc: number;
    contactDetails: SenderContactDetails | null;
}
export interface GetSmsReplyResponse extends SmsReply {
}
export interface SmsReplyV2 {
    recipientID: string;
    friendlyID: string;
    recipientNumber: string;
    senderNumber: string;
    replyID: string;
    message: string;
    subject: string;
    receivedDateUtc: number;
    contactDetails: SenderContactDetails | null;
}
export interface GetSmsReplyResponseV2 extends SmsReplyV2 {
}
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
export interface ListSmsPricesResponse {
    countryCode: string;
    countryName: string;
    prefix: string;
    price: number;
    currency: string;
}
