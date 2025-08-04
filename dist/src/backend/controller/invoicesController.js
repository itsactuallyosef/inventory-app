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
exports.getInvoiceByID = exports.createNewInvoice = exports.getAllInvoices = void 0;
const invoiceSchema_1 = __importDefault(require("../models/invoiceSchema"));
const productSchema_1 = __importDefault(require("../models/productSchema"));
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
// POST /invoices
const createNewInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Invoice must contain at least one item" });
        }
        let total = 0;
        for (const item of items) {
            let { productId, quantity } = item;
            if (!productId || quantity <= 0) {
                return res.status(400).json({ error: "Invalid item in invoice" });
            }
            // ensure ObjectId
            const product = yield productSchema_1.default.findById(productId);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            if (product.quantity < quantity) {
                return res.status(400).json({ error: `Not enough stock for ${product.name}` });
            }
            product.quantity -= quantity;
            yield product.save();
            total += quantity * product.price;
            item.price = product.price; // attach price at time of sale
            // create low stock notification if needed
            if (product.quantity <= product.reorderPoint) {
                yield notificationSchema_1.default.create({
                    message: `${product.name} is low on stock.`,
                    type: "warning"
                });
            }
        }
        const invoice = yield invoiceSchema_1.default.create({
            items,
            total
        });
        res.status(201).json(invoice);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.createNewInvoice = createNewInvoice;
const getInvoiceByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoice = yield invoiceSchema_1.default.findById(req.params.id);
        if (!invoice)
            return res.status(404).json({ error: "Invoice not found" });
        res.json(invoice);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch invoice" });
    }
});
exports.getInvoiceByID = getInvoiceByID;
