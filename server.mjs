import dbConnect from "./database/config.mjs";
import express from "express";

const server = express();
const PORT = 3000;

dbConnect();

server.use(express.json());

server.set("view engine", "ejs");

server.use("/static", express.static("public"));

server.get("/", (req, res) => {
    res.render("index");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});