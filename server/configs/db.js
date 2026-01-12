import mongoose from 'mongoose';
import dotenv from 'dotenv';

const connectDB = async () => {
  dotenv.config();
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/car_rental`);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
export default connectDB;