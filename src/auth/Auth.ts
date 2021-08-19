import { NextFunction, Request, Response } from "express"
import ExtendedRequest from "../types/controllers/ExtendedRequest"
import errorHandlers from "../utils/error/expressErrors"


type expressMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction) => Promise<void>

export default class Auth {

    public static authenticate(): expressMiddleware {
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