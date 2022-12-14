import express from "express";
import bcrypt from "bcrypt";
import addUser from "../database/queries/addUser.mjs";
import getUserByEmail from "../database/queries/getUserByEmail.mjs";
import assignToken from "../utils/assignToken.mjs";

const signup = new express.Router();

signup.post("/signup", async(req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).send("missing param");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await getUserByEmail(email);

        if(user) {
            return res.status(400).send("User already exists");
        }

        const newUser = await addUser(email, username, hashedPassword);

        await assignToken(newUser);

        // return res.redirect("profile");
        return res.status(201).send(newUser);
    } catch(err) {
        return res.sendStatus(500);
    }
});

export default signup;