import mongoose from "mongoose"
import Invoice from "../models/invoiceSchema"
import Product from "../models/productSchema"
import Transaction from "../models/transactionSchema"
import Notification from "../models/notificationSchema"
import { Request, Response } from "express"

// GET /invoices
export const getAllInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 }).populate("items.productId", "name")
    res.json(invoices)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch invoices" })
  }
}

// POST /invoices
export const createNewInvoice = async (req: Request, res: Response) => {
  try {
    const { items } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invoice must contain at least one item" })
    }

    let total = 0

    for (const item of items) {
      let { productId, quantity } = item
      if (!productId || quantity <= 0) {
        return res.status(400).json({ error: "Invalid item in invoice" })
      }

      // ensure ObjectId
      const product = await Product.findById(productId)
      if (!product) {
        return res.status(404).json({ error: "Product not found" })
      }

      if (product.quantity < quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.name}` })
      }

      product.quantity -= quantity
      await product.save()

      total += quantity * product.price
      item.price = product.price // attach price at time of sale

      // create low stock notification if needed
      if (product.quantity <= product.reorderPoint) {
        await Notification.create({
          message: `${product.name} is low on stock.`,
          type: "warning"
        })
      }
    }

    const invoice = await Invoice.create({
      items,
      total
    })

    res.status(201).json(invoice)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
}

export const getInvoiceByID = async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
};
