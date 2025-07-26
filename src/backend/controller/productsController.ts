import { Request, Response } from "express"
import Product from "../models/product";
import { deleteProductById } from "../util/util";

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
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductById(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted", product: deletedProduct });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default {getAllProducts, createNewProduct, deleteProduct}