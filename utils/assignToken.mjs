import JWT from "jsonwebtoken";
import { promisify } from "util";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const sign = promisify(JWT.sign);
const verify = promisify(JWT.verify);

const assignToken = async(user) => {
    return await sign(
        { id: user._id, email: user.email, username: user.username},
            ACCESS_TOKEN,
            {
                algorithm: "HS512",
                // expiresIn: "1h"
            }
    );
};

export default assignToken;