import express from "express";
import DB from "./src/backend/config/db";
import productRoutes from "./src/backend/routes/products";
import invoiceRoutes from "./src/backend/routes/invoices";
import notificationRoutes from "./src/backend/routes/notifications";
import logger from "./src/backend/middleware/logger";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use(logger)

app.use("/api/", productRoutes);
app.use("/api/", invoiceRoutes);
app.use("/api/", notificationRoutes);
app.use("/", express.static("src/frontend"));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Start server
const startServer = async () => {
  await DB.connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
