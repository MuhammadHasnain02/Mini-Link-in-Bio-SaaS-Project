import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
  if (!process.env.JWT_SECRET) throw new Error("CRITICAL: JWT_SECRET is undefined.");
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId) => {
  if (!process.env.JWT_REFRESH_SECRET) throw new Error("CRITICAL: JWT_REFRESH_SECRET is undefined.");
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
