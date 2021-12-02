"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.NotifyreAPI = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = require("./config");
var services_1 = require("./services");
var NotifyreAPI = (function () {
    function NotifyreAPI(apiKey, version) {
        if (version === void 0) { version = config_1.defaultVersion; }
        this.apiKey = apiKey;
        this.version = version;
        this.httpClient = axios_1.default.create({
            baseURL: "".concat(config_1.baseUrl, "/").concat(version),
            headers: {
                'x-api-token': this.apiKey,
                'user-agent': this.version
            }
        });
    }
    NotifyreAPI.prototype.getFaxService = function () {
        return new services_1.FaxService(this.httpClient);
    };
    NotifyreAPI.prototype.getSmsService = function () {
        return new services_1.SmsService(this.httpClient);
    };
    NotifyreAPI.prototype.getContactsService = function () {
        return new services_1.ContactsService(this.httpClient);
    };
    return NotifyreAPI;
}());
exports.NotifyreAPI = NotifyreAPI;
__exportStar(require("./constants"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./types"), exports);
var utilities_1 = require("./utilities");
Object.defineProperty(exports, "verifySignature", { enumerable: true, get: function () { return utilities_1.verifySignature; } });
