"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const invoicesController_1 = require("../controller/invoicesController");
const router = express_1.default.Router();
router.get("/invoices", invoicesController_1.getAllInvoices);
router.post("/invoices", invoicesController_1.createNewInvoice);
router.get("/invoices/:id", invoicesController_1.getInvoiceByID);
exports.default = router;
