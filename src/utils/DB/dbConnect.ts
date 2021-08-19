import mongoose from "mongoose"

import config from "../../config"

mongoose
    .connect(config.db.connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    )
    .then((res: any) => console.log("connected"))
    .catch((err: any) => console.log(err));
