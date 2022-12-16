import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

const dbConnect = () => {
    try {
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch(err) {
        console.log(err.message);
        throw err;
    }    
};

export default dbConnect;