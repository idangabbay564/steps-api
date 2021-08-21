import express from "express"
import chalk from "chalk"
import cors from "cors"

import postsRouter from "../../routers/posts";
import statisticsRouter from "../../routers/statistics";
import config from "../../config";
import Posts from "../../models/Posts";
import User from "../../models/Users";
import "../DB/dbConnect"
import Statistics from "../../models/Staticstics";
import RuntimeFunctions from "../../types/models/RuntimeFunctions";

export default async (expressPackage: typeof express, port: number | string): Promise<void> => {
    const app = expressPackage();

    process.env.NODE_ENV === "development" ? app.use(cors({ origin: "http://localhost:3000" })) : null

    app.use(express.json())
    app.use(postsRouter.endpoint, postsRouter.router)
    app.use(statisticsRouter.endpoint, statisticsRouter.router)

    app.listen(port, () => {
        console.log(chalk.green(`Running on port ${process.env.PORT || 8080}`))
    })
}
