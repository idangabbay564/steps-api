"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({});
const User = mongoose_1.model("user", userSchema);
exports.default = User;
