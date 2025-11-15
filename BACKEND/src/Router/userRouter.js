import express from "express"
import { Login } from "../Controllers/login.js"
import { register } from "../Controllers/register.js"
import { logout } from "../Controllers/logOut.js"
import { auth } from "../middleware/Auth.middleware.js"
import { isLoggedin } from "../Controllers/isUserLogedin.js"
import { deleteUser } from "../Controllers/deleteUser.js"
import { changePassword } from "../Controllers/changePassword.js"
import { upload } from "../middleware/Multer.js"
import { UplodeProfileImage } from "../Controllers/UserController/UplodeProfileImage.js"

const Route = express.Router() 

Route.post("/register", register)
Route.post("/login", Login)
Route.get("/logout", auth, logout)
Route.get("/isloggedin", isLoggedin)
Route.post("/deleted", auth, deleteUser)
Route.post("/changePassword", auth, changePassword)
Route.post("/UplodeProfileImage", auth, upload.fields([{ name: "ProfileImage", maxCount: 1 }]), UplodeProfileImage)


export { Route }

