"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MmsService = void 0;
var MmsService = (function () {
    function MmsService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/mms';
    }
    MmsService.prototype.downloadMmsReply = function (replyID) {
        return this.httpClient.get("".concat(this.basePath, "/received/").concat(replyID, "/download"));
    };
    return MmsService;
}());
exports.MmsService = MmsService;
