"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoicesController_1 = __importDefault(require("../controller/invoicesController"));
const router = express_1.default.Router();
router.get("/api/invoices", invoicesController_1.default.getAllInvoices);
router.post("/api/invoices", invoicesController_1.default.createNewInvoice);
exports.default = router;
