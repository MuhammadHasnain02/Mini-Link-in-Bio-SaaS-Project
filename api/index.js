import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

// app.use(cors({ 
//   origin: process.env.FRONTEND_URL || true, // 'true' reflects the request origin, allowing all for now while keeping credentials supported
//   credentials: true 
// }));

app.use(cors({ 
  origin: process.env.FRONTEND_URL || true, // 'true' reflects the request origin, allowing all for now while keeping credentials supported
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/links", linkRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

connectDB(); // Connect to MongoDB at startup (Mongoose buffers queries)

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Only start the server if not in a serverless environment (e.g. Vercel)
// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// Export the app instance for Vercel's serverless functions
export default app;
