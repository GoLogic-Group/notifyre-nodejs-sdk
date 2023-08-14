export interface DownloadMmsReplyResponse {
    documentList: MmsDocument[];
}
export interface MmsDocument {
    base64Str: string;
    type: string;
}
