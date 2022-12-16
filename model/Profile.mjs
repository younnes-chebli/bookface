import mongoose from "mongoose";
import { Schema } from "mongoose";

const profileSchema = new Schema({
    owner: {
        type: mongoose.SchemaType.ObjectId,
        unique: true,
        required: true,
        ref: "User"
    },
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

profileSchema.pre("save", (next) => {
    try {
        this.updatedAt = Date.now();
        next();    
    } catch (error) {
        throw error;
    }
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;