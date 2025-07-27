"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Product.js
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number, required: true },
    reorderPoint: { type: Number, default: 10 },
    category: { type: String },
    supplier: { type: String }, // optional
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);
