"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyreError = void 0;
var _1 = require(".");
var NotifyreError = (function (_super) {
    __extends(NotifyreError, _super);
    function NotifyreError(message, statusCode, errors) {
        if (statusCode === void 0) { statusCode = 500; }
        if (errors === void 0) { errors = []; }
        return _super.call(this, false, statusCode, message, null, errors) || this;
    }
    return NotifyreError;
}(_1.BaseResponse));
exports.NotifyreError = NotifyreError;
