import { clearCookies } from "../utils/COOKIES/AlingingCookies.js"
import { ErrorClass } from "../utils/ErrorClass.js"
import { responseClass } from "../utils/responseClass.js"
import { User } from "../models/userSchema.model.js"

const logout = async (req, res, next) => {

    try {
        const { id } = req.user
        const user = await User.findById(id)
        if (!user) return res.status(404).json(new ErrorClass("User not Found", 404))

        clearCookies(res, "accesssToken", "refreshToken")
        res.status(200).json(new responseClass("logout sucessfully", [], 200))
    } catch (error) {
        return res.status(500).json(new ErrorClass(error.message, 500))
    }

}

export { logout }