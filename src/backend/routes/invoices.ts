import express from "express";

import {getAllInvoices, createNewInvoice, getInvoiceByID} from "../controller/invoicesController";

const router = express.Router();

router.get("/invoices", getAllInvoices)
router.post("/invoices", createNewInvoice)
router.get("/invoices/:id", getInvoiceByID);

export default router
