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
const Staticstics_1 = __importDefault(require("../models/Staticstics"));
class StatisticsService {
    static insertRuntimeResult(func, result) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryObj = { function: func };
            yield this.model.findOneAndUpdate(queryObj, { $push: { results: result } });
        });
    }
    static getRuntimeStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            const postsStatistics = yield this.model.aggregate([
                {
                    $project: {
                        _id: 0,
                        function: "$function",
                        averageRuntime: { $avg: "$results" },
                        unit: "miliseconds"
                    }
                }
            ]);
            return postsStatistics;
        });
    }
    //function handles statistics calculations on posts entity
    static getPostsCreatorsStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postsStatistics = yield Posts_1.default.aggregate([
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
exports.default = StatisticsService;
StatisticsService.model = Staticstics_1.default;
