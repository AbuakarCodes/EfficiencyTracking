import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"

import { User } from "../models/userSchema.model.js";
import { ErrorClass } from "../utils/ErrorClass.js"


const auth = async (req, res, next) => {
    const { accesssToken, refreshToken } = req.cookies
   
    try {
        const decodedAccess = jwt.verify(accesssToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = decodedAccess
        return next()

    } catch (AccessError) {
        if (AccessError.name === "JsonWebTokenError") {
            res.status(401).json(new ErrorClass("User unathorize", 401))
        }
        else if (AccessError.name === "TokenExpiredError") {

            try {
                const DecodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

                const user = await User.findById(DecodedRefresh.id);
                if (!user) return res.status(404).json(new ErrorClass("User not found", 404))

                // Generate new tokens
                const newAccessToken = user.generateAccessToken();
                const newRefreshToken = user.generateRefreshToken();
                // Set new cookies
                res.cookie("accesssToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
                res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

                req.user = DecodedRefresh
                return next()

            } catch (refreshError) {
                res.status(401).json(new ErrorClass("Login Again", 401))
            }
        }

    }

}
export { auth }