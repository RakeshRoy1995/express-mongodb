"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_config_1 = require("./src/config/db.config");
const logger_1 = __importDefault(require("./src/config/logger"));
const cors_1 = __importDefault(require("cors"));
const { join } = require('path');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/static', express_1.default.static(join(__dirname, 'uploads')));
(0, db_config_1.connectDB)();
const NAMESPACE = "Server";
(0, dotenv_1.config)();
// Routers
const auth_router_1 = __importDefault(require("./src/routers/auth.router"));
const users_router_1 = __importDefault(require("./src/routers/users.router"));
const product_router_1 = __importDefault(require("./src/routers/product.router"));
app.use("/api/auth", auth_router_1.default);
app.use("/api/users", users_router_1.default);
app.use("/api/products", product_router_1.default);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger_1.default.info(NAMESPACE, `Server running in port --> ${PORT}`);
});
