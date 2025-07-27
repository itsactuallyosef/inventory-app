"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_1 = require("../controller/notificationController");
const router = express_1.default.Router();
router.get("/notifications", notificationController_1.getAllNotification);
router.post("/notifications", notificationController_1.createNewNotification);
router.delete("/notifications/:id", notificationController_1.removeNotification);
exports.default = router;
