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
const products_1 = require("../api/products");
const invoices_1 = require("../api/invoices");
const notifications_1 = require("../api/notifications");
const ProductTable_module_css_1 = __importDefault(require("../style/ProductTable.module.css"));
const Notification_1 = __importDefault(require("../components/Notification"));
const Button_1 = __importDefault(require("../components/Button"));
function Products() {
    const [products, setProducts] = (0, react_1.useState)([]);
    const [quantities, setQuantities] = (0, react_1.useState)({});
    const [error, setError] = (0, react_1.useState)("");
    const [toastMessage, setToastMessage] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        (0, products_1.getProducts)()
            .then((data) => {
            setProducts(data);
            const defaultQuantities = {};
            data.forEach((p) => (defaultQuantities[p._id] = 1));
            setQuantities(defaultQuantities);
        })
            .catch((err) => setError(err.message));
    }, []);
    const handleQuantityChange = (id, value) => {
        const num = parseInt(value);
        setQuantities((prev) => (Object.assign(Object.assign({}, prev), { [id]: isNaN(num) || num < 1 ? 1 : num })));
    };
    const handleSubmitInvoice = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const items = products
                .map((p) => ({
                _id: p._id,
                quantity: quantities[p._id] || 1,
            }))
                .filter((item) => item.quantity > 0);
            yield (0, invoices_1.addToInvoice)(items);
            // Optional: create notifications for low stock products
            for (const p of products) {
                const remaining = p.quantity - (quantities[p._id] || 1);
                if (remaining <= 3) {
                    yield (0, notifications_1.createNotification)(`Low stock: ${p.name} has ${remaining} left.`);
                }
            }
            setToastMessage("✅ Invoice submitted!");
            setError(""); // clear any previous errors
        }
        catch (err) {
            setError(err.message || "Failed to submit invoice.");
        }
    });
    return (<div className={ProductTable_module_css_1.default.container}>
       {/* toast notification */}
    <Notification_1.default message={toastMessage} setMessage={setToastMessage}/>
        
      {error && <p className={ProductTable_module_css_1.default.error}>{error}</p>}

      <table className={ProductTable_module_css_1.default.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (<tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>{p.price}</td>
              <td>
                <input className={ProductTable_module_css_1.default.quantityInput} type="number" min="0" value={quantities[p._id] || 0} onChange={(e) => handleQuantityChange(p._id, e.target.value)}/>
              </td>
            </tr>))}
        </tbody>
      </table>

      <Button_1.default onClick={handleSubmitInvoice}>Submit Invoice</Button_1.default>
    </div>);
}
exports.default = Products;
