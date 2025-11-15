import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/userSchema.model.js"
import { clearCookies } from "../utils/COOKIES/AlingingCookies.js"
import { ErrorClass } from "../utils/ErrorClass.js"
import { responseClass } from "../utils/responseClass.js"

async function deleteUser(req, res, next) {
    try {


        const { email, Password } = req.body;

        if (!req.user) {
            return res.status(404).json(new ErrorClass("User not Found", 404));
        }

        const { id } = req.user;
        if (!id) {
            return res.status(404).json(new ErrorClass("User identity not found", 404));
        }

        if (id === process?.env?.TEST_ACCOUNT_EMAIL || process?.env?.TEST_ACCOUNT_ID) {
            return res.status(400).json(new ErrorClass("Sorry, you cannot delete the Test account", 400))
        }

        const user = await User.findOne({ _id: id, email });
        if (!user) {
            return res.status(404).json(new ErrorClass("Email does not belong to this user", 404));
        }

        const isCorrectPass = await user.checkPassword(Password);
        if (!isCorrectPass) {
            return res.status(401).json(new ErrorClass("Password is incorrect", 401));
        }

        await User.findByIdAndDelete(id);

        clearCookies(res, "accessToken", "refreshToken");

        return res
            .status(200)
            .json(new responseClass("Account deleted successfully", [], 200));

    } catch (error) {
        return res
            .status(500)
            .json(new ErrorClass(error?.message || "Something went wrong", 500));
    }

}


export { deleteUser }