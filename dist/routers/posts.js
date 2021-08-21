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
const Auth_1 = __importDefault(require("../auth/Auth"));
const PostsService_1 = __importDefault(require("../service/PostsService"));
const StatisticsService_1 = __importDefault(require("../service/StatisticsService"));
const Endpoints_1 = __importDefault(require("../types/controllers/Endpoints"));
const RuntimeFunctions_1 = __importDefault(require("../types/models/RuntimeFunctions"));
const expressErrors_1 = __importDefault(require("../utils/error/expressErrors"));
//create a new express router instance
const router = express_1.Router();
//Endpoint for creating a new post
//using the authenticate method inside the Auth class to stimulate user authentication
router.post("/", Auth_1.default.authenticate(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postObject = req.body;
        if (!postObject)
            throw ("must provide a post object");
        postObject.creator = req.userRef;
        const initialTime = Date.now(); // store initial time before calling function
        const post = yield PostsService_1.default.createPost(postObject);
        const runTime = Date.now() - initialTime; // calculate create post function runtime
        //insert the runtime data into the statistics document stored in the DB
        yield StatisticsService_1.default.insertRuntimeResult(RuntimeFunctions_1.default.CREATE_POST, runTime);
        res.send({ post });
    }
    catch (e) {
        console.log(e);
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.userError(res, e);
    }
}));
//Endpoint for fetching posts objects, with basic pagination 
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let limit = req.query.limit || 10;
        let skip = req.query.skip || 0;
        //some parsings on the skip and limit attributes - will probably be handlent in a seperate layer / middleware in a real app
        skip = parseInt(skip.toString());
        limit = parseInt(limit.toString());
        const initialTime = Date.now(); // store initial time before calling function
        const posts = yield PostsService_1.default.getPosts(limit, skip);
        const runTime = Date.now() - initialTime; // calculate getPosts function runtime
        //insert the runtime data into the statistics document stored in the DB
        yield StatisticsService_1.default.insertRuntimeResult(RuntimeFunctions_1.default.GET_POSTS_LIST, runTime);
        res.send({ posts }); // send posts to user
    }
    catch (e) {
        console.log(e);
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.internalError(res);
    }
}));
//Endpoint for fetching the total posts count
router.get("/number", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get posts count from the posts service class 
        const postsCount = yield PostsService_1.default.getPostsCount();
        res.send({ postsCount });
    }
    catch (e) {
        console.log(e);
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        expressErrors_1.default.internalError(res);
    }
}));
exports.default = {
    router,
    endpoint: Endpoints_1.default.POSTS
};
