import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { responseClass } from "../utils/responseClass.js"
import { ErrorClass } from "../utils/ErrorClass.js";


const isLoggedin = async (req, res, next) => {
    const { accesssToken } = req.cookies
    try {
        jwt.verify(accesssToken, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json(new responseClass("user is logged in", true, 200))
    } catch (error) {
        return res.status(500).json(new ErrorClass("user is not logged in", 500))
    }
}
export { isLoggedin }