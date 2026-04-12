// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Local ke liye path check karega, Vercel par automatically process.env use karega
// dotenv.config(); 

// if (process.env.NODE_ENV !== 'production') {
//   dotenv.config({ path: path.join(__dirname, '.env') });
// }

// // import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import profileRoutes from "./routes/profileRoutes.js";
// import linkRoutes from "./routes/linkRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(cors({ 
//   origin: process.env.FRONTEND_URL || true,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/links", linkRoutes);

// app.get("/api/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// connectDB();

// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

// // Export the app instance for Vercel's serverless functions
// export default app;


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

app.use(cors({ 
  origin: process.env.FRONTEND_URL || true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Serverless Database Connection Middleware
// Guarantees DB is successfully mapped before executing any endpoint.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed over Serverless", error: error.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/links", linkRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// connectDB(); // Removed loose call as it's handled properly by the middleware

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
