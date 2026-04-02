import { prisma } from '../lib/prisma.js';
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from 'process';
import dotenv from 'dotenv';
dotenv.config();

export const auth = async (req:Request,res:Response)=>{
    const {email,password}=req.body
    const user=await prisma.vendeur.findUnique({
        where:{  email  }
    })
    if(!user){
        return res.status(404).json({"message":"email non valide"})
    }
    const ispassword=await bcrypt.compare(password,user.password);
    if(!ispassword){
        return res.status(401).json({"message":"password non valide"})
    }
    const token = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_CLE as string,
  { expiresIn: "1h" }
);

return res.status(200).json({
  message: "user connecter",
  token: token 
});
}

export const createVendeurs = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // 1️⃣ check ila email kayn
    const existingUser = await prisma.vendeur.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "Email deja utilise" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await prisma.vendeur.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });

    res.status(201).json({ message: "User cree avec succes", data });
};

export const getVendeurs = (async (req: Request, res: Response) => {
    try {
        const vendeurs = await prisma.vendeur.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    createdAt: true,
                }
            }
        );
        res.json(vendeurs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching vendeurs" });
    }
});

export const deleteVendeurs = (async (req: Request, res: Response) => {
    const id = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (!id) {
        return res.status(400).json({ message: "id invalide" });
    }
    const vendeur = await prisma.vendeur.delete({
        where: {
            id
        }
    })
    res.status(201).json({ massage: "bien supprimer", data: vendeur })
})

export const updateVendeurs = (async (req: Request, res: Response) => {
    const id = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    if (!id) {
        return res.status(400).json({ message: "id invalide" });
    }
    const { name, email, password } = req.body;
    const vendeur = await prisma.vendeur.update({
        data: {
            name, email, password
        },
        where: {
            id
        }
    })
    res.status(201).json({ massage: "bien modifier", data: vendeur })
})
