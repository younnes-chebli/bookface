import express from "express";
import bcrypt from "bcrypt";
import addUser from "../database/queries/addUser.mjs";
import getUserByEmail from "../database/queries/getUserByEmail.mjs";
import getUserByUsername from "../database/queries/getUserByUsername.mjs";

const signup = new express.Router();

signup.post("/signup", async(req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).send("missing param");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if(await getUserByEmail(email)) {
            return res.status(400).send("Email already exists");
        }

        if(await getUserByUsername(username)) {
            return res.status(400).send("Username already exists");
        }

        await addUser(email, username, hashedPassword);

        return res.redirect("/login");
        // return res.status(201).send(newUser);
    } catch(err) {
        console.log(err.message);
        return res.redirect("/signup");
        // return res.sendStatus(500);
    }
});

export default signup;