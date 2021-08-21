"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RuntimeFunctions_1 = __importDefault(require("../types/models/RuntimeFunctions"));
//definition of statistics schema for DB
const statisticsSchema = new mongoose_1.Schema({
    function: {
        enum: [
            RuntimeFunctions_1.default.CREATE_POST,
            RuntimeFunctions_1.default.GET_POSTS_LIST
        ],
        unique: true,
        type: String
    },
    results: [Number]
});
//create and export actual statistics model
const Statistics = mongoose_1.model("statistics", statisticsSchema);
exports.default = Statistics;
