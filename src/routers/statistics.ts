import { Router, Response } from "express"
import StatisticsService from "../service/StatisticsService"
import Endpoints from "../types/controllers/Endpoints"
import ExtendedRequest from "../types/controllers/ExtendedRequest"
import errorHandlers from "../utils/error/expressErrors"

const router = Router()


//Endpoint for getting runtime statistics data as requested in the task
router.get("/runtimes", async (req: ExtendedRequest, res: Response) => {
    try {
        const runtimeStatistics = await StatisticsService.getRuntimeStatistics() // call function from service class

        res.send(runtimeStatistics) // send runtime statistics to the client
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})

//Endpoint for getting top post creators statistics data as requested in the task
router.get("/topcreators", async (req: ExtendedRequest, res: Response) => {
    try {
        const postsStatistics = await StatisticsService.getPostsCreatorsStatistics() // call function from service class

        res.send(postsStatistics) // send runtime statistics to the client
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