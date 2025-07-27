"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Transaction.js
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
    date: { type: String, default: () => new Date().toISOString() },
    type: { type: String, enum: ["in", "out"], required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    reason: { type: String, default: "manual" }, // e.g. "invoice", "restock"
}, { timestamps: true });
exports.default = mongoose_1.default.model("Transaction", transactionSchema);
