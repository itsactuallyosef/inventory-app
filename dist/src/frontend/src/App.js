"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Layout_1 = __importDefault(require("./components/Layout"));
const Products_1 = __importDefault(require("./pages/Products"));
const Invoices_1 = __importDefault(require("./pages/Invoices"));
// import Notifications from "./pages/Notifications";
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Layout_1.default title="Products"><Products_1.default /></Layout_1.default>}/>
        <react_router_dom_1.Route path="/invoices" element={<Layout_1.default title="Invoices"><Invoices_1.default /></Layout_1.default>}/>
        {/* <Route path="/notifications" element={<Layout title="Notifications"><Notifications /></Layout>} /> */}
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
