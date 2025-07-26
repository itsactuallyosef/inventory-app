"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Notification_module_css_1 = __importDefault(require("../style/Notification.module.css"));
function Notification({ message, setMessage }) {
    (0, react_1.useEffect)(() => {
        if (!message)
            return;
        const timeout = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timeout);
    }, [message]);
    if (!message)
        return null;
    return <div className={Notification_module_css_1.default.toast}>{message}</div>;
}
exports.default = Notification;
