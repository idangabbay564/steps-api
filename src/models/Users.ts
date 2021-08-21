import { model,Schema } from "mongoose";

//creation of user schema 
//not gonna include any attribute besides _id which will be used as the user's unique identifier - just to implement a basic simple user relation to posts
const userSchema: Schema = new Schema({

})

//create and export actual User model
const User = model("user",userSchema)

export default User