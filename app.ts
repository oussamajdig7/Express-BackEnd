import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import router from "./routes/web.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// ------------------- Running API route ------------------
app.get("/", (req: Request, res: Response) => {
    res.send("API is running 🚀");
});
app.use('/',router);


// ---------------- Start the server ----------------
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
