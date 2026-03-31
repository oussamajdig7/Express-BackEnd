import {prisma} from '../lib/prisma.js';
import type {Request, Response } from "express";

export const createCategories = (async (req: Request, res: Response) => {
    const {name,coleur} = req.body;
    const data = await prisma.categorie.create({
        data:{
            name,
            coleur
        },
    });
    res.json(data);
});

export const getCategories = (async (req: Request, res: Response) => {
    try {
        const categories = await prisma.categorie.findMany(
            {select : {
                id: true,
                name: true,
                coleur: true,
            }}
        ); 
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching categories" });
    }
});

export const deleteCategories = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const categories = await prisma.categorie.delete({
        where: {
            id: parseInt(id)
        }
    })
      res.status(201).json({massage:"bien supprimer",data:categories})
})

export const updateCategories = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, coleur} = req.body;
    const categories = await prisma.categorie.update({
        data: {
            name,coleur
        },
        where:{
            id:parseInt(id)
        }
    })
      res.status(201).json({massage:"bien modifier",data:categories})
})