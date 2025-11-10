import { Todo } from "../../models/todos.model.js";
import { ErrorClass } from "../../utils/ErrorClass.js"
import { responseClass } from "../../utils/responseClass.js";
import { getSpecificDayEfficiency } from "../../utils/SpecificTimeEfficiencies/specificDayEfficiency.js";
import { getSpecificMonthEfficiency } from "../../utils/SpecificTimeEfficiencies/specificMonthEfficiency.js";
import { getSpecificYearEfficiency } from "../../utils/SpecificTimeEfficiencies/specificYearEfficiency.js";

export const ComparePeriodEffiencyController = async (req, res) => {
    try {
        const { id: user_id } = req.user;
        const { periodType, periodValue } = req.body
        const { periodA, periodB } = periodValue

        let periodValueQuery = {};
        switch (periodType.toLowerCase()) {
            case "month": {
                const { year: PeriodA_year, month: PeriodA_month } = periodA;
                const { year: PeriodB_year, month: PeriodB_month } = periodB;

                periodValueQuery = {
                    $or: [
                        { year: Number(PeriodA_year), month: Number(PeriodA_month) },
                        { year: Number(PeriodB_year), month: Number(PeriodB_month) },
                    ]
                }
                break;
            }
            case "year": {
                periodValueQuery = { "year": { "$in": [Number(periodA), Number(periodB)] } }
                break;
            }
            case "day": {
                periodValueQuery = {
                    "date_id": { "$in": [periodA, periodB] }
                }
                break;
            }
        }

        const query = {
            user_id,
            ...periodValueQuery
        };
        const todo = await Todo.find(query);

        if (todo.length == 0)
            return res.status(404).json(new ErrorClass("Goal or Todo document not found", 404));



        if (periodType.toLowerCase() === "month") {
            let result = {};

            // periodA and periodB are objects like { year: 2025, month: 2 }
            const periodAtodo = todo.filter(
                t => t.year === Number(periodA.year) && t.month === Number(periodA.month)
            );
            const periodBtodo = todo.filter(
                t => t.year === Number(periodB.year) && t.month === Number(periodB.month)
            );

            const periodA_result = getSpecificMonthEfficiency(periodA, periodAtodo);
            const periodB_result = getSpecificMonthEfficiency(periodB, periodBtodo);

            result = {
                periodA: {
                    XAxis: periodA_result?.Xaxis_Lables || 0,
                    Yaxis: periodA_result?.efficiencyData || 0
                },
                periodB: {
                    XAxis: periodB_result?.Xaxis_Lables || 0,
                    Yaxis: periodB_result?.efficiencyData || 0
                }
            };

            return res.status(200).json(new responseClass("Efficiency of those months", result, 200));
        } else if (periodType.toLowerCase() === "year") {
            let result = {};

            const periodAtodo = todo.filter(t => t.year === Number(periodA));
            const periodBtodo = todo.filter(t => t.year === Number(periodB));

            const periodA_result = getSpecificYearEfficiency(periodA, periodAtodo);
            const periodB_result = getSpecificYearEfficiency(periodB, periodBtodo);

            result = {
                periodA: {
                    XAxis: periodA_result?.Xaxis_Lables || 0,
                    Yaxis: periodA_result?.efficiencyData
                },
                periodB: {
                    XAxis: periodB_result?.Xaxis_Lables || 0,
                    Yaxis: periodB_result?.efficiencyData || 0
                }
            };

            return res.status(200).json(new responseClass("Efficiency of those years", result, 200));
        }

        else if (periodType.toLowerCase() === "day") {
            let result = {}

            const periodAtodo = todo.filter(t => t.date_id === periodA);
            const periodBtodo = todo.filter(t => t.date_id === periodB);

            const periodA_result = getSpecificDayEfficiency(periodA, periodAtodo)
            const periodB_result = getSpecificDayEfficiency(periodB, periodBtodo)

            result = {
                periodA: {
                    XAxis: periodA_result?.Xaxis_Lables || 0,
                    Yaxis: periodA_result?.efficiencyData
                },
                periodB: {
                    XAxis: periodB_result?.Xaxis_Lables || 0,
                    Yaxis: periodB_result?.efficiencyData || 0
                }
            }

            return res.status(200).json(new responseClass("Efficiency of those days", result, 200))
        }

    } catch (error) {
        res.status(501).json(new ErrorClass(error.message || "Something went wrong", 501));

    }
}