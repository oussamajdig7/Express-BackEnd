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
    const token=jwt.sign({user:user},process.env.JWT_CLE as string,{
        expiresIn:"1h"
    })
    return res.status(200).json({"message":"user connecter",'_token':token})
}

export const createVendeurs = (async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.vendeur.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });
    res.json(data);
});

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
    const { id } = req.params;
    const vendeur = await prisma.vendeur.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.status(201).json({ massage: "bien supprimer", data: vendeur })
})

export const updateVendeurs = (async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const vendeur = await prisma.vendeur.update({
        data: {
            name, email, password
        },
        where: {
            id: parseInt(id)
        }
    })
    res.status(201).json({ massage: "bien modifier", data: vendeur })
})