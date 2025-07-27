import { Request, Response } from "express"
import Product from "../models/productSchema"

// GET /products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" })
  }
}

// POST /products
export const createNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, quantity, price, reorderPoint, category, supplier } = req.body

    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required" })
    }


    const product = new Product({
      name,
      quantity: quantity | 0,
      price,
      reorderPoint: reorderPoint || 10,
      category,
      supplier
    })

    await product.save()

    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" })
  }
}

// Delete /products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json({ message: "Product deleted", product })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product"})
  }
}

// Put /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const newFields = req.body;

    const product = await Product.findByIdAndUpdate(id, newFields, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    res.json(product)
  } catch (err) {
      res.status(500).json({ error: "Failed to update product" })
  }
}