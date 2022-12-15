import JWT from "jsonwebtoken";
import { promisify } from "util";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const verify = promisify(JWT.verify);

const authenticateToken = async(req, res, next) => {
    try {
        const cookie = req.cookies.accesstoken;
        if(!cookie) {
            return res.sendStatus(401);
        }

        const decoded = await verify(cookie, ACCESS_TOKEN);
        
        if(decoded) {
            req.user = decoded;
            return next();
        }
    } catch (err) {
        throw err;
    }
};

export default authenticateToken;