import JWT from "jsonwebtoken";
import { promisify } from "util";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const verify = promisify(JWT.verify);

const authenticateToken = async(req, res, next) => {
    try {
        if(!req.headers.authorization) {
            return res.sendStatus(401);
        }

        const decoded = await verify(req.headers.authorization.split(" ")[1], ACCESS_TOKEN);
        
        if(decoded) {
            req.user = decoded;
            console.log(req.user);
            return next();
        }
    } catch (err) {
        throw err;
    }
};

export default authenticateToken;