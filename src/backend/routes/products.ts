import express from "express";
import productsController from "../controller/productsController";

const router = express.Router();

router.get("/products", productsController.getAllProducts)
router.post("/products", productsController.createNewProduct)
router.delete("/products/:id", productsController.deleteProduct)

export default router