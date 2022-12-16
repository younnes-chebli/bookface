import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true, 
        lowercase: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Profile",
    }
});

const User = mongoose.model("User", userSchema);

export default User;