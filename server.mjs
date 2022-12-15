import dbConnect from "./database/config.mjs";
import express from "express";
import signup from "./routes/signup.mjs";
import login from "./routes/login.mjs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authenticateToken from "./middleware/authenticateToken.mjs";

const server = express();
const PORT = 3000;

dbConnect();

server.use(express.json());

server.use(bodyParser.urlencoded({ extended: true }));

server.use("/static", express.static("public"));

server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.render("index");
});

server.get("/signup", (req, res) => {
    res.render("signup");
});

server.get("/profile/:username", authenticateToken, (req, res) => {
    const username = req.params.username;
    res.render("profile", { username });
});

server.use(signup);

server.use(login);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!");
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});