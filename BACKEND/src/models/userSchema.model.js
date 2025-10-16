import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

userSchema.methods.generateAccessToken = function () {
  const payload = { id: this._id, email: this.email }
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" })
  this.accessToken = token  
  return token
}

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  const payload = { id: this._id, email: this.email }
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "90d" })
  this.refreshToken = token   
  return token
}

// Check Password
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await hash(this.password, 10)
})

export const User = mongoose.model("User", userSchema);
