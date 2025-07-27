import express from "express";
import {getAllNotification, createNewNotification, removeNotification} from "../controller/notificationController";

const router = express.Router();

router.get("/notifications", getAllNotification);
router.post("/notifications", createNewNotification);
router.delete("/notifications/:id", removeNotification);

export default router