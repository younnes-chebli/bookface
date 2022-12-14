import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        lowercase: true
    },
    username: String,
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;