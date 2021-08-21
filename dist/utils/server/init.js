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
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const posts_1 = __importDefault(require("../../routers/posts"));
const statistics_1 = __importDefault(require("../../routers/statistics"));
require("../DB/dbConnect");
//function initializes express app & server
exports.default = (expressPackage, port) => __awaiter(void 0, void 0, void 0, function* () {
    const app = expressPackage();
    app.use(express_1.default.json()); // parse requests body
    app.use(posts_1.default.endpoint, posts_1.default.router); // append posts router
    app.use(statistics_1.default.endpoint, statistics_1.default.router); // append statistics router
    //initialize the server on determined port
    app.listen(port, () => {
        console.log(chalk_1.default.green(`Running on port ${process.env.PORT || 8080}`));
    });
});
