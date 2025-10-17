import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { responseClass } from "../utils/responseClass.js"


const isLoggedin = async (req, res, next) => {
     
    const { accesssToken } = req.cookies
    try {
        const { id } = jwt.verify(accesssToken, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json(
            new responseClass("User is logged in", { users_id: id, isLoggedin: true }, 200)
        );
    } catch (error) {
        return res.status(401).json(
            new responseClass("User is not logged in", false, 401)
        );
    }

}
export { isLoggedin }