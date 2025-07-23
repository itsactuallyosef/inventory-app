import mongoose from "mongoose";

    const notificationSchema = new mongoose.Schema({
        date: { type: Date, default: Date.now },
        message: { type: String, required: true},
    })

export default mongoose.model("Notification", notificationSchema)