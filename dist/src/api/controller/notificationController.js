"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_1 = __importDefault(require("../models/notification"));
const getAllNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notification_1.default.find().sort({ createdAt: -1 });
        res.send(notification);
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const removeNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deleted = yield notification_1.default.findByIdAndDelete(id);
    try {
        const deleted = yield notification_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
const createNewNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, message } = req.body;
    const notification = new notification_1.default({ date, message });
    yield notification.save();
    res.status(201).json(notification);
});
exports.default = { removeNotification, getAllNotification, createNewNotification };
