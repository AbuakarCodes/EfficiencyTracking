import { User } from "../models/userSchema.model.js"
import { clearCookies } from "../utils/COOKIES/AlingingCookies.js"
import { ErrorClass } from "../utils/ErrorClass.js"
import { responseClass } from "../utils/responseClass.js"

async function deleteUser(req, res, next) {
    try {
        
        if (!req.user) return res.status(404).json(new ErrorClass("Usernot Found", 404))
        const { id } = req.user
        if (!id) return res.status(404).json(new ErrorClass("User identity not found", 404))

        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json(new ErrorClass("User not found", 404))

        clearCookies(res, "accesssToken", "refreshToken")
        return res.status(200).json(new responseClass("Account deleted sucessfully", [], 200))

    } catch (error) {
        return res.status(404).json(new ErrorClass("Something not found", 404))
    }
}


export { deleteUser }