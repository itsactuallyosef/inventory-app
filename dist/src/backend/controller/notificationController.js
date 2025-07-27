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
exports.removeNotification = exports.createNewNotification = exports.getAllNotification = void 0;
const notificationSchema_1 = __importDefault(require("../models/notificationSchema"));
// GET /notifications
const getAllNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notificationSchema_1.default.find().sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});
exports.getAllNotification = getAllNotification;
// POST /notifications
const createNewNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, type } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const notification = new notificationSchema_1.default({
            message,
            type: type || "info"
        });
        yield notification.save();
        res.status(201).json(notification);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create notification" });
    }
});
exports.createNewNotification = createNewNotification;
// DELETE /notifications/:id
const removeNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notification = yield notificationSchema_1.default.findByIdAndDelete(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.json({ message: "Notification deleted", notification });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete notification" });
    }
});
exports.removeNotification = removeNotification;
