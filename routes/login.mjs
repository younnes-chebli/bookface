import express from "express";
import JWT from "jsonwebtoken";
import { promisify } from "util";

const sign = promisify(JWT.sign);
const verify = promisify(JWT.verify);

const login = express.Router();

login.get("/user/:id", (req, res) => {

});

export default login;

