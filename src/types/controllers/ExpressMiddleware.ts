import { NextFunction, Response } from "express"
import ExtendedRequest from "./ExtendedRequest"

type ExpressMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction) => Promise<void>

export default ExpressMiddleware