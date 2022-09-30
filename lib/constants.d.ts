export declare enum ContentType {
    Bmp = "image/bmp",
    Gif = "image/gif",
    Jpeg = "image/jpeg",
    Jpg = "image/jpeg",
    Png = "image/png",
    Docx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    Dotx = "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    Doc = "application/msword",
    Xlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    Xltx = "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    Xls = "application/vnd.ms-excel",
    Pptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    Potx = "application/vnd.openxmlformats-officedocument.presentationml.template",
    Ppsx = "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    Ppt = "application/vnd.ms-powerpoint",
    Rtf = "application/rtf",
    Txt = "text/plain",
    Html = "text/html",
    Pdf = "application/pdf",
    Ps = "application/postscript",
    Tiff = "image/tiff",
    Tif = "image/tiff"
}
export declare enum RecipientType {
    FaxNumber = "fax_number",
    SmsNumber = "mobile_number",
    Contact = "contact",
    Group = "group"
}
export declare enum FileType {
    Pdf = "pdf",
    Tiff = "tiff"
}
export declare enum Sort {
    Ascending = "asc",
    Descending = "desc"
}
export declare enum ListSentFaxesRequestStatusTypes {
    Accepted = "accepted",
    Queued = "queued",
    InProgress = "in_progress",
    Successful = "successful",
    Failed = "failed"
}
export declare enum ListSmsRequestStatusTypes {
    Submitted = "submitted",
    Processing = "processing",
    Sent = "sent",
    Failed = "failed"
}
export declare enum EventType {
    FaxReceived = "fax_received",
    FaxSent = "fax_sent",
    SmsReceived = "sms_received",
    SmsSent = "sms_sent"
}
export declare enum DocumentStatus {
    Converting = "converting",
    Failed = "failed",
    Initialised = "initialised",
    Successful = "successful"
}
