import { model, Schema } from "mongoose";
import ModelNames from "../types/models/ModelNames";

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

postsSchema.index({createdAt: 1})

const Posts = model(ModelNames.POSTS, postsSchema)

export default Posts