import {prisma} from '../lib/prisma.js';
import type { Request, Response } from "express";

export const createProduits = (async (req: Request, res: Response) => {
    const {name, description, price, IdCategorie} = req.body;
    const data = await prisma.produit.create({
        data:{
            name,
            description,
            price,
            categorie : {connect: {id: Number(IdCategorie)}}
        },
    });
    res.json(data);
});

export const getProduits = (async (req: Request, res: Response) => {
    try {
        const produits = await prisma.produit.findMany(
            {select : {
                id: true,
                name: true,
                description: true,
                price: true,
                categorie : {
                    select : {
                        id: true,
                        name: true,
                        coleur: true,
                    }
                }
            }}
        ); 
        res.json(produits);
    } catch (error) {
        res.status(500).json({ error: "Error fetching produits" });
    }
});

export const deleteProduits = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const produit = await prisma.produit.delete({
        where: {
            id: parseInt(id)
        }
    })
      res.status(201).json({massage:"bien supprimer",data:produit})
})

export const updateProduits = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, description, price} = req.body;
    const produits = await prisma.produit.update({
        data:{
            name,description,price
        },
        where:{
            id:parseInt(id)
        }
    })
      res.status(201).json({massage:"bien modifier",data:produits})
})