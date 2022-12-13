import express from "express";
import bcrypt from "bcrypt";
import addUser from "../database/queries/addUser.mjs";
import getUser from "../database/queries/getUser.mjs";

const signup = new express.Router();

signup.post("/user", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.sendStatus(400);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await getUser();

        if(!user) {
            res.status()
        }

        await addUser(email, hashedPassword);

        res.status(201).send(user);
    } catch(err) {
        res.sendStatus(500);
    }
});

export default signup;