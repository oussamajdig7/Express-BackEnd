import {prisma} from '../lib/prisma.js';
import type { Request, Response } from "express";

export const createClients = (async (req: Request, res: Response) => {
    const {name, prenom, idVendeur} = req.body;
    const data = await prisma.client.create({
        data:{
            name,
            prenom,
            vendeur : {connect: {id: Number(idVendeur)}}
        },
    });
    res.json(data);
});

export const getClients = (async (req: Request, res: Response) => {
    try {
        const clients = await prisma.client.findMany(
            {select : {
                id: true,
                name: true,
                prenom: true,
                vendeur: {
                    select : {
                        id: true,
                        name: true,
                        email: true,
                        password: true,
                    }
                }
            }}
        );
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch clients" });
    }
});

export const deleteClients = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const client = await prisma.client.delete({
        where: {
            id: parseInt(id)
        }
    })
      res.status(201).json({massage:"bien supprimer",data:client})
})

export const updateClients = (async (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, prenom} = req.body;
    const client = await prisma.client.update({
        data:{
            name,prenom
        },
        where:{
            id:parseInt(id)
        }
    })
      res.status(201).json({massage:"bien modifier",data:client})
})
