"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodeList_1 = __importDefault(require("../../types/error/ErrorCodeList"));
//util function constructs functions for error handlement object
const constructErrorFunction = (status = ErrorCodeList_1.default.INTERNAL_ERROR) => {
    return (res, message) => res.status(status).send((message && process.env.NODE_ENV == "development") ? { error: message } : undefined);
};
//build express error handler object
const errorHandlers = {
    unauthorized: constructErrorFunction(ErrorCodeList_1.default.UNAUTHORIZED),
    forbidden: constructErrorFunction(ErrorCodeList_1.default.FORBIDDEN),
    internalError: constructErrorFunction(ErrorCodeList_1.default.INTERNAL_ERROR),
    userError: constructErrorFunction(ErrorCodeList_1.default.USER_ERROR),
    notFound: constructErrorFunction(ErrorCodeList_1.default.NOT_FOUND)
};
exports.default = errorHandlers;
