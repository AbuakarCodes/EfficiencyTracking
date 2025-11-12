import express from "express"
import { specificDateTodos } from "../Controllers/TodoControllers/specificDateTodos.js"
import { auth } from "../middleware/Auth.middleware.js"
import { changeStatusTodo } from "../Controllers/TodoControllers/changeStatusTodo.js"
import { DeleteTodo } from "../Controllers/TodoControllers/deleteTodo.js"
import { add_UpdateTodos } from "../Controllers/TodoControllers/add_UpdateTodo.js"
import { add_MultipleTodos } from "../Controllers/TodoControllers/addMultipleTodos.js"
import { settedTodoDates } from "../Controllers/TodoControllers/settedTodosDate.js"
const TodoRoute = express.Router()

TodoRoute.post("/add_UpdateTodos", auth, add_UpdateTodos)
TodoRoute.post("/specificDateTodos", auth, specificDateTodos)
TodoRoute.post("/changeStatusTodo", auth, changeStatusTodo)
TodoRoute.post("/DeleteTodo", auth, DeleteTodo)
TodoRoute.post("/add_MultipleTodos", auth, add_MultipleTodos)
TodoRoute.get("/settedTodoDates",auth, settedTodoDates)


export { TodoRoute }