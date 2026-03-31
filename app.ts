import express from "express";
import type { Request, Response } from "express";
import {prisma} from "./lib/prisma.js";
import bcrypt from "bcrypt";
import router from "./routes/web.js";

const app = express();
app.use(express.json());
app.use('/',router)

// ------------------- Running API route ------------------
app.get("/", (req: Request, res: Response) => {
    res.send("API is running 🚀");
});

// ---------------- Start the server ----------------
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});