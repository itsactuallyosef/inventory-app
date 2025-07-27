// models/Invoice.js
import mongoose from "mongoose"

const invoiceSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number, // store price at the time of sale
      name: String,
    }
  ],
  total: Number,
}, { timestamps: true })

export default mongoose.model("Invoice", invoiceSchema)
