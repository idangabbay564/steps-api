import { Document, Model } from "mongoose";
import Posts from "../models/Posts";
import Statistics from "../models/Staticstics";
import StatisticsModel from "../models/Staticstics";
import RuntimeFunctions from "../types/models/RuntimeFunctions";

export default class StatisticsService {
    static model: Model<Document<any, any, any>, any, any> = StatisticsModel;

    static async insertRuntimeResult(func: RuntimeFunctions, result: any) {
        const queryObj = { function: func }
        await this.model.findOneAndUpdate(queryObj, { $push: { results: result } })
    }

    static async getRuntimeStatistics() {
        const postsStatistics = await this.model.aggregate([
            {
                $project:
                {
                    _id: 0,
                    function: "$function",
                    averageRuntime: { $avg: "$results" },
                    unit: "miliseconds"
                }
            }])

        return postsStatistics
    }

    //function handles statistics calculations on posts entity
    public static async getPostsCreatorsStatistics(): Promise<any[]> {
        try {
            const postsStatistics = await Posts.aggregate([
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
