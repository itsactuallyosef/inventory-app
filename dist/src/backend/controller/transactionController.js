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
exports.addTransaction = exports.getAllTransactions = void 0;
const transactionSchema_1 = __importDefault(require("../models/transactionSchema"));
const productSchema_1 = __importDefault(require("../models/productSchema"));
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
// GET /transactions
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transactionSchema_1.default.find().sort({ createdAt: -1 }).populate("productId", "name");
        res.json(transactions);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});
exports.getAllTransactions = getAllTransactions;
// POST /transactions
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, name, type, quantity, reason } = req.body;
        if (!productId || !type || !quantity || quantity <= 0 || !name) {
            return res.status(400).json({ error: "Invalid input" });
        }
        const product = yield productSchema_1.default.findById(productId);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        switch (type) {
            case "in":
                product.quantity += quantity;
                break;
            case "out":
                if (product.quantity < quantity) {
                    return res.status(400).json({ error: "Not enough stock" });
                }
                product.quantity -= quantity;
                break;
            default:
                return res.status(400).json({ error: "Invalid transaction type" });
        }
        yield product.save();
        // Create transaction log
        const transaction = yield transactionSchema_1.default.create({
            productId,
            name,
            type,
            quantity,
            reason
        });
        // Auto-warning if low stock
        if (product.quantity <= product.reorderPoint) {
            yield notificationSchema_1.default.create({
                message: `${product.name} is low on stock.`,
                type: "warning"
            });
        }
        res.status(201).json(transaction);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Transaction failed" });
    }
});
exports.addTransaction = addTransaction;
