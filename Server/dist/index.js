import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import connectToDB from "./database.js";
import router from './Router/route.js';
// dotenv.config();
const app = express();
const port = 80;
app.use(express.json());
app.use(cors());
// app.use(morgon());
app.disable("x-powered-by");
app.get("/", (req, res) => {
    res.json("Server is running");
});
connectToDB();
app.use("/api", router);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
