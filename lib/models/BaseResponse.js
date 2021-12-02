"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
var BaseResponse = (function () {
    function BaseResponse(success, statusCode, message, payload, errors) {
        if (errors === void 0) { errors = []; }
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.payload = payload;
        this.errors = errors;
    }
    return BaseResponse;
}());
exports.BaseResponse = BaseResponse;
