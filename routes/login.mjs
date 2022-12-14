import express from "express";
import getUserByEmail from "../database/queries/getUserByEmail.mjs";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { promisify } from "util";
import * as dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const sign = promisify(JWT.sign);

const login = express.Router();

login.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).send("Missing param");
        }

        const user = await getUserByEmail(email);
        
        if(!user) {
            return res.status(400).send("User doesn't exist");
        }
    
        if(!await bcrypt.compare(password, user.password)) {
            return res.sendStatus(401);
        }

        const token = await sign(
            { id: user._id, email: user.email, username: user.username},
                ACCESS_TOKEN,
                {
                    algorithm: "HS512",
                    expiresIn: "1h"
                }
        );

        res.cookie('accesstoken', token, { httpOnly: true });
        
        return res.redirect(`/profile/${user.username}`);
        // return res.status(200).send(token);
    } catch (err) {
        console.log(err.message);
        return res.sendStatus(500);
    }
});

export default login;