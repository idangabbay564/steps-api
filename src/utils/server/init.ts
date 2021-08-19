import express from "express"
import chalk from "chalk"
import cors from "cors"

import postsRouter from "../../routers/posts";
import config from "../../config";
import Posts from "../../models/Posts";
import User from "../../models/Users";
import "../DB/dbConnect"

export default async (expressPackage: typeof express, port: number | string): Promise<void> => {
    const app = expressPackage();

    process.env.NODE_ENV === "development" ? app.use(cors({ origin: "http://localhost:3000" })) : null

    app.use(express.json())
    app.use(postsRouter.endpoint, postsRouter.router)

    app.listen(port, () => {
        console.log(chalk.green(`Running on port ${process.env.PORT || 8080}`))
    })
}

// const user = new User({})
// user.save().then(res => console.log(res)).catch(err => console.log(err))