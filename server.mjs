import dbConnect from "./database/config.mjs";
import express from "express";
import signup from "./routes/signup.mjs";
import login from "./routes/login.mjs";
import mongoose from "mongoose";
import authenticateToken from "./middleware/authenticateToken.mjs";
import cookieParser from "cookie-parser";
import getUserByEmail from "./database/queries/getUserByEmail.mjs";

const server = express();
const PORT = 3000;

dbConnect();

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.set("view engine", "ejs");
server.use("/static", express.static("public"));

server.use(signup);
server.use(login);

// server.get("/", (req, res) => {
//     if(!req.user) {
//         res.redirect("login");
//     }
//     res.redirect(`profile/${req.user.username}`);
// });

server.get("/login", (req, res) => {
    res.render("login");
});

server.get("/signup", (req, res) => {
    res.render("signup");
});

server.get("/profile/:username", authenticateToken, async(req, res) => {
    const user = await getUserByEmail(req.user.email);
    const username = user.username;
    const createdAt = user.profile.createdAt;
    res.render("profile", { username: username, createdAt: createdAt });
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB!");
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});