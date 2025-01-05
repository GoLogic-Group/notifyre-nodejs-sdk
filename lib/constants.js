"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentStatus = exports.EventType = exports.ListSmsRequestStatusTypes = exports.ListSentFaxesRequestStatusTypes = exports.Sort = exports.FileType = exports.RecipientType = exports.ContentType = void 0;
var ContentType;
(function (ContentType) {
    ContentType["Bmp"] = "image/bmp";
    ContentType["Gif"] = "image/gif";
    ContentType["Jpeg"] = "image/jpeg";
    ContentType["Jpg"] = "image/jpeg";
    ContentType["Png"] = "image/png";
    ContentType["Docx"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    ContentType["Dotx"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.template";
    ContentType["Doc"] = "application/msword";
    ContentType["Xlsx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    ContentType["Xltx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.template";
    ContentType["Xls"] = "application/vnd.ms-excel";
    ContentType["Pptx"] = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    ContentType["Potx"] = "application/vnd.openxmlformats-officedocument.presentationml.template";
    ContentType["Ppsx"] = "application/vnd.openxmlformats-officedocument.presentationml.slideshow";
    ContentType["Ppt"] = "application/vnd.ms-powerpoint";
    ContentType["Rtf"] = "application/rtf";
    ContentType["Txt"] = "text/plain";
    ContentType["Html"] = "text/html";
    ContentType["Pdf"] = "application/pdf";
    ContentType["Ps"] = "application/postscript";
    ContentType["Tiff"] = "image/tiff";
    ContentType["Tif"] = "image/tiff";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var RecipientType;
(function (RecipientType) {
    RecipientType["FaxNumber"] = "fax_number";
    RecipientType["SmsNumber"] = "mobile_number";
    RecipientType["Contact"] = "contact";
    RecipientType["Group"] = "group";
})(RecipientType = exports.RecipientType || (exports.RecipientType = {}));
var FileType;
(function (FileType) {
    FileType["Pdf"] = "pdf";
    FileType["Tiff"] = "tiff";
})(FileType = exports.FileType || (exports.FileType = {}));
var Sort;
(function (Sort) {
    Sort["Ascending"] = "asc";
    Sort["Descending"] = "desc";
})(Sort = exports.Sort || (exports.Sort = {}));
var ListSentFaxesRequestStatusTypes;
(function (ListSentFaxesRequestStatusTypes) {
    ListSentFaxesRequestStatusTypes["Accepted"] = "accepted";
    ListSentFaxesRequestStatusTypes["Successful"] = "successful";
    ListSentFaxesRequestStatusTypes["Failed"] = "failed";
    ListSentFaxesRequestStatusTypes["InProgress"] = "in_progress";
    ListSentFaxesRequestStatusTypes["Queued"] = "queued";
})(ListSentFaxesRequestStatusTypes = exports.ListSentFaxesRequestStatusTypes || (exports.ListSentFaxesRequestStatusTypes = {}));
var ListSmsRequestStatusTypes;
(function (ListSmsRequestStatusTypes) {
    ListSmsRequestStatusTypes["Submitted"] = "submitted";
    ListSmsRequestStatusTypes["Processing"] = "processing";
    ListSmsRequestStatusTypes["Sent"] = "sent";
    ListSmsRequestStatusTypes["Failed"] = "failed";
})(ListSmsRequestStatusTypes = exports.ListSmsRequestStatusTypes || (exports.ListSmsRequestStatusTypes = {}));
var EventType;
(function (EventType) {
    EventType["FaxReceived"] = "fax_received";
    EventType["FaxSent"] = "fax_sent";
    EventType["SmsReceived"] = "sms_received";
    EventType["SmsSent"] = "sms_sent";
})(EventType = exports.EventType || (exports.EventType = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["Converting"] = "converting";
    DocumentStatus["Failed"] = "failed";
    DocumentStatus["Initialised"] = "initialised";
    DocumentStatus["Successful"] = "successful";
})(DocumentStatus = exports.DocumentStatus || (exports.DocumentStatus = {}));
