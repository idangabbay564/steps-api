import { Router, Response } from "express"
import Auth from "../auth/Auth"
import PostsService from "../service/PostsService"
import StatisticsService from "../service/StatisticsService"
import Endpoints from "../types/controllers/Endpoints"
import ExtendedRequest from "../types/controllers/ExtendedRequest"
import RuntimeFunctions from "../types/models/RuntimeFunctions"
import errorHandlers from "../utils/error/expressErrors"

//create a new express router instance
const router = Router()


//Endpoint for creating a new post
//using the authenticate method inside the Auth class to stimulate user authentication
router.post("/", Auth.authenticate(), async (req: ExtendedRequest, res: Response) => {
    try {
        const postObject = req.body
        if (!postObject) throw ("must provide a post object")

        postObject.creator = req.userRef

        const initialTime = Date.now() // store initial time before calling function

        const post = await PostsService.createPost(postObject)

        const runTime = Date.now() - initialTime // calculate create post function runtime

        //insert the runtime data into the statistics document stored in the DB
        await StatisticsService.insertRuntimeResult(RuntimeFunctions.CREATE_POST, runTime)

        res.send({ post })
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.userError(res, e)
    }
})

//Endpoint for fetching posts objects, with basic pagination 
router.get("/", async (req: ExtendedRequest, res: Response) => {
    try {

        let limit = req.query.limit || 10
        let skip = req.query.skip || 0

        //some parsings on the skip and limit attributes - will probably be handlent in a seperate layer / middleware in a real app
        skip = parseInt(skip.toString())
        limit = parseInt(limit.toString())

        const initialTime = Date.now() // store initial time before calling function

        const posts = await PostsService.getPosts(limit, skip)

        const runTime = Date.now() - initialTime // calculate getPosts function runtime

        //insert the runtime data into the statistics document stored in the DB
        await StatisticsService.insertRuntimeResult(RuntimeFunctions.GET_POSTS_LIST, runTime)

        res.send({ posts }) // send posts to user
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})

//Endpoint for fetching the total posts count
router.get("/number", async (req: ExtendedRequest, res: Response) => {
    try {
        //get posts count from the posts service class 
        const postsCount = await PostsService.getPostsCount()

        res.send({ postsCount })
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})


export default {
    router,
    endpoint: Endpoints.POSTS
}