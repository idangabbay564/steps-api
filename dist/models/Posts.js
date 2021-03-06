"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsSchema = void 0;
const mongoose_1 = require("mongoose");
const ModelNames_1 = __importDefault(require("../types/models/ModelNames"));
//definition of posts schema for DB
exports.postsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});
//create an index for the "created at" field in order to sort posts by creation date efficiently
exports.postsSchema.index({ createdAt: 1 });
//create and export actual posts model
const Posts = mongoose_1.model(ModelNames_1.default.POSTS, exports.postsSchema);
exports.default = Posts;
