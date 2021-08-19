import { Router, Response } from "express"
import Auth from "../auth/Auth"
import PostsService from "../service/PostsService"
import Endpoints from "../types/controllers/Endpoints"
import ExtendedRequest from "../types/controllers/ExtendedRequest"
import errorHandlers from "../utils/error/expressErrors"

const router = Router()


//Endpoint for fetching a specific playlist's information and details
router.post("/", Auth.authenticate(), async (req: ExtendedRequest, res: Response) => {
    try {
        const postObject = req.body
        if(!postObject) throw ("must provide a post object")

        postObject.creator = req.userRef

        const post = await PostsService.createPost(postObject)

        res.send({ post })
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.userError(res,e)
    }
})

//Endpoint for fetching a specific playlist's information and details
router.get("/", async (req: ExtendedRequest, res: Response) => {
    try {

        let limit = req.query.limit || 10
        let skip = req.query.skip || 0

        skip = skip.toString()
        limit = limit.toString()

        const posts = await PostsService.getPosts(limit, skip)

        res.send({ posts })
    } catch (e) {

        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})

//Endpoint for fetching a specific playlist's information and details
router.get("/number", async (req: ExtendedRequest, res: Response) => {
    try {
        const postsCount = await PostsService.getPostsCount()

        res.send(postsCount)
    } catch (e) {
        console.log(e)
        // any error that is thrown and not being handled earlier in the code will be send as an internal error to the client
        errorHandlers.internalError(res)
    }
})

//Endpoint for fetching a specific playlist's information and details
router.get("/statistics", async (req: ExtendedRequest, res: Response) => {
    try {
        const postsStatistics = await PostsService.getPostsStatistics()

        res.send(postsStatistics)
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