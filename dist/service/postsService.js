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
//class being used as the service layer for the playist controller
class PlaylistService {
    //function handles getting a specific platlist's videos list
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
    //function handles getting a specific platlist's videos list
    static getPosts(limit, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.model.find({}).skip(skip).limit(limit).sort({ createdAt: 1 });
                return posts;
            }
            catch (e) {
                throw ("Unable to get posts");
            }
        });
    }
    //function handles getting a specific platlist's videos list
    static getPostsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postsStatistics = yield this.model.aggregate([
                    {
                        $group: {
                            _id: "$creator",
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $match: {
                            count: { $gte: 1 }
                        }
                    },
                    // {$sort: {"$count": 1}}
                ]);
                return postsStatistics;
            }
            catch (e) {
                throw (e);
            }
        });
    }
    //function handles getting a specific platlist's videos list
    static getPostsStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postsStatistics = yield this.model.aggregate([
                    {
                        $group: {
                            _id: "$creator",
                            count: { $sum: 1 }
                        }
                    },
                    {
                        $match: {
                            count: { $gte: 1 }
                        }
                    },
                    {
                        $sort: { "count": -1 }
                    },
                    {
                        $limit: 10
                    }
                ]);
                return postsStatistics;
            }
            catch (e) {
                throw (e);
            }
        });
    }
}
exports.default = PlaylistService;
PlaylistService.model = Posts_1.default;
