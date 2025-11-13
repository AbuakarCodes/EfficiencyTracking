import dayjs from "dayjs"
import { Todo } from "../../models/todos.model.js";
import { User } from "../../models/userSchema.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";
import { Backend_isValidDate } from "../../utils/Backend_isValidDate.js";

export const add_UpdateTodos = async (req, res, next) => {
  try {
    const { date_id, goals } = req.body;
    const { id } = req.user;

    

    // console.log({ date_id, isDAte:Backend_isValidDate(date_id) })

    // if (!Backend_isValidDate(date_id)) return res.status(400).json(new ErrorClass("Date is not valid"))

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
          userEmail: user.email,
          totalTodoTasks,
          completedTodoTasks,
          dayEfficiency,
          goals,
        },
      },
      { new: true }
    );
    if (updatedTodo) {
      return res
        .status(200)
        .json(new responseClass("Todo updated successfully", updatedTodo?.goals|| [], 200));
    }

    const newTodo = await Todo.create({
      user_id: id,
      date_id,
      userEmail: user.email,
      month: dayjs(date_id).month() + 1,
      year: dayjs(date_id).year(),
      totalTodoTasks,
      completedTodoTasks,
      dayEfficiency,
      goals,
    });

    return res
      .status(201)
      .json(new responseClass("New Todo created successfully", newTodo?.goals|| [], 201));
  } catch (error) {
    console.log("Error in add_UpdateTodos:", error);
    return res
      .status(500)
      .json(new ErrorClass("Internal server error", 500, error.message));
  }
};
