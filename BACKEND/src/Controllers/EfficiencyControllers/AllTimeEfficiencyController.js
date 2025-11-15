import { Todo } from "../../models/todos.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js";
import { responseClass } from "../../utils/responseClass.js";
export const AllTimeEfficiency = async (req, res, next) => {
    try {
        let result = {
            Xaxis_Lables:[],
            elementLength: 0,
            efficiencyData: [],
            avrageEfficiency: 0,
        };
        const { id: user_id } = req.user;

        const todo = await Todo.find({ user_id });
        if (todo.length == 0)
            return res.status(200).json(new responseClass("no Todo Set yet", result, 200));

        const dayEfficiencies = todo.map(e => e?.dayEfficiency || 0)
        const avgEfficiency = dayEfficiencies.reduce((acc, val) => acc + val, 0) / dayEfficiencies.length;

        result = {
            Xaxis_Lables: Array.from({ length: dayEfficiencies?.length || 0 }, (_, i) => i + 1),
            elementLength: dayEfficiencies?.length || 0,
            efficiencyData: dayEfficiencies,
            avrageEfficiency: avgEfficiency,
        };

        res.status(200).json(new responseClass("All Time Efficeincy", result, 200))

    } catch (error) {
        console.log("DeleteTodo error:", error.message);
        res.status(501).json(new ErrorClass(error.message || "Something went wrong", 501));
    }
};
