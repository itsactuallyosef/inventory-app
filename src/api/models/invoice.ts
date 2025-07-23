// src/models/invoice.ts
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
  }]
});

export default mongoose.model('Invoice', invoiceSchema);
