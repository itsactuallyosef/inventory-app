"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Invoice.js
const mongoose_1 = __importDefault(require("mongoose"));
const invoiceSchema = new mongoose_1.default.Schema({
    items: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
            price: Number,
            name: String,
        }
    ],
    total: Number,
    date: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Invoice", invoiceSchema);
