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

export const createNewInvoice = async (req: Request, res: Response) => {
  try {
    const { items } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invoice must contain at least one item" })
    }

    let total = 0
    const session = await Product.startSession()
    session.startTransaction()

    try {
      // Loop through items and update product stock
      for (const item of items) {
        const { productId, quantity } = item
        if (!productId || quantity <= 0) throw new Error("Invalid item")

        const product = await Product.findById(productId).session(session)
        if (!product) throw new Error("Product not found")

        if (product.quantity < quantity) {
          throw new Error(`Not enough stock for ${product.name}`)
        }

        product.quantity -= quantity
        total += quantity * product.price
        await product.save()

        // Create out-transaction
        await Transaction.create([{
          productId,
          type: "out",
          quantity,
          reason: "invoice"
        }], { session })

        // Low stock notification
        if (product.quantity <= product.reorderPoint) {
          await Notification.create([{
            message: `${product.name} is low on stock.`,
            type: "warning"
          }], { session })
        }

        // Attach price at time of sale
        item.price = product.price
      }

      // Save invoice
      const invoice = await Invoice.create([{
        items,
        total
      }], { session })

      await session.commitTransaction()
      session.endSession()

      res.status(201).json(invoice[0])

    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      res.status(400).json({ error: err || "Invoice creation failed" })
    }

  } catch (err) {
    res.status(500).json({ error: "Server error" })
  }
}
