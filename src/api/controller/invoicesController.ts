import { Request, Response } from "express"
import Invoice from "../models/invoice"
import Product from "../models/product"


const getAllInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find()
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch invoices", error: err });
    }
};
const createNewInvoice = async (req: Request, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Invalid invoice items." });
  }

  try {
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.quantity}`,
        });
      }
      product.quantity -= item.quantity;
      await product.save();

      if (product.quantity <= 0) {
        console.log(`Product "${product.name}" is out of stock.`);
      }
    }

    const newInvoice = await Invoice.create({ items });

    return res.status(201).json({ message: "Invoice created", invoice: newInvoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { getAllInvoices, createNewInvoice }