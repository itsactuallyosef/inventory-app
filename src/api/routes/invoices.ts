import express from "express";

import invoicesController from "../controller/invoicesController";

const router = express.Router();

router.get("/api/invoices", invoicesController.getAllInvoices)
router.post("/api/invoices", invoicesController.createNewInvoice)

export default router
