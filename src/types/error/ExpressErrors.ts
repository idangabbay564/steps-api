import { Response } from "express";

//error util function type definition
export type CustomExpressErrorFunction = (res: Response, message?: string | Object) => void 

//express errors object type definition
interface ExpressErrors {
    unauthorized: CustomExpressErrorFunction,
    forbidden: CustomExpressErrorFunction,
    internalError: CustomExpressErrorFunction,
    userError: CustomExpressErrorFunction,
    notFound: CustomExpressErrorFunction
}

export default ExpressErrors