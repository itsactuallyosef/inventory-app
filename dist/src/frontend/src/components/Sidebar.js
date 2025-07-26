"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Sidebar_module_css_1 = __importDefault(require("../style/Sidebar.module.css"));
const fa_1 = require("react-icons/fa");
function Sidebar() {
    return (<div className={Sidebar_module_css_1.default.sidebar}>
      <react_router_dom_1.Link to="/" className={Sidebar_module_css_1.default["sidebar-icon"]}>
        <fa_1.FaBox />
      </react_router_dom_1.Link>
      <react_router_dom_1.Link to="/invoices" className={Sidebar_module_css_1.default["sidebar-icon"]}>
        <fa_1.FaChartBar />
      </react_router_dom_1.Link>
      <react_router_dom_1.Link to="/notifications" className={Sidebar_module_css_1.default["sidebar-icon"]}>
        <fa_1.FaBell />
      </react_router_dom_1.Link>
    </div>);
}
exports.default = Sidebar;
