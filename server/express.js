import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

import { authRoutes, userRoutes } from "./routes";
import { errorMiddleware } from "./middlewares";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error Handler
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

export default app;
