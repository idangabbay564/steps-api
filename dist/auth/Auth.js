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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressErrors_1 = __importDefault(require("../utils/error/expressErrors"));
//stimulate authentication & authorization util class
class Auth {
    //stimulation of authentication middleware function just to support the users feature
    //the function doesnt actually handles authentication but only simulates an authentication - real application will include proper handlement in that phase
    static authenticate() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userRef = (_a = req.headers["userref"]) === null || _a === void 0 ? void 0 : _a.toString();
                if (!userRef)
                    throw ("");
                req.userRef = userRef;
                next();
            }
            catch (e) {
                expressErrors_1.default.unauthorized(res);
            }
        });
    }
}
exports.default = Auth;
