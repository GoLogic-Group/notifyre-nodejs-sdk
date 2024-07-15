"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
var config_1 = require("../config");
var SmsService = (function () {
    function SmsService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/sms';
    }
    SmsService.prototype.listSentSms = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/send"), {
            params: {
                fromDate: request.fromDate,
                toDate: request.toDate,
                sort: request.sort,
                limit: request.limit,
                skip: request.skip
            }
        });
    };
    SmsService.prototype.submitSms = function (request) {
        return this.httpClient.post("".concat(this.basePath, "/send"), {
            body: request.body,
            recipients: request.recipients,
            from: request.from,
            scheduledDate: request.scheduledDate,
            addUnsubscribeLink: request.addUnsubscribeLink || false,
            callbackUrl: request.callbackUrl || "",
            metadata: request.metadata || {},
            callbackFormat: request.callbackFormat || "notifyre",
            apiVersion: config_1.defaultVersion
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
                fromDate: request.fromDate,
                toDate: request.toDate,
                sort: request.sort,
                limit: request.limit,
                skip: request.skip
            }
        });
    };
    SmsService.prototype.getSmsReply = function (replyID) {
        return this.httpClient.get("".concat(this.basePath, "/received/").concat(replyID));
    };
    SmsService.prototype.getSmsReplyV2 = function (replyID) {
        return this.httpClient.get("".concat(this.basePath, "/received/").concat(replyID));
    };
    SmsService.prototype.listSmsNumbers = function () {
        return this.httpClient.get("".concat(this.basePath, "/numbers"));
    };
    SmsService.prototype.listPrices = function () {
        return this.httpClient.get("".concat(this.basePath, "/send/prices"));
    };
    return SmsService;
}());
exports.SmsService = SmsService;
