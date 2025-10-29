import { Todo } from "../../models/todos.model.js"
import { User } from "../../models/userSchema.model.js"
import { ErrorClass } from "../../utils/ErrorClass.js"
import { responseClass } from "../../utils/responseClass.js"

export const specificDateTodos = async (req, res, next) => {
    try {
        const { date_id } = req.body
        const { id } = req.user

        const user = await User.findById(id)
        if (!user) return res.status(404).json(new ErrorClass("User not found", 404))

        const todo = await Todo.findOne({ date_id, user_id: id })
        if (!todo) return res.status(404).json(new ErrorClass("no todos found for given date", 404))
            
        res.status(200).json(new responseClass("todos for given date", todo, 200))

    } catch (error) {
        res.status(501).json(new ErrorClass(error.message, 501))
    }
}