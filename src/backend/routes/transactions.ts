import express from "express";
import { addTransaction, getAllTransactions } from "../controller/transactionController"

const router = express.Router();

router.get("/transactions", getAllTransactions)
router.post("/transactions", addTransaction)

export default router