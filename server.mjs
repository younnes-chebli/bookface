import dbConnect from "./database/config.mjs";
import express from "express";
import signup from "./routes/signup.mjs";
import login from "./routes/login.mjs";
import mongoose from "mongoose";
import authenticateToken from "./middleware/authenticateToken.mjs";
import cookieParser from "cookie-parser";

const server = express();
const PORT = 3000;

dbConnect();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use("/static", express.static("public"));
server.use(signup);
server.use(login);

server.set("view engine", "ejs");

server.get("/login", (req, res) => {
    res.render("login");
});

server.get("/signup", (req, res) => {
    res.render("signup");
});

server.get("/profile", authenticateToken, (req, res) => {
    res.render("profile", { username: req.user.username });
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!");
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});