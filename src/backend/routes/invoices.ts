import express from "express";

import {getAllInvoices, createNewInvoice} from "../controller/invoicesController";

const router = express.Router();

router.get("/invoices", getAllInvoices)
router.post("/invoices", createNewInvoice)

export default router
