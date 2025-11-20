import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"

import { User } from "../models/userSchema.model.js";
import { ErrorClass } from "../utils/ErrorClass.js"


const auth = async (req, res, next) => {
    const { accesssToken, refreshToken } = req.cookies
    if (!accesssToken && !refreshToken) return res.status(401).json(new ErrorClass("User is not logged in", 401))

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
                setCookies(res, "accesssToken", newAccessToken, "refreshToken", newRefreshToken)
                req.user = DecodedRefresh
                return next()

            } catch (refreshError) {
                res.status(401).json(new ErrorClass("Login Again", 401))
            }
        }

    }

}
export { auth }