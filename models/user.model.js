import mongoose, {Schema , model} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    token: {
        type: String,
    }
}, {
    timestamps: true,
})


const userModel= model("User",userSchema)

export default userModel;