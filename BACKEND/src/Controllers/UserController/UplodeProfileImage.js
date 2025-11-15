import { User } from "../../models/userSchema.model.js";
import { cloudinary_FileUplod } from "../../utils/Cloudinary/Cloudinary.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";

export const UplodeProfileImage = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (!id) return res.status(401).json(new ErrorClass("Unauthorized", 401));

    const profileImageFile = req.files?.ProfileImage[0]?.path
    if (!profileImageFile) {
      return res.status(400).json(new ErrorClass("No image file provided", 400));
    }

    const CloudinaryResponse = await cloudinary_FileUplod(profileImageFile);
    if (!CloudinaryResponse?.url) {
      return res.status(500).json(new ErrorClass("Failed to upload image", 500));
    }

    const user = await User.findByIdAndUpdate(
      id,
      { ProfileImage: CloudinaryResponse?.url || "" },
      { new: true }
    );
    
    if (!user) return res.status(404).json(new ErrorClass("User not found", 404));

    return res.status(200).json(
      new responseClass("Profile image uploaded successfully", { link: CloudinaryResponse || "didin't get the response" }, 200)
    );
  } catch (error) {
    return res.status(500).json(new ErrorClass(error?.message || "Something went wrong", 500));
  }
};






