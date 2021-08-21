import { model, Schema } from "mongoose";
import RuntimeFunctions from "../types/models/RuntimeFunctions";

//definition of statistics schema for DB
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

//create and export actual statistics model
const Statistics = model("statistics", statisticsSchema)

export default Statistics