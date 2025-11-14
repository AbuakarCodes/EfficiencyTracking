import express from "express"
import { specificDateTodos } from "../Controllers/TodoControllers/specificDateTodos.js"
import { auth } from "../middleware/Auth.middleware.js"
import { changeStatusTodo } from "../Controllers/TodoControllers/changeStatusTodo.js"
import { DeleteTodo } from "../Controllers/TodoControllers/deleteTodo.js"
import { add_UpdateTodos } from "../Controllers/TodoControllers/add_UpdateTodo.js"
import { add_MultipleTodos } from "../Controllers/TodoControllers/addMultipleTodos.js"
import { settedTodoDates } from "../Controllers/TodoControllers/settedTodosDate.js"
import { isDateValid } from "../middleware/isApiDate_Valid.js"
const TodoRoute = express.Router()

TodoRoute.post("/add_UpdateTodos", auth, isDateValid, add_UpdateTodos)
TodoRoute.post("/add_MultipleTodos", auth, isDateValid, add_MultipleTodos)
TodoRoute.post("/changeStatusTodo", auth, isDateValid, changeStatusTodo)
TodoRoute.post("/DeleteTodo", auth, isDateValid, DeleteTodo)
TodoRoute.post("/specificDateTodos", auth, isDateValid, specificDateTodos)

// no need for date validating middlewerw
TodoRoute.get("/settedTodoDates", auth, settedTodoDates)


export { TodoRoute }