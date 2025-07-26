"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TopBar_module_css_1 = __importDefault(require("../style/TopBar.module.css"));
function TopBar({ children }) {
    return (<div className={TopBar_module_css_1.default.topbar}>
            <h1>{children}</h1>
        </div>);
}
exports.default = TopBar;
