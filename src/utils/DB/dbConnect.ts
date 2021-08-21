import mongoose from "mongoose"
import chalk from "chalk"

import config from "../../config"

//setup connection to mongodb DB via mongoose ODM
mongoose
    .connect(config.db.connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
    )
    .then((res: any) => console.log(chalk.greenBright("DB connected"))) // handle successfull conneciton
    .catch((err: any) => console.log(err));
