"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Button({ children, onClick }) {
    return <button onClick={onClick}>{children}</button>;
}
exports.default = Button;
