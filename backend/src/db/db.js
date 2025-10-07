import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected`);
  } catch (err) {
    console.log(`Database connection failed`);
  }
};
export default connectDB;
