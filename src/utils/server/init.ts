import express from "express"
import chalk from "chalk"
import cors from "cors"

import postsRouter from "../../routers/posts";
import statisticsRouter from "../../routers/statistics";
import "../DB/dbConnect"

//function initializes express app & server
export default async (expressPackage: typeof express, port: number | string): Promise<void> => {
    const app = expressPackage();

    app.use(express.json()) // parse requests body
    app.use(postsRouter.endpoint, postsRouter.router) // append posts router
    app.use(statisticsRouter.endpoint, statisticsRouter.router) // append statistics router

    //initialize the server on determined port
    app.listen(port, () => {
        console.log(chalk.green(`Running on port ${process.env.PORT || 8080}`))
    })
}
