"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const config_1 = __importDefault(require("../../config"));
//setup connection to mongodb DB via mongoose ODM
mongoose_1.default
    .connect(config_1.default.db.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((res) => console.log(chalk_1.default.greenBright("DB connected"))) // handle successfull conneciton
    .catch((err) => console.log(err));
