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
const react_1 = require("react");
const Invoices_module_css_1 = __importDefault(require("../style/Invoices.module.css"));
const invoices_1 = require("../api/invoices");
const products_1 = require("../api/products");
function Invoices() {
    const [invoices, setInvoices] = (0, react_1.useState)([]);
    const [error, setError] = (0, react_1.useState)("");
    const [openIds, setOpenIds] = (0, react_1.useState)({});
    (0, react_1.useEffect)(() => {
        const fetchInvoicesWithProducts = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchedInvoices = yield (0, invoices_1.getInvoices)();
                const productCache = {};
                const resolvedInvoices = yield Promise.all(fetchedInvoices.map((invoice) => __awaiter(this, void 0, void 0, function* () {
                    const resolvedItems = yield Promise.all(invoice.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                        const id = item._id;
                        if (!productCache[id]) {
                            try {
                                const product = yield (0, products_1.getProductById)(id);
                                productCache[id] = product;
                            }
                            catch (err) {
                                console.error(`Failed to fetch product ${id}`, err);
                                return Object.assign(Object.assign({}, item), { product: null });
                            }
                        }
                        return Object.assign(Object.assign({}, item), { product: productCache[id] });
                    })));
                    return Object.assign(Object.assign({}, invoice), { items: resolvedItems });
                })));
                setInvoices(resolvedInvoices);
            }
            catch (err) {
                setError(err.message || "Failed to fetch invoices");
            }
        });
        fetchInvoicesWithProducts();
    }, []);
    const toggleOpen = (id) => {
        setOpenIds((prev) => (Object.assign(Object.assign({}, prev), { [id]: !prev[id] })));
    };
    return (<div className={Invoices_module_css_1.default.container}>
      {error && <p className={Invoices_module_css_1.default.error}>{error}</p>}

      {invoices.map((invoice) => {
            const isOpen = openIds[invoice._id] || false;
            return (<div key={invoice._id} className={Invoices_module_css_1.default.invoice} style={{ marginBottom: "20px" }}>
            <div className={Invoices_module_css_1.default.header} onClick={() => toggleOpen(invoice._id)} style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    background: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "4px",
                    marginBottom: "8px",
                }}>
              {isOpen ? "▼" : "►"} Date:{" "}
              {new Date(invoice.date).toLocaleString()}
            </div>

            {isOpen && (<div className={Invoices_module_css_1.default.items}>
                {invoice.items.map((item, idx) => {
                        var _a;
                        const product = item.product;
                        return (<div key={idx} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "6px 12px",
                                borderBottom: "1px solid #eee",
                            }}>
                      <span style={{ flex: 3 }}>
                        {(product === null || product === void 0 ? void 0 : product.name) || "Unknown"}
                      </span>
                      <span style={{ flex: 1, textAlign: "center" }}>
                        Qty: {item.quantity}
                      </span>
                      <span style={{ flex: 1, textAlign: "center" }}>
                        Unit: {(_a = product === null || product === void 0 ? void 0 : product.price) !== null && _a !== void 0 ? _a : "N/A"}
                      </span>
                      <span style={{ flex: 1, textAlign: "right" }}>
                        Total:{" "}
                        {typeof (product === null || product === void 0 ? void 0 : product.price) === "number"
                                ? product.price * item.quantity
                                : "N/A"}
                      </span>
                    </div>);
                    })}
              </div>)}
          </div>);
        })}
    </div>);
}
exports.default = Invoices;
