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
var models_1 = require("../models");
var utilities_1 = require("../utilities");
var FaxService = (function () {
    function FaxService(httpClient) {
        this.httpClient = httpClient;
        this.basePath = '/fax';
    }
    FaxService.prototype.listSentFaxes = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.get("".concat(this.basePath, "/send"), {
                                params: {
                                    fromDate: (0, utilities_1.dateToTimestamp)(request.fromDate, false),
                                    toDate: (0, utilities_1.dateToTimestamp)(request.toDate, true),
                                    sort: request.sort,
                                    limit: request.limit
                                }
                            })];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_1 = _a.sent();
                        return [2, new models_1.NotifyreError(err_1.message)];
                    case 3: return [2];
                }
            });
        });
    };
    FaxService.prototype.submitFax = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var files, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, Promise.all(request.documents.map(function (document) { return _this.uploadDocument(document); }))];
                    case 1:
                        files = _a.sent();
                        if (files.find(function (file) { return !file.success; })) {
                            return [2, new models_1.NotifyreError('The document upload process failed', 400, files.map(function (file) { return (file.success ? null : file.message); }))];
                        }
                        return [4, this.httpClient.post("".concat(this.basePath, "/send"), {
                                templateName: request.templateName,
                                faxes: {
                                    clientReference: request.clientReference,
                                    files: files.map(function (file) { return file.payload.fileID; }),
                                    header: request.header,
                                    isHighQuality: request.isHighQuality,
                                    recipients: request.recipients,
                                    scheduledDate: request.scheduledDate
                                        ? (0, utilities_1.dateToTimestamp)(request.scheduledDate)
                                        : null,
                                    sendFrom: request.sendFrom,
                                    senderID: request.sendFrom,
                                    subject: request.subject
                                }
                            })];
                    case 2: return [2, (_a.sent()).data];
                    case 3:
                        err_2 = _a.sent();
                        return [2, new models_1.NotifyreError(err_2.message)];
                    case 4: return [2];
                }
            });
        });
    };
    FaxService.prototype.uploadDocument = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.post("".concat(this.basePath, "/send/conversion"), request)];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_3 = _a.sent();
                        return [2, new models_1.NotifyreError(err_3.message)];
                    case 3: return [2];
                }
            });
        });
    };
    FaxService.prototype.downloadSentFax = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.get("".concat(this.basePath, "/send/recipients/").concat(request.id, "/download"), {
                                params: {
                                    fileType: request.fileType
                                }
                            })];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_4 = _a.sent();
                        return [2, new models_1.NotifyreError(err_4.message)];
                    case 3: return [2];
                }
            });
        });
    };
    FaxService.prototype.listCoverPages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.get("".concat(this.basePath, "/coverpages"))];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_5 = _a.sent();
                        return [2, new models_1.NotifyreError(err_5.message)];
                    case 3: return [2];
                }
            });
        });
    };
    FaxService.prototype.listReceivedFaxes = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.get("".concat(this.basePath, "/received"), {
                                params: request
                            })];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_6 = _a.sent();
                        return [2, new models_1.NotifyreError(err_6.message)];
                    case 3: return [2];
                }
            });
        });
    };
    FaxService.prototype.downloadReceivedFax = function (faxId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.get("".concat(this.basePath, "/received/").concat(faxId, "/download"))];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_7 = _a.sent();
                        return [2, new models_1.NotifyreError(err_7.message)];
                    case 3: return [2];
                }
            });
        });
    };
    FaxService.prototype.listFaxNumbers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.httpClient.get("".concat(this.basePath, "/numbers"))];
                    case 1: return [2, (_a.sent()).data];
                    case 2:
                        err_8 = _a.sent();
                        return [2, new models_1.NotifyreError(err_8.message)];
                    case 3: return [2];
                }
            });
        });
    };
    return FaxService;
}());
exports.FaxService = FaxService;
