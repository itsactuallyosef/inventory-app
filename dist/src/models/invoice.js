"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/invoice.ts
const mongoose_1 = __importDefault(require("mongoose"));
const invoiceSchema = new mongoose_1.default.Schema({
    date: { type: Date, default: Date.now },
    items: [{
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        }]
});
exports.default = mongoose_1.default.model('Invoice', invoiceSchema);
