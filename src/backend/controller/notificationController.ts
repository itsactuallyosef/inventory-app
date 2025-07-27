import Notification from "../models/notificationSchema"
import { Request, Response } from "express"

// GET /notifications
export const getAllNotification = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 })
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" })
  }
}

// POST /notifications
export const createNewNotification = async (req: Request, res: Response) => {
  try {
    const { message, type } = req.body

    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }

    const notification = new Notification({
      message,
      type: type || "info"
    })

    await notification.save()
    res.status(201).json(notification)
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" })
  }
}

// DELETE /notifications/:id
export const removeNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id)

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" })
    }

    res.json({ message: "Notification deleted", notification })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notification" })
  }
}
