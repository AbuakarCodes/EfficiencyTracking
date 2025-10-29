import { Todo } from "../../models/todos.model.js";
import { User } from "../../models/userSchema.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";
export const DeleteTodo = async (req, res, next) => {
    try {
        const { date_id, goal_id } = req.body;
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) return res.status(404).json(new ErrorClass("User not found", 404));

        const result = await Todo.updateOne(
            { user_id: id, date_id },
            { $pull: { goals: { todo_id: goal_id } } }
        );

        if (result.modifiedCount === 0) return res.status(404).json(new ErrorClass("Goal not found", 404));
        res.status(200).json(new responseClass("Goal deleted successfully", result, 200));

    } catch (error) {
        console.log(error?.message || "Something went wrong in DeleteTodo controller");
        res.status(501).json(new ErrorClass(error?.message || "Something went wrong", 501));
    }
};
