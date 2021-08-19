import {Request} from "express"

interface ExtendedRequest extends Request {
    userRef?: string
}

export default ExtendedRequest