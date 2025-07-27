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
exports.updateProduct = exports.deleteProduct = exports.createNewProduct = exports.getAllProducts = void 0;
const productSchema_1 = __importDefault(require("../models/productSchema"));
// GET /products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productSchema_1.default.find().sort({ createdAt: -1 });
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
exports.getAllProducts = getAllProducts;
// POST /products
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, quantity, price, reorderPoint, category, supplier } = req.body;
        if (!name || price == null) {
            return res.status(400).json({ error: "Name and price are required" });
        }
        const product = new productSchema_1.default({
            name,
            quantity: quantity | 0,
            price,
            reorderPoint: reorderPoint || 10,
            category,
            supplier
        });
        yield product.save();
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
exports.createNewProduct = createNewProduct;
// Delete /products/:id
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productSchema_1.default.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted", product });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete product" });
    }
});
exports.deleteProduct = deleteProduct;
// Put /products/:id
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const newFields = req.body;
        const product = yield productSchema_1.default.findByIdAndUpdate(id, newFields, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;
