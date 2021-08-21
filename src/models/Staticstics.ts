import { model, Schema } from "mongoose";
import RuntimeFunctions from "../types/models/RuntimeFunctions";

const statisticsSchema: Schema = new Schema({
    function: {
        enum: [
            RuntimeFunctions.CREATE_POST,
            RuntimeFunctions.GET_POSTS_LIST
        ],
        unique: true,
        type: String
    },
    results: [Number]
})

const Statistics = model("statistics", statisticsSchema)

export default Statistics