import mongoose from "mongoose";
import { Schema } from "mongoose";

const profileSchema = new Schema({
    bio: String,
    createdAt: {
        type: String,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: String,
        default: () => Date.now()
    },
});

// profileSchema.pre("save", (next, e) => {
//     try {
//         this.updatedAt = Date.now();
//         next();    
//     } catch (error) {
//         console.log(error.message);
//         throw error;
//     }
// });

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
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: profileSchema
});


const User = mongoose.model("User", userSchema);

export default User;