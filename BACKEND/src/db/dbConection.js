import mongoose from "mongoose";

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connected successfully");
    return "✅ MongoDB connected successfully"
  } catch (error) {
    return "❌ MongoDB connection failed:"
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); 
  }
}

export { dbConnection }; 
