import { Request, Response } from "express"
import Product from "../models/product";

const getAllProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
}

const createNewProduct = async (req: Request, res: Response) => {
    const { name, price, quantity } = req.body;
    const product = new Product({name, price, quantity})
    await product.save();
    res.status(201).json(product);
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const deleted = await Product.findByIdAndDelete(id);


        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default {getAllProducts, createNewProduct, deleteProduct}