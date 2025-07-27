import { Response, Request } from "express"

import Transaction from "../models/transactionSchema"
import Product from "../models/productSchema"
import Notification from "../models/notificationSchema"

// GET /transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).populate("productId", "name")
    res.json(transactions)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" })
  }
}

// POST /transactions
export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { productId, name, type, quantity, reason } = req.body

    if (!productId || !type || !quantity || quantity <= 0 || !name) {
      return res.status(400).json({ error: "Invalid input" })
    }

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ error: "Product not found" })

    switch (type){
        case "in":
            product.quantity += quantity;
            break;
        case "out":
            if (product.quantity < quantity) {
                return res.status(400).json({ error: "Not enough stock" })
            }
            product.quantity -= quantity;
            break;
        default:
            return res.status(400).json({ error: "Invalid transaction type" });
    }

    await product.save()

    // Create transaction log
    const transaction = await Transaction.create({
      productId,
      name, 
      type,
      quantity,
      reason
    })

    // Auto-warning if low stock
    if (product.quantity <= product.reorderPoint) {
      await Notification.create({
        message: `${product.name} is low on stock.`,
        type: "warning"
      })
    }

    res.status(201).json(transaction)

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Transaction failed" })
  }
}
