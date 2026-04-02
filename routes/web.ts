import express from "express";
import { 
  createCategories, getCategories, deleteCategories, updateCategories 
} from "../controllers/categoriesController.js";

import { 
  createProduits, getProduits, deleteProduits, updateProduits 
} from "../controllers/produitsController.js";

import { 
  createVendeurs, getVendeurs, deleteVendeurs, updateVendeurs, auth 
} from "../controllers/vendeursController.js";

import { 
  createClients, getClients, deleteClients, updateClients 
} from "../controllers/clientsController.js";

import { 
  createventes, getventes, deleteventes, updateventes 
} from "../controllers/ventesController.js";

import { authorisationJWT } from "../controllers/middlewareController.js";

const router = express.Router();

// ------------------- CATEGORIES ------------------
router.post('/categories/create', createCategories);
router.get('/categories/get', getCategories);
router.put('/categories/update/:id', updateCategories);
router.delete('/categories/delete/:id', deleteCategories);

// ------------------- PRODUITS ------------------
router.post('/produits/create', createProduits);
router.get('/produits/get', getProduits);
router.put('/produits/update/:id', updateProduits);
router.delete('/produits/delete/:id', deleteProduits);

// ------------------- VENDEURS ------------------
router.post('/vendeurs/create', createVendeurs);
router.get('/vendeurs/get', getVendeurs);
router.put('/vendeurs/update/:id', updateVendeurs);
router.delete('/vendeurs/delete/:id', deleteVendeurs);

// ------------------- CLIENTS ------------------
router.post('/clients/create', createClients);
router.get('/clients/get', getClients);
router.put('/clients/update/:id', updateClients);
router.delete('/clients/delete/:id', deleteClients);

// ------------------- VENTES ------------------
router.post('/ventes/create', createventes);
router.get('/ventes/get', getventes);
router.put('/ventes/update/:id', updateventes);
router.delete('/ventes/delete/:id', deleteventes);

// ------------------- AUTH ------------------
router.post('/login', auth);

// ------------------- Middleware Test ------------------
router.get('/middleware', authorisationJWT, (req, res) => {
  res.json({
    message: "middleware khdam ✅",
    user: req.user
  });
});

export default router;