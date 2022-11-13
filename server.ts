/** @format */

import express, { NextFunction, Request, Response } from "express";
import { config as dotenv } from "dotenv";
import { connectDB } from "./src/config/db.config";
import logger from "./src/config/logger";
import cors from "cors";

const { join } = require('path');
const app = express();
app.use(express.json());
app.use(cors());
app.use('/static', express.static(join(__dirname, 'uploads')));

connectDB();

const NAMESPACE = "Server";

dotenv();

// Routers
import authRouter from "./src/routers/auth.router";
import userRouter from "./src/routers/users.router";
import productRouter from "./src/routers/product.router";

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(NAMESPACE, `Server running in port --> ${PORT}`)
})
