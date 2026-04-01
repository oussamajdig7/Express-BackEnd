import {prisma} from '../lib/prisma.js';
import type {Request, Response } from "express";

export const createventes = (async (req: Request, res: Response) => {
    const {idProduit, idClient, Qte, CordonnéGPS} = req.body;
    const data = await prisma.vente.create({
        data:{
            produit : {connect: {id: Number(idProduit)}},
            client : {connect: {id: Number(idClient)}},
            Qte : Number(Qte),
            CordonnéGPS : CordonnéGPS
        },
    });
    res.json(data);
});

export const getventes = (async (req: Request, res: Response) => {
    try {
        const ventes = await prisma.vente.findMany(
            {select : {
                id: true,
                produit: {
                    select : {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                    }
                },
                client: {
                    select : {
                        id: true,
                        name: true,
                        prenom: true,
                    }
                },
                Qte: true,
                CordonnéGPS: true
            }}
        );
        res.json(ventes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching ventes" });
    }
});

export const deleteventes = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const vente = await prisma.vente.delete({
        where: {
            id: parseInt(id)
        }
    })
      res.status(201).json({massage:"bien supprimer",data:vente})
})

export const updateventes = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const {Qte} = req.body;
    const vente = await prisma.vente.update({
        data:{
            Qte : Number(Qte)
        },
        where:{
            id:parseInt(id)
        }
    })
        res.status(201).json({massage:"bien modifier",data:vente})
})
