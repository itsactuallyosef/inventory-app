"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_module_css_1 = __importDefault(require("../style/Button.module.css"));
function Button({ children, onClick }) {
    return <button className={Button_module_css_1.default.actionButton} onClick={onClick}>{children}</button>;
}
exports.default = Button;
