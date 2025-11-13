// got it 
import { Todo } from "../../models/todos.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";

export const DeleteTodo = async (req, res, next) => {
    try {
        const { date_id, goal_id } = req.body;
        const { id: user_id } = req.user;

        let Date_id = date_id

        if (!Array.isArray(date_id)) Date_id = [date_id]


        for (const date of Date_id) {
            // Step 1: Find and update in a single go (remove goal)
            const updatedTodo = await Todo.findOneAndUpdate(
                { user_id, date_id: date },
                { $pull: { goals: { todo_id: goal_id } } },
                { new: true }
            );

            // Step 2: Handle not found
            if (!updatedTodo || updatedTodo.length === 0)
                return res.status(404).json(new ErrorClass("Goal or Todo document not found", 404));

            // Step 3: Recalculate counts and efficiency
            const totalTodoTasks = updatedTodo.goals.length;
            const completedTodoTasks = updatedTodo.goals.filter(
                (g) => g.isCompleted
            ).length;
            const dayEfficiency =
                totalTodoTasks > 0
                    ? Math.round((completedTodoTasks / totalTodoTasks) * 100)
                    : 0;

            // Step 4: Update document fields (recalculate values)
            updatedTodo.totalTodoTasks = totalTodoTasks;
            updatedTodo.completedTodoTasks = completedTodoTasks;
            updatedTodo.dayEfficiency = dayEfficiency;

            await updatedTodo.save();


        }
        // Step 5: Return updated document
        res.status(200).json(new responseClass("Goal deleted and efficiency recalculated successfully", [], 200));
    } catch (error) {
        console.log(error.message)
        res.status(501).json(new ErrorClass(error.message || "Something went wrong", 501));
    }
};
