import { Router, Response } from "express"
import Auth from "../auth/Auth"
import PostsService from "../service/PostsService"
import StatisticsService from "../service/StatisticsService"
import Endpoints from "../types/controllers/Endpoints"
import ExtendedRequest from "../types/controllers/ExtendedRequest"
import errorHandlers from "../utils/error/expressErrors"

const router = Router()


//Endpoint for fetching a specific playlist's information and details
router.get("/runtimes", async (req: ExtendedRequest, res: Response) => {
    try {
        const postsStatistics = await StatisticsService.getRuntimeStatistics()

        res.send(postsStatistics)
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})

//Endpoint for fetching a specific playlist's information and details
router.get("/topcreators", async (req: ExtendedRequest, res: Response) => {
    try {
        const postsStatistics = await StatisticsService.getPostsCreatorsStatistics()

        res.send(postsStatistics)
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})



export default {
    router,
    endpoint: Endpoints.STATISTICS
}