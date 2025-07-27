import express from "express";
import connectDB from "./src/backend/config/db";
import dotenv from "dotenv"

import productRoutes from "./src/backend/routes/products";
import invoiceRoutes from "./src/backend/routes/invoices";
import notificationRoutes from "./src/backend/routes/notifications";
import transactionRoutes from "./src/backend/routes/transactions"

const app = express();

dotenv.config()
const PORT = process.env.PORT || 3000
const MongoURI = process.env.MONGO_URI || ""

// Middleware
app.use(express.json());

// Routes
app.use("/api/", productRoutes);
app.use("/api/", invoiceRoutes);
app.use("/api/", notificationRoutes);
app.use("/api/", transactionRoutes)
app.use("/", express.static("src/frontend"));

// 404 fallback
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
const startServer = async () => {
  await connectDB(MongoURI);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
