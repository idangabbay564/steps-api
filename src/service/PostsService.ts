import ObjType from "../types/controllers/ObjType";
import config from "../config";
import { model, Model, Schema, Document } from "mongoose";
import PostsModel, { postsSchema } from "../models/Posts";

//class being used as the service layer for the posts controller
export default class PostsService {

    static model: Model<Document<any, any, any>, any, any> = PostsModel;

    //function handles creating a new post under a specific user
    public static async createPost(postObject: { [key: string]: any }): Promise<ObjType> {
        try {
            //create and save new post
            const post = new this.model(postObject)
            return await post.save()
        } catch (e) {
            throw ("Unable to create post")
        }
    }

    //function handles getting posts from DB - integrated with basic pagination 
    public static async getPosts(limit: number, skip: number): Promise<any[]> {
        try {
            // fetch posts from posts collection, using pagination, and sorted by creation date as requested (sort is supported by an index on the posts table to make it optimized)
            const posts = await this.model.find({}).skip(skip).limit(limit).sort({ createdAt: 1 })
            return posts
        } catch (e) {
            console.log(e)
            throw ("Unable to get posts")
        }
    }

    //function handles fetching a total posts count
    public static async getPostsCount(): Promise<any[]> {
        try {
            // count total posts from Posts collection
            const postsStatistics = await this.model.countDocuments({})

            return postsStatistics
        } catch (e) {
            throw (e)
        }
    }



}
