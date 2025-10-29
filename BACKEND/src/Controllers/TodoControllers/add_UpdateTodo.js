import { Todo } from "../../models/todos.model.js";
import { User } from "../../models/userSchema.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";

export const add_UpdateTodos = async (req, res, next) => {
  try {
    const { date_id, month, year, goals } = req.body;
    const { id } = req.user;
    console.log("user_id", id)

    if (!id || !date_id || !goals) {
      return res.status(400).json(new ErrorClass("Missing required fields"));
    }

    const totalTodoTasks = goals.length;
    const completedTodoTasks = goals.filter(g => g.isCompleted).length;
    const dayEfficiency =
      totalTodoTasks === 0 ? 0 : (completedTodoTasks / totalTodoTasks) * 100;

    const user = await User.findById(id);
    if (!user) return res.status(404).json(new ErrorClass("User not found"));



    const updatedTodo = await Todo.findOneAndUpdate(
      { user_id: id, date_id },
      {
        $set: {
          totalTodoTasks,
          completedTodoTasks,
          dayEfficiency,
          goals,
        },
      },
      { new: true }
    );
    // console.log("updatedTodo", updatedTodo)
    if (updatedTodo) {
      return res
        .status(200)
        .json(new responseClass("Todo updated successfully", updatedTodo, 200));
    }

    console.log("creating a new Todo")
    const newTodo = await Todo.create({
      user_id: id,
      date_id,
      month,
      year,
      totalTodoTasks,
      completedTodoTasks,
      dayEfficiency,
      goals,
    });

    return res
      .status(201)
      .json(new responseClass("New Todo created successfully", newTodo, 201));
  } catch (error) {
    console.log("Error in add_UpdateTodos:", error);
    return res
      .status(500)
      .json(new ErrorClass("Internal server error", 500, error.message));
  }
};
