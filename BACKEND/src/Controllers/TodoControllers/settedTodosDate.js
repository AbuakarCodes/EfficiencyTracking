import { Todo } from "../../models/todos.model.js"
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";

export const settedTodoDates = async (req, res) => {
    try {
        const { id: user_id } = req.user;
        const todo = await Todo.find({ user_id })
        console.log(todo)
        if (!todo || todo.length === 0)
            return res.status(404).json(new ErrorClass("todos not found", 404));

        let Date_ids = todo.filter(t => t.goals.length !== 0).map(t => t.date_id)
        res.status(200).json(new responseClass("date id's", Date_ids, 200));
    } catch (error) {
        res.status(501).json(new ErrorClass(error.message || "Something went wrong", 501));
    }
}