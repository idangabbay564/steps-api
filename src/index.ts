import express from "express"
import config from "./config"

import initServer from "./utils/server/init"

const port = config.app.port

//initialize app/server
initServer(express, port)

