import mongoose from "mongoose";

const connectDB = async (URI: string) => {
    try {
        await mongoose.connect(URI);
        console.log("✅ MongoDB connected");
    } catch (err){
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    }
}

export default connectDB