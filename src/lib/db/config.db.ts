import mongoose from "mongoose";

export const connectDB = async () => {
  const DB_URI = process.env.MONGO_URI as string;
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error((error as Error).message);
    mongoose.disconnect();
    process.exit(1);
  }
};
