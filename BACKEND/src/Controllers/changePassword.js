import { User } from "../models/userSchema.model.js"
import { clearCookies } from "../utils/COOKIES/AlingingCookies.js"
import { ErrorClass } from "../utils/ErrorClass.js"
import { responseClass } from "../utils/responseClass.js"

async function changePassword(req, res, next) {
    try {
        const { currentPassword, newPassword, confirmPasword } = req.body

        if (newPassword !== confirmPasword) return res.status(401).json(new ErrorClass("Password is not matched", 401))

        if (!req.user) return res.status(404).json(new ErrorClass("Usernot Found", 404))

        const { id } = req.user
        if (!id) return res.status(404).json(new ErrorClass("User identity not found", 404))

        const user = await User.findById(id);
        if (!user) return res.status(404).json(new ErrorClass("User not found", 404))

        // Checking Password
        const isCurrentPassTrue = await user.checkPassword(currentPassword)
        if (!isCurrentPassTrue) return res.status(401).json(new ErrorClass("Incorrect Password", 401))

        // Updating password 
        user.password = newPassword;
        await user.save();

        return res.status(200).json(new responseClass("Password changed sucessfully", [{passwordUpdatedTime:user.updatedAt}], 200))

    } catch (error) {
        return res.status(500).json(new ErrorClass("Something not found", 500))
    }
}

export { changePassword }