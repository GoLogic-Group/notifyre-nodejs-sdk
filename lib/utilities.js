"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorInterceptor = exports.responseInterceptor = exports.verifySignature = exports.generateSignature = void 0;
var crypto_1 = require("crypto");
var _1 = require(".");
var generateSignature = function (message, key) {
    return (0, crypto_1.createHmac)('sha256', key).update(message).digest('hex');
};
exports.generateSignature = generateSignature;
var verifySignature = function (signatureHeader, payload, signingSecret, timeToleranceSec) {
    if (timeToleranceSec === void 0) { timeToleranceSec = 300; }
    var timestamp = '';
    var signature = '';
    var elements = signatureHeader.split(',');
    elements.forEach(function (element) {
        if (element.split('=')[0] == 't') {
            timestamp = element.split('=')[1];
        }
        if (element.split('=')[0] == 'v') {
            signature = element.split('=')[1];
        }
    });
    if (!timestamp) {
        throw new _1.NotifyreError('Empty signature timestamp');
    }
    if (!signature) {
        throw new _1.NotifyreError('Empty signature');
    }
    var timestamNow = new Date().getTime() / 1000;
    if (timestamNow - +timestamp > timeToleranceSec) {
        throw new _1.NotifyreError('Signature timestamp expired');
    }
    var expectedSignature = (0, exports.generateSignature)("".concat(timestamp, ".").concat(JSON.stringify(payload)), signingSecret);
    if (expectedSignature === signature) {
        return true;
    }
    throw new _1.NotifyreError('Invalid signature');
};
exports.verifySignature = verifySignature;
var responseInterceptor = function (res) {
    return res.data;
};
exports.responseInterceptor = responseInterceptor;
var errorInterceptor = function (res) {
    if (res.response) {
        return Promise.reject(new _1.NotifyreError(res.response.data.message, res.response.data.statusCode, res.response.data.errors));
    }
    else {
        return Promise.reject(new _1.NotifyreError(res.message));
    }
};
exports.errorInterceptor = errorInterceptor;
