import mongoose from "mongoose";
import "dotenv/config"

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected ✅");
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}   

export default connectDB;
