import {Request} from "express"

//extended express request interface in order to append userRef attribute, appended to the request object during the authenticate middleware function runtime
interface ExtendedRequest extends Request {
    userRef?: string
}

export default ExtendedRequest