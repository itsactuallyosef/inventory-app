import { Response, Request } from "express"
import Notification from "../models/notification"

const getAllNotification = async (req: Request, res: Response) => {
    try {
        const notification = await Notification.find().sort({ createdAt: -1 })
        res.send(notification)
    } catch (error) {
        console.error("Error fetching notifications:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

const removeNotification = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const deleted = await Notification.findByIdAndDelete(id);

        if (!deleted) {
        return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const createNewNotification = async (req: Request, res: Response) => {
     const { date, message } = req.body;
    const notification = new Notification({date, message})
    await notification.save();
    res.status(201).json(notification);
}

export default {removeNotification, getAllNotification, createNewNotification}