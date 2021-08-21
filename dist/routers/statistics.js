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
const express_1 = require("express");
const StatisticsService_1 = __importDefault(require("../service/StatisticsService"));
const Endpoints_1 = __importDefault(require("../types/controllers/Endpoints"));
const expressErrors_1 = __importDefault(require("../utils/error/expressErrors"));
const router = express_1.Router();
//Endpoint for getting runtime statistics data as requested in the task
router.get("/runtimes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const runtimeStatistics = yield StatisticsService_1.default.getRuntimeStatistics(); // call function from service class
        res.send(runtimeStatistics); // send runtime statistics to the client
    }
    catch (e) {
        console.log(e);
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.internalError(res);
    }
}));
//Endpoint for getting top post creators statistics data as requested in the task
router.get("/topcreators", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsStatistics = yield StatisticsService_1.default.getPostsCreatorsStatistics(); // call function from service class
        res.send(postsStatistics); // send runtime statistics to the client
    }
    catch (e) {
        console.log(e);
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.internalError(res);
    }
}));
exports.default = {
    router,
    endpoint: Endpoints_1.default.STATISTICS
};
