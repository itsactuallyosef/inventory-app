// models/Product.js
import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  reorderPoint: { type: Number, default: 10 }, // optional
  category: { type: String }, // optional
  supplier: { type: String }, // optional
}, { timestamps: true })

export default mongoose.model("Product", productSchema)
