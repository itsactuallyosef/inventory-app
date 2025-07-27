// models/Transaction.js
import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  date: {type: String, default: () => new Date().toISOString()},
  type: { type: String, enum: ["in", "out"], required: true },
  name: {type: String, required: true},
  quantity: { type: Number, required: true },
  reason: { type: String, default: "manual" }, // e.g. "invoice", "restock"
}, { timestamps: true })

export default mongoose.model("Transaction", transactionSchema)
