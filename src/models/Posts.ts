import { model, Schema } from "mongoose";
import ModelNames from "../types/models/ModelNames";

//definition of posts schema for DB
export const postsSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

//create an index for the "created at" field in order to sort posts by creation date efficiently
postsSchema.index({createdAt: 1})

//create and export actual posts model
const Posts = model(ModelNames.POSTS, postsSchema)

export default Posts