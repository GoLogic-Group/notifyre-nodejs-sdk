"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaxService = void 0;
var constants_1 = require("../constants");
var models_1 = require("../models");
var FaxService = (function () {
    function FaxService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/fax';
    }
    FaxService.prototype.listSentFaxes = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/send"), {
            params: {
                fromDate: request.fromDate,
                toDate: request.toDate,
                sort: request.sort,
                limit: request.limit,
                skip: request.skip,
                statusType: request.statusType
            }
        });
    };
    FaxService.prototype.submitFax = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var files, documents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(request.documents.map(function (document) { return _this.uploadDocument(document); }))];
                    case 1:
                        files = _a.sent();
                        if (files.find(function (file) { return !file.success; })) {
                            throw new models_1.NotifyreError('The document upload process failed', 400, files.map(function (file) { return (file.success ? null : file.message); }));
                        }
                        return [4, this.pollDocumentsStatus(files.map(function (file) { return file.payload; }))];
                    case 2:
                        documents = _a.sent();
                        return [2, this.httpClient.post("".concat(this.basePath, "/send"), {
                                templateName: request.templateName,
                                faxes: {
                                    clientReference: request.clientReference,
                                    files: documents.map(function (document) { return document.payload.id; }),
                                    header: request.header,
                                    isHighQuality: request.isHighQuality,
                                    recipients: request.recipients,
                                    scheduledDate: request.scheduledDate,
                                    sendFrom: request.sendFrom,
                                    senderID: request.sendFrom,
                                    subject: request.subject,
                                    campaignName: request.campaignName
                                }
                            })];
                }
            });
        });
    };
    FaxService.prototype.uploadDocument = function (request) {
        return this.httpClient
            .post("".concat(this.basePath, "/send/conversion"), request)
            .catch(function (err) { return err; });
    };
    FaxService.prototype.downloadSentFax = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/send/recipients/").concat(request.recipientID, "/download"), {
            params: {
                fileType: request.fileType
            }
        });
    };
    FaxService.prototype.pollDocumentsStatus = function (request, iteration) {
        if (iteration === void 0) { iteration = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var documents;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(iteration !== 1)) return [3, 2];
                        return [4, new Promise(function (resolve) {
                                return setTimeout(function () {
                                    resolve();
                                }, iteration * 5000);
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4, Promise.all(request.map(function (document) {
                            return _this.httpClient
                                .get("".concat(_this.basePath, "/send/conversion/").concat(document.fileName))
                                .catch(function (err) { return err; });
                        }))];
                    case 3:
                        documents = _a.sent();
                        if (documents.find(function (document) { var _a; return ((_a = document.payload) === null || _a === void 0 ? void 0 : _a.status) === constants_1.DocumentStatus.Failed; })) {
                            throw new models_1.NotifyreError('The document conversion process failed', 400, documents.map(function (document) {
                                return document.success ? null : document.message;
                            }));
                        }
                        if (documents.every(function (document) { var _a; return ((_a = document.payload) === null || _a === void 0 ? void 0 : _a.status) === constants_1.DocumentStatus.Successful; })) {
                            return [2, documents];
                        }
                        return [2, this.pollDocumentsStatus(request, iteration + 1)];
                }
            });
        });
    };
    FaxService.prototype.listCoverPages = function () {
        return this.httpClient.get("".concat(this.basePath, "/coverpages"));
    };
    FaxService.prototype.listReceivedFaxes = function (request) {
        return this.httpClient.get("".concat(this.basePath, "/received"), {
            params: request
        });
    };
    FaxService.prototype.downloadReceivedFax = function (faxId) {
        return this.httpClient.get("".concat(this.basePath, "/received/").concat(faxId, "/download"));
    };
    FaxService.prototype.listFaxNumbers = function () {
        return this.httpClient.get("".concat(this.basePath, "/numbers"));
    };
    FaxService.prototype.listPrices = function () {
        return this.httpClient.get("".concat(this.basePath, "/send/prices"));
    };
    return FaxService;
}());
exports.FaxService = FaxService;
