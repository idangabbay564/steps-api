import ObjType from "../types/controllers/ObjType";
import config from "../config";
import { model, Model, Schema, Document } from "mongoose";
import PostsModel, { postsSchema } from "../models/Posts";

//class being used as the service layer for the playist controller
export default class PlaylistService {

    static model: Model<Document<any, any, any>, any, any> = PostsModel;

    //function handles getting a specific platlist's videos list
    public static async createPost(postObject: { [key: string]: any }): Promise<ObjType> {
        try {
            const post = new this.model(postObject)
            return await post.save()
        } catch (e) {
            throw ("Unable to create post")
        }
    }

    //function handles getting a specific platlist's videos list
    public static async getPosts(limit: number | string, skip: number | string): Promise<any[]> {
        try {
            const posts = await this.model.find({}).skip(skip).limit(limit).sort({ createdAt: 1 })
            return posts
        } catch (e) {
            throw ("Unable to get posts")
        }
    }

    //function handles getting a specific platlist's videos list
    public static async getPostsCount(): Promise<any[]> {
        try {
            const postsStatistics = await this.model.aggregate([
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

            ])

            return postsStatistics
        } catch (e) {
            throw (e)
        }
    }

    //function handles getting a specific platlist's videos list
    public static async getPostsStatistics(): Promise<any[]> {
        try {
            const postsStatistics = await this.model.aggregate([
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

            ])

            return postsStatistics
        } catch (e) {
            throw (e)
        }
    }


}
