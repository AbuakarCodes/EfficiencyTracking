import { clearCookies } from "../utils/COOKIES/AlingingCookies.js"
import { ErrorClass } from "../utils/ErrorClass.js"
import { responseClass } from "../utils/responseClass.js"


const logout = async (req, res, next) => {

    try {
        const { accesssToken, refreshToken } = req.cookies;

        if (accesssToken) invalidatedTokens.add(accesssToken);
        if (refreshToken) invalidatedTokens.add(refreshToken);

        clearCookies(res, "accesssToken", "refreshToken")
        res.status(200).json(new responseClass("logout sucessfully", true, 200))
    } catch (error) {
        return res.status(500).json(new ErrorClass(error.message, 500))
    }

}

export { logout }