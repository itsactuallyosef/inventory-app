import express from "express";

import invoicesController from "../controller/invoicesController";

const router = express.Router();

router.get("/invoices", invoicesController.getAllInvoices)
router.post("/invoices", invoicesController.createNewInvoice)

export default router
