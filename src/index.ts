import express from "express"
import config from "./config"

import initServer from "./utils/server/init"

const port = config.app.port

initServer(express, port)

