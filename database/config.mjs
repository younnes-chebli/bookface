import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT;
mongoose.set('strictQuery', false);

const dbConnect = () => {
    try {
        mongoose.connect(DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to db!");
    } catch(err) {
        throw err;
    }    
};

export default dbConnect;