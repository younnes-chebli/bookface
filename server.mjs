import dbConnect from "./database/config.mjs";
import express from "express";
import signup from "./routes/signup.mjs";
import bodyParser from "body-parser";

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

server.use(signup);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});