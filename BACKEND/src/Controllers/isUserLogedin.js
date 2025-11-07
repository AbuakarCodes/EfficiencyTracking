import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { responseClass } from "../utils/responseClass.js"
import { User } from "../models/userSchema.model.js";
import { ErrorClass } from "../utils/ErrorClass.js";
import { clearCookies } from "../utils/COOKIES/AlingingCookies.js";              


const isLoggedin = async (req, res, next) => {

    const { accesssToken } = req.cookies
    try {
        const { id } = jwt.verify(accesssToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(id)
        if (!user) {
            clearCookies(res, "accesssToken", "refreshToken")
            res.status(404).json(new ErrorClass("User not found", 404))
        }

        return res.status(200).json(
            new responseClass("User is logged in", { user, isLoggedin: true }, 200)
        );
    } catch (error) {
        return res.status(401).json(
            new responseClass("User is not logged in", false, 401)
        );
    }

}
export { isLoggedin }