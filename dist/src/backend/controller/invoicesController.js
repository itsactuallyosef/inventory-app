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
exports.createNewInvoice = exports.getAllInvoices = void 0;
const invoiceSchema_1 = __importDefault(require("../models/invoiceSchema"));
const productSchema_1 = __importDefault(require("../models/productSchema"));
const transactionSchema_1 = __importDefault(require("../models/transactionSchema"));
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
// GET /invoices
const getAllInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield invoiceSchema_1.default.find().sort({ createdAt: -1 }).populate("items.productId", "name");
        res.json(invoices);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch invoices" });
    }
});
exports.getAllInvoices = getAllInvoices;
const createNewInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Invoice must contain at least one item" });
        }
        let total = 0;
        const session = yield productSchema_1.default.startSession();
        session.startTransaction();
        try {
            // Loop through items and update product stock
            for (const item of items) {
                const { productId, quantity } = item;
                if (!productId || quantity <= 0)
                    throw new Error("Invalid item");
                const product = yield productSchema_1.default.findById(productId).session(session);
                if (!product)
                    throw new Error("Product not found");
                if (product.quantity < quantity) {
                    throw new Error(`Not enough stock for ${product.name}`);
                }
                product.quantity -= quantity;
                total += quantity * product.price;
                yield product.save();
                // Create out-transaction
                yield transactionSchema_1.default.create([{
                        productId,
                        type: "out",
                        quantity,
                        reason: "invoice"
                    }], { session });
                // Low stock notification
                if (product.quantity <= product.reorderPoint) {
                    yield notificationSchema_1.default.create([{
                            message: `${product.name} is low on stock.`,
                            type: "warning"
                        }], { session });
                }
                // Attach price at time of sale
                item.price = product.price;
            }
            // Save invoice
            const invoice = yield invoiceSchema_1.default.create([{
                    items,
                    total
                }], { session });
            yield session.commitTransaction();
            session.endSession();
            res.status(201).json(invoice[0]);
        }
        catch (err) {
            yield session.abortTransaction();
            session.endSession();
            res.status(400).json({ error: err || "Invoice creation failed" });
        }
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.createNewInvoice = createNewInvoice;
