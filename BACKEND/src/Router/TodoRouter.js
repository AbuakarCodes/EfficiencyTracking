import express from "express"
import { specificDateTodos } from "../Controllers/TodoControllers/specificDateTodos.js"
import { auth } from "../middleware/Auth.middleware.js"
import { add_UpdateTodos } from "../Controllers/TodoControllers/add_updateTodo.js"
import { changeStatusTodo } from "../Controllers/TodoControllers/changeStatusTodo.js"
import { DeleteTodo } from "../Controllers/TodoControllers/deleteTodo.js"
const TodoRoute = express.Router()

TodoRoute.post("/add_UpdateTodos", auth, add_UpdateTodos)
TodoRoute.post("/specificDateTodos", auth, specificDateTodos)
TodoRoute.post("/changeStatusTodo", auth, changeStatusTodo)
TodoRoute.post("/DeleteTodo", auth, DeleteTodo)



export { TodoRoute }