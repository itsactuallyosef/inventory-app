import express from "express";
import { createNewProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/productsController";

const router = express.Router();

router.get("/products", getAllProducts)
router.post("/products", createNewProduct)
router.delete("/products/:id", deleteProduct)
router.put("/products/:id", updateProduct)

export default router