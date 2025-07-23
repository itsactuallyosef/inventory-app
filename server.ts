import express from "express";
import DB from "./src/api/config/db";
import productRoutes from "./src/api/routes/products";
import invoiceRoutes from "./src/api/routes/invoices";
import notificationRoutes from "./src/api/routes/notifications";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", productRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", notificationRoutes);
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
