import express from "express";
import getUserByEmail from "../database/queries/getUserByEmail.mjs";
import bcrypt from "bcrypt";
import assignToken from "../utils/assignToken.mjs";

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

        const token = await assignToken(user);
        

        return res.redirect(`profile/${user.username}`);
        // return res.status(200).send(token);
    } catch (err) {
        return res.sendStatus(500);
    }
});

export default login;

