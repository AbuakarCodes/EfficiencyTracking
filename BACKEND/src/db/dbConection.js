import mongoose from "mongoose";

let isDB_connected = false
async function dbConnection() {
  try {
    await mongoose.connect(process.env?.DB_URL);
    return isDB_connected
    console.log("✅ MongoDB connected successfully")
    return isDB_connected
  } catch (error) {
    console.log("❌ Mongo DB failed to connect", error?.message)
    process.exit(1)
  }
}

export { dbConnection }; 
