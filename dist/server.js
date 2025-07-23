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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./src/api/config/db"));
const products_1 = __importDefault(require("./src/api/routes/products"));
const invoices_1 = __importDefault(require("./src/api/routes/invoices"));
const notifications_1 = __importDefault(require("./src/api/routes/notifications"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api", products_1.default);
app.use("/api", invoices_1.default);
app.use("/api", notifications_1.default);
// 404 fallback
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
// Start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
startServer();
