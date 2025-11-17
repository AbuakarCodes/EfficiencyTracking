import mongoose from "mongoose";

async function dbConnection() {
  try {
    const response = await mongoose.connect(process.env?.DB_URL);
    return "✅ MongoDB connected successfully"
  } catch (error) {
    process.exit(1)
  }
}

export { dbConnection }; 
