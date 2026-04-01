import jwt from "jsonwebtoken"
import process from "process";
import type { Request, Response, NextFunction } from "express";


declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const authorisationJWT = (req:Request,res:Response,next:NextFunction)=>{
    const header=req.headers.authorization;
    if(!header){
        return res.status(401).json({"message":"authorisation missing"})
    }
    const token=header.split(" ")[1];
 
    if(!token){
        return res.status(401).json({"message":"token missing"})
    }
 
      try {
        const decode=jwt.verify(token,process.env.JWT_CLE!)
        req.user=decode
        next()
      } catch (error) {
        return res.status(401).json({"message":"token invalide"})
      }
   
 
}