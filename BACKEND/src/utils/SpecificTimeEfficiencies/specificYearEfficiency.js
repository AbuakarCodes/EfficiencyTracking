import { getSpecificMonthEfficiency } from "./specificMonthEfficiency.js";
import dayjs from "dayjs"
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];




export function getSpecificYearEfficiency(periodValue, todo) {
    // no need for +1 as furthur we'are dealing with zero index
    const month_of_that_year = dayjs().month() + 1
    const currentYear = dayjs().year()
    const isCurrentYear = Number(currentYear) === Number(periodValue?.year)

    const result = {
        Year_id: periodValue,
        elementLength: isCurrentYear ? month_of_that_year : 12,
        Xaxis_Lables: months.filter((e, idx) => {
            if (idx <= month_of_that_year - 1) {
                return e
            }
        }),
        efficiencyData: [],
        avrageEfficiency: 0
    };

    let shateredMonths = [...new Set(todo.map(m => m.month))].sort((a, b) => Number(a) - Number(b));
    let todoMonths = Array(isCurrentYear ? month_of_that_year : 12).fill(0)
    shateredMonths.forEach((element) => {
        if (element <= todoMonths.length)
            todoMonths[element - 1] = element
    })
    result.efficiencyData = todoMonths.map((m) => {
        if (m > 0) {
            const { monthEfficiency } = getSpecificMonthEfficiency({ year: periodValue, month: m }, todo)
            return Number(monthEfficiency.toFixed(2))
        } else return 0
    })

    if (result.efficiencyData.length > 0) {
        result.avrageEfficiency = (result.efficiencyData.reduce((sum, val) => sum + val, 0) / result.efficiencyData.length).toFixed(2)
    } else result.avrageEfficiency = 0;

    return result;
}
