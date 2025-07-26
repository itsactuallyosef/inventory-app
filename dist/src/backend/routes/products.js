"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = __importDefault(require("../controller/productsController"));
const router = express_1.default.Router();
router.get("/products", productsController_1.default.getAllProducts);
router.post("/products", productsController_1.default.createNewProduct);
router.delete("/products/:id", productsController_1.default.deleteProduct);
exports.default = router;
