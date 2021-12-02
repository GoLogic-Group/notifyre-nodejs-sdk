"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.generateSignature = exports.dateToTimestamp = void 0;
var crypto_1 = require("crypto");
var _1 = require(".");
var dateToTimestamp = function (date, isMax) {
    var ms = 0;
    if (isMax === undefined) {
        ms = date.getTime();
    }
    else if (isMax) {
        ms = date.setUTCHours(23, 59, 59, 999);
    }
    else {
        ms = date.setUTCHours(0, 0, 0, 0);
    }
    return Math.floor(ms / 1000);
};
exports.dateToTimestamp = dateToTimestamp;
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
    if ((0, exports.dateToTimestamp)(new Date()) - +timestamp > timeToleranceSec) {
        throw new _1.NotifyreError('Signature timestamp expired');
    }
    var expectedSignature = (0, exports.generateSignature)("".concat(timestamp, ".").concat(JSON.stringify(payload)), signingSecret);
    if (expectedSignature === signature) {
        return true;
    }
    throw new _1.NotifyreError('Invalid signature');
};
exports.verifySignature = verifySignature;
