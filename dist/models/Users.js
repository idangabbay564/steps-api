"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//creation of user schema 
//not gonna include any attribute besides _id which will be used as the user's unique identifier - just to implement a basic simple user relation to posts
const userSchema = new mongoose_1.Schema({});
//create and export actual User model
const User = mongoose_1.model("user", userSchema);
exports.default = User;
