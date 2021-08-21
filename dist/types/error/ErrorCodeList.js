"use strict";
//error code list - being used in the error handlement util function / object
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCodeList;
(function (ErrorCodeList) {
    ErrorCodeList[ErrorCodeList["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    ErrorCodeList[ErrorCodeList["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCodeList[ErrorCodeList["FORBIDDEN"] = 403] = "FORBIDDEN";
    ErrorCodeList[ErrorCodeList["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCodeList[ErrorCodeList["USER_ERROR"] = 400] = "USER_ERROR";
})(ErrorCodeList || (ErrorCodeList = {}));
exports.default = ErrorCodeList;
