import express from "express";
import {createCategories, getCategories, deleteCategories, updateCategories} from "../controllers/categoriesController.js";
import {createProduits, getProduits, deleteProduits, updateProduits} from "../controllers/produitsController.js";
import {createVendeurs, getVendeurs, deleteVendeurs, updateVendeurs, auth} from "../controllers/vendeursController.js";
import {createClients, getClients, deleteClients, updateClients} from "../controllers/clientsController.js";
import {createventes, getventes, deleteventes, updateventes} from "../controllers/ventesController.js";

import { authorisationJWT } from "../controllers/middlewareController.js";

const router = express.Router();
// ------------------- categories routes ------------------
router.post('/categories/create',createCategories)
router.get('/categories/get',getCategories)
router.delete('/categories/delete/:id',deleteCategories)
router.put('/categories/update/:id',updateCategories)
// ------------------- produits routes ------------------
router.post('/produits/create',createProduits)
router.get('/produits/get',getProduits)
router.delete('/produits/delete/:id',deleteProduits)
router.put('/produits/update/:id',updateProduits)
// ------------------- vendeurs routes ------------------   
router.post('/vendeurs/create',createVendeurs)
router.get('/vendeurs/get',getVendeurs)
router.delete('/vendeurs/delete/:id',deleteVendeurs)
router.put('/vendeurs/update/:id',updateVendeurs)
// ------------------- ventes routes ------------------
router.post('/ventes/create',createventes)
router.get('/ventes/get',getventes)
router.delete('/ventes/delete/:id',deleteventes)
router.put('/ventes/update/:id',updateventes)
// ------------------- clients routes ------------------
router.post('/clients/create',createClients)
router.get('/clients/get',getClients)
router.delete('/clients/delete/:id',deleteClients)
router.put('/clients/update/:id',updateClients)
// ------------------- auth routes ------------------
router.post('/login',auth)
router.get('/middleware', authorisationJWT, (req, res) => {
  res.json({
    message: "middleware khdam ✅",
    user: req.user
  });
});
export default router;