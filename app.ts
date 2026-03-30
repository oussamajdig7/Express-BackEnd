import express from "express";
import type { Request, Response } from "express";
import {prisma} from "./lib/prisma.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// ------------------- Running API route ------------------
app.get("/", (req: Request, res: Response) => {
    res.send("API is running 🚀");
});

// ------------------- Users routes ------------------
app.post("/users",async(req: Request, res: Response) => {
    const {nom,prenom,email,password,datedenaissance} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
        data:{
            nom,
            prenom,
            email,
            password: hashedPassword,
            datedenaissance: new Date(String(datedenaissance)),
        },
    });
    res.json(data);
});

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany(
            {select : {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                datedenaissance: true,
            }}
        ); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ------------------- Posts routes ------------------
app.post("/posts", async (req: Request, res: Response) =>{
    const {title, content, published, authorId} = req.body;
    const data = await prisma.post.create({
        data:{
            title,
            content,
            published,
            author : {connect: { id: Number(authorId)}},
        },
    });
        res.json(data);
});

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany(
            {select : {
                id: true,
                title: true,
                content: true,
                published: true,
                author: true,
            }}
        ); 
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});

// ---------------- Start the server ----------------
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});