import { NextFunction, Request, Response } from "express"
import ExpressMiddleware from "../types/controllers/ExpressMiddleware"
import ExtendedRequest from "../types/controllers/ExtendedRequest"
import errorHandlers from "../utils/error/expressErrors"

//stimulate authentication & authorization util class
export default class Auth {

    //stimulation of authentication middleware function just to support the users feature
    //the function doesnt actually handles authentication but only simulates an authentication - real application will include proper handlement in that phase
    public static authenticate(): ExpressMiddleware {
        return async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
            try {
                const userRef = req.headers["userref"]?.toString()
                
                if (!userRef) throw ("")
                req.userRef = userRef

                next()
            } catch (e) {
                errorHandlers.unauthorized(res)
            }
        }
    }
}