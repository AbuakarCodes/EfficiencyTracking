import { User } from "../models/userSchema.model.js"
import { setCookies } from "../utils/COOKIES/AlingingCookies.js"
import { ErrorClass } from "../utils/ErrorClass.js"
import { responseClass } from "../utils/responseClass.js"

const register = async (req, res, next) => {

    const { name, email, password } = req.body
    if (!email || !password)
        return res.status(404).json(new ErrorClass("Enter all credentials", 404))
    try {
        const isUserRegestered = await User.findOne({ email })
        if (isUserRegestered) return res.status(409).json(new ErrorClass("User already exist", 409))

        const user = await User.create({ name, email, password })
        const AccessToken = user.generateAccessToken()
        const RefreshToken = user.generateRefreshToken()
        setCookies(res, "accesssToken", AccessToken, "refreshToken", RefreshToken)
        
        res.status(200).json(new responseClass("User has created", {}, 200))
    } catch (error) {
        res.status(404).json(new ErrorClass(error.message, 404))
    }
}

export { register }   