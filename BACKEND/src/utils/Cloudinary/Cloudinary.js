import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function cloudinary_FileUplod(localPath) {
  try {
    if (!localPath) return null;

    const response = await cloudinary.uploader.upload(localPath, { resource_type: 'auto' });

    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    } else {
      console.warn("Local temp file not found, skipping deletion:", localPath);
    }

    return response;
  } catch (error) {
    console.error("Error uploading or deleting file:", error?.message);
    return null;
  }
}

export { cloudinary_FileUplod };
