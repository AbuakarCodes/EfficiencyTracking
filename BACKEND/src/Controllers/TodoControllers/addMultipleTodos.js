import dayjs from "dayjs";
import { Todo } from "../../models/todos.model.js";
import { User } from "../../models/userSchema.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";

export const add_MultipleTodos = async (req, res, next) => {
    try {
        const { date_id, goals } = req.body; // date_id = array of date strings like ["2025/10/30", "2025/10/31"]
        const { id } = req.user;

        if (!id || !Array.isArray(date_id) || date_id.length === 0 || !goals) {
            return res.status(400).json(new ErrorClass("Missing or invalid fields"));
        }

        const user = await User.findById(id);
        if (!user) return res.status(404).json(new ErrorClass("User not found"));

        const results = [];

        // loop through each date
        for (const date of date_id) {
            const parsedDate = dayjs(date, "YY/MM/DD");
            const year = parsedDate.year();
            const month = parsedDate.month() + 1; // month() is 0-based
            const day = parsedDate.date();

            const totalTodoTasks = goals.length;
            const completedTodoTasks = goals.filter(g => g.isCompleted).length;
            const dayEfficiency =
                totalTodoTasks === 0 ? 0 : (completedTodoTasks / totalTodoTasks) * 100;

            // Check if todo exists for that date
            const existingTodo = await Todo.findOne({ user_id: id, date_id: date });

            if (existingTodo) {
                // merge new goals with old goals (no duplicates by todo_id)
                const existingGoalIds = new Set(existingTodo.goals.map(g => g.todo_id));
                const mergedGoals = [
                    ...existingTodo.goals,
                    ...goals.filter(g => !existingGoalIds.has(g.todo_id)),
                ];

                const updatedTodo = await Todo.findOneAndUpdate(
                    { user_id: id, date_id: date },
                    {
                        $set: {
                            totalTodoTasks: mergedGoals.length,
                            completedTodoTasks: mergedGoals.filter(g => g.isCompleted).length,
                            dayEfficiency:
                                mergedGoals.length === 0
                                    ? 0
                                    : (mergedGoals.filter(g => g.isCompleted).length /
                                        mergedGoals.length) *
                                    100,
                            goals: mergedGoals,
                        },
                    },
                    { new: true }
                );

                results.push(updatedTodo);
            } else {
                // create new todo if not exists
                const newTodo = await Todo.create({
                    user_id: id,
                    date_id: date,
                    month,
                    year,
                    totalTodoTasks,
                    completedTodoTasks,
                    dayEfficiency,
                    goals,
                });

                results.push(newTodo);
            }
        }

        return res
            .status(200)
            .json(new responseClass("Todos processed successfully", results, 200));
    } catch (error) {
        console.error("Error in add_UpdateTodos:", error);
        return res
            .status(500)
            .json(new ErrorClass("Internal server error", 500, error.message));
    }
};
