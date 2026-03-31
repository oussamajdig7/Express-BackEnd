import express from "express";
import {createCategories, getCategories, deleteCategories, updateCategories} from "../controllers/categoriesController.js";
import {createProduits, getProduits, deleteProduits, updateProduits} from "../controllers/produitsController.js";
import {createVendeurs, getVendeurs, deleteVendeurs, updateVendeurs} from "../controllers/vendeursController.js";

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

export default router;