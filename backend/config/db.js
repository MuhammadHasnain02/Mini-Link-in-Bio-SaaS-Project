import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log("Using cached MongoDB connection");
    return cachedConnection;
  }
  
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }
  
  try {
    console.log("Establishing new MongoDB connection...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    cachedConnection = conn.connection;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return cachedConnection;
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    throw err; // DO NOT use process.exit(1) on Vercel, it kills the serverless container permanently!
  }
};

export default connectDB;
