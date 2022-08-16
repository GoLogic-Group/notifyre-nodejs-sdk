"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
var utilities_1 = require("../utilities");
var SmsService = (function () {
    function SmsService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/sms';
    }
    SmsService.prototype.listSentSms = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/send"), {
            params: {
                fromDate: (0, utilities_1.dateToTimestamp)(request.fromDate, false),
                toDate: (0, utilities_1.dateToTimestamp)(request.toDate, true),
                sort: request.sort,
                limit: request.limit
            }
        });
    };
    SmsService.prototype.submitSms = function (request) {
        return this.httpClient.post("".concat(this.basePath, "/send"), {
            body: request.body,
            recipients: request.recipients,
            from: request.from,
            scheduledDate: request.scheduledDate
                ? (0, utilities_1.dateToTimestamp)(request.scheduledDate)
                : null,
            optOutMessage: request.optOutMessage || false,
            addUnsubscribeLink: request.addUnsubscribeLink || false,
            callbackUrl: request.callbackUrl || "",
            metadata: request.metadata || {},
            callbackFormat: request.callbackFormat || "notifyre"
        });
    };
    SmsService.prototype.getSms = function (id) {
        return this.httpClient.get("".concat(this.basePath, "/send/").concat(id));
    };
    SmsService.prototype.getSmsRecipientMessage = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/send/").concat(request.messageID, "/recipients/").concat(request.recipientID));
    };
    SmsService.prototype.listSmsReplies = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/received"), {
            params: {
                fromDate: (0, utilities_1.dateToTimestamp)(request.fromDate, false),
                toDate: (0, utilities_1.dateToTimestamp)(request.toDate, true),
                sort: request.sort,
                limit: request.limit
            }
        });
    };
    SmsService.prototype.getSmsReply = function (replyID) {
        return this.httpClient.get("".concat(this.basePath, "/received/").concat(replyID));
    };
    SmsService.prototype.listSmsNumbers = function () {
        return this.httpClient.get("".concat(this.basePath, "/numbers"));
    };
    return SmsService;
}());
exports.SmsService = SmsService;
