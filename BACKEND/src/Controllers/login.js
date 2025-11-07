import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { ErrorClass } from "../utils/ErrorClass.js";
import { User } from "../models/userSchema.model.js";
import { responseClass } from "../utils/responseClass.js";
import { clearCookies, setCookies } from "../utils/COOKIES/AlingingCookies.js"

const Login = async (req, res, next) => {
    const { accesssToken, refreshToken } = req.cookies

    try {
        const { email, password, login_another_account } = req.body;
        if (!email || !password) return res.status(404).json(new ErrorClass("Email and password are required"));

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json(new ErrorClass("User not found", 404));

        const isCorrectPass = await user.checkPassword(password);
        if (!isCorrectPass) return res.status(401).json(new ErrorClass("Password is incorrect", 401));

        // 🔹 Case 1: No cookies (first login)
        if (!accesssToken || !refreshToken || login_another_account) {
            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            setCookies(res, "accesssToken", accessToken, "refreshToken", refreshToken)
            return res.status(200).json(new responseClass("User logged in (witout cookies)", user, 200));
        }

        // 🔹 Case 2: Cookies exist → validate tokens
        try {
            const verifiedToken = jwt.verify(req.cookies.accesssToken, process.env.ACCESS_TOKEN_SECRET);
            return res
                .status(200)
                .json(new responseClass("User logged in with valid access token", user, 200));
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                // Access token expired → try refresh token
                try {
                    jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);

                    // Refresh token valid → issue new tokens
                    const newAccessToken = user.generateAccessToken();
                    const newRefreshToken = user.generateRefreshToken();
                    setCookies(res, "accesssToken", newAccessToken, "refreshToken", newRefreshToken)

                    return res.status(200).json(new responseClass("New tokens issued", user, 200));
                }
                catch (refreshErr) {
                    if (refreshErr.name === "TokenExpiredError") {
                        clearCookies(res, "accesssToken", "refreshToken")
                        return res.status(401).json(new ErrorClass("Refresh token expired → please log in again"));
                    } else if (refreshErr.name === "JsonWebTokenError") {
                        clearCookies(res, "accesssToken", "refreshToken")
                        return res.status(401).json(new ErrorClass("Refresh token curepted → please log in again"));
                    }
                }
            }
            else if (err.name === "JsonWebTokenError") {
                // Token is corrupted → clear both cookies
                clearCookies(res, "accesssToken", "refreshToken")
                return res.status(401).json(new ErrorClass("Invalid access token, Log in again"));
            }
        }
    } catch (err) {   // comonent catch block 
        return res.status(400).json(new ErrorClass(err.message));
    }
};

export { Login };
