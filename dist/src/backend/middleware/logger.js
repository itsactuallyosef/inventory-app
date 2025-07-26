"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}
exports.default = logger;
