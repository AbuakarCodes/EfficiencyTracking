import { User } from "../../models/userSchema.model.js";
import { Todo } from "../../models/todos.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";

export const changeStatusTodo = async (req, res, next) => {
    try {
        const { date_id, goal_id, newState } = req.body;
        const { id } = req.user;

        const user = await User.findById(id);
        if (!user) return res.status(404).json(new ErrorClass("User not found", 404));

        const updatedTodo = await Todo.findOneAndUpdate(
            { user_id: id, date_id, "goals.todo_id": goal_id },
            { $set: { "goals.$.isCompleted": newState } },
            { new: true }
        );

        if (!updatedTodo)
            return res
                .status(404)
                .json(new ErrorClass("Todo or goal not found", 404));

        //  Recalculate totals and efficiency
        const totalTodoTasks = updatedTodo.goals.length;
        const completedTodoTasks = updatedTodo.goals.filter(
            (goal) => goal.isCompleted
        ).length;

        // Avoid division by zero
        const dayEfficiency =
            totalTodoTasks > 0
                ? Math.round((completedTodoTasks / totalTodoTasks) * 100)
                : 0;

        //  Update calculated fields
        updatedTodo.totalTodoTasks = totalTodoTasks;
        updatedTodo.completedTodoTasks = completedTodoTasks;
        updatedTodo.dayEfficiency = dayEfficiency;

        await updatedTodo.save();

        if (!updatedTodo) return res.status(404).json(new ErrorClass("Todo or goal not found", 404));

        res.status(200).json(new responseClass("Goal completion state toggled", updatedTodo, 200))

    } catch (error) {
        console.log(error.message);
        res.status(501).json(new ErrorClass(error?.message || "Something went wrong", 501));
    }
};
