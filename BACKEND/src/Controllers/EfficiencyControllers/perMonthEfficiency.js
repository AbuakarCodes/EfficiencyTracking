import { Todo } from "../../models/todos.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";
import { getSpecificMonthEfficiency } from "../../utils/SpecificTimeEfficiencies/specificMonthEfficiency.js";
import { getSpecificYearEfficiency } from "../../utils/SpecificTimeEfficiencies/specificYearEfficiency.js";
import { getSpecificDayEfficiency } from "../../utils/SpecificTimeEfficiencies/specificDayEfficiency.js"
export const monthEfficiencyController = async (req, res, next) => {
    try {
        const { periodType, periodValue } = req.body;
        const { id: user_id } = req.user;

        let periodValueQuery = {};
        switch (periodType.toLowerCase()) {
            case "month": {
                const [year, month] = periodValue.split("/");
                periodValueQuery = { year, month };
                break;
            }
            case "year": {
                periodValueQuery = { year: periodValue };
                break;
            }
            case "day": {
                periodValueQuery = { date_id: periodValue };
                break;
            }
        }

        const query = {
            user_id,
            ...periodValueQuery,
        };
        const todo = await Todo.find(query);
        if (todo.length == 0)
            return res.status(404).json(new ErrorClass("Goal or Todo document not found", 404));


        // Fetching and returning Values 
        if (periodType.toLowerCase() == "month") {
            const result = getSpecificMonthEfficiency(periodValueQuery, todo)
            return res.status(200).json(new responseClass("Efficiency of that month", result, 200))
        } else if (periodType.toLowerCase() == "year") {
            const result = getSpecificYearEfficiency(periodValueQuery, todo)
            return res.status(200).json(new responseClass("Efficiency of that year", result, 200))
        } else if (periodType.toLowerCase() == "day") {
            const result = getSpecificDayEfficiency(periodValueQuery, todo)
            return res.status(200).json(new responseClass("Efficiency of that day", result, 200))
        }

    } catch (error) {
        console.log("DeleteTodo error:", error.message);
        res.status(501).json(new ErrorClass(error.message || "Something went wrong", 501));
    }
};
