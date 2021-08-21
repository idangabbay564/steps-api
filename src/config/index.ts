import dotenv from "dotenv"
import Config from "../types/config";

dotenv.config()

//project configuration object
const config: Config = {
    app: {
        port: process.env.PORT || 5000,
    },
    db: {
        connection_string: process.env.connection_string || ""
    }
}

export default config