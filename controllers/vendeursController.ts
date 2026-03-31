import { prisma } from '../lib/prisma.js';
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

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