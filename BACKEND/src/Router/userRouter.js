import express from "express"
import { Login } from "../Controllers/login.js"
import { register } from "../Controllers/register.js"
import { logout } from "../Controllers/logOut.js"
import { auth } from "../middleware/Auth.middleware.js"
import { isLoggedin } from "../Controllers/isUserLogedin.js"

const Route = express.Router()

Route.post("/register", register)
Route.post("/login", Login)
Route.get("/logout",auth, logout) 
Route.get("/isloggedin", isLoggedin)


export { Route }

