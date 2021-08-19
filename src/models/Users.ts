import { model,Schema } from "mongoose";

const userSchema: Schema = new Schema({

})

const User = model("user",userSchema)

export default User