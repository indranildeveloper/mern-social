import mongoose from "mongoose";
import { config } from "../config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(
      `MongoDB Connected: ${conn.connections[0].host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Database Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
