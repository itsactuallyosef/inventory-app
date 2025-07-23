import express from "express";
import notificationController from "../controller/notificationController";

const router = express.Router();

router.get("/notifications", notificationController.getAllNotification)
router.post("/notifications", notificationController.createNewNotification)
router.delete("/notifications/:id", notificationController.removeNotification)

export default router