//db
import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const DB_CONNECT = process.env.DB_CONNECT;

mongoose.connect(DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log("Connected to db!");
});

//server
import express from "express";

const server = express();
const PORT = 3000;

server.use(express.json());

server.set("view engine", "ejs");

server.use("/static", express.static("public"));

server.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});