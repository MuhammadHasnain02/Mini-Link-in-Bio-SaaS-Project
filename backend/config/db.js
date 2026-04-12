import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
