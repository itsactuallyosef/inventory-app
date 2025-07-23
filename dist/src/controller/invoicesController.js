"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invoice_1 = __importDefault(require("../models/invoice"));
const product_1 = __importDefault(require("../models/product"));
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoices = yield invoice_1.default.find();
    res.json(invoices);
});
const createNewInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Invalid invoice items." });
    }
    try {
        for (const item of items) {
            const product = yield product_1.default.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            if (product.quantity < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}. Available: ${product.quantity}`,
                });
            }
            product.quantity -= item.quantity;
            yield product.save();
            if (product.quantity <= 0) {
                console.log(`⚠️ Product "${product.name}" is out of stock.`);
            }
        }
        const newInvoice = yield invoice_1.default.create({ items });
        return res.status(201).json({ message: "Invoice created", invoice: newInvoice });
    }
    catch (error) {
        console.error("Error creating invoice:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = { getAllInvoices, createNewInvoice };
