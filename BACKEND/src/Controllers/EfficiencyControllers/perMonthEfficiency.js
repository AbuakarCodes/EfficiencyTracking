import { Todo } from "../../models/todos.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";
import { getSpecificMonthEfficiency } from "../../utils/specificMonthEfficiency.js";

export const monthEfficiencyController = async (req, res, next) => {
    try {
        const { periodType, periodValue } = req.body;
        const { id: user_id } = req.user;

        let periodValueQuery = {};
        if (periodType.toLowerCase() === "month") {
            const [year, month] = periodValue.split("/");
            periodValueQuery = { year, month };
        }
        // else if (periodType.toLowerCase() === "month") {
        //     periodValueQuery = { month: periodValue };
        // } else if (periodType.toLowerCase() === "day") {
        //     periodValueQuery = { day: periodValue };
        // }

        const query = {
            user_id,
            ...periodValueQuery,
        };
        const todo = await Todo.find(query);
        if (todo.length == 0)
            return res.status(404).json(new ErrorClass("Goal or Todo document not found", 404));


        if (periodType.toLowerCase() == "month") {
            const result = getSpecificMonthEfficiency(periodValueQuery, todo)
            return res.status(200).json(new responseClass("Efficiency of that month", result, 200))
        }

        // console.log(todo);





    } catch (error) {
        console.log("DeleteTodo error:", error.message);
        res.status(501).json(new ErrorClass(error.message || "Something went wrong", 501));
    }
};
