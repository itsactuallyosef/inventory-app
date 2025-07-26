"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_module_css_1 = __importDefault(require("../style/Layout.module.css"));
const TopBar_1 = __importDefault(require("./TopBar"));
const Sidebar_1 = __importDefault(require("./Sidebar"));
function Layout({ children, title }) {
    return (<div>
      <Sidebar_1.default />
      <div className={Layout_module_css_1.default.container} style={{ marginLeft: "60px" }}>
        <TopBar_1.default>{title}</TopBar_1.default>
        {children}
      </div>
    </div>);
}
exports.default = Layout;
