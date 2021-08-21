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
const Posts_1 = __importDefault(require("../models/Posts"));
//class being used as the service layer for the posts controller
class PostsService {
    //function handles creating a new post under a specific user
    static createPost(postObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = new this.model(postObject);
                return yield post.save();
            }
            catch (e) {
                throw ("Unable to create post");
            }
        });
    }
    //function handles getting posts from DB - integrated with basic pagination 
    static getPosts(limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.model.find({}).skip(skip).limit(limit).sort({ createdAt: 1 });
                return posts;
            }
            catch (e) {
                console.log(e);
                throw ("Unable to get posts");
            }
        });
    }
    //function handles fetching a distinct posts creators count
    static getPostsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postsStatistics = yield this.model.countDocuments({});
                return postsStatistics;
            }
            catch (e) {
                throw (e);
            }
        });
    }
}
exports.default = PostsService;
PostsService.model = Posts_1.default;
