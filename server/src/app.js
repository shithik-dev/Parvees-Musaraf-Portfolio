import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import contactRoutes from "./routes/contact.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

const allowedOrigin = process.env.CLIENT_URL || true;

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Basic protection against repeated form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      "Too many contact attempts. Please wait a few minutes and try again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Parvees portfolio API is running.",
  });
});

app.use("/api/contact", contactLimiter, contactRoutes);

app.use(errorHandler);

export default app;