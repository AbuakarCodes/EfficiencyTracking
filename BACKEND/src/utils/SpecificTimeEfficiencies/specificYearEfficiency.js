import { getSpecificMonthEfficiency } from "./specificMonthEfficiency.js";


export function getSpecificYearEfficiency(periodValue, todo) {

    const result = {
        Year_id: periodValue,
        elementLength: 12,
        efficiencyData: [],
        avrageEfficiency: 0
    };

    let shateredMonths = [...new Set(todo.map(m => m.month))].sort((a, b) => Number(a) - Number(b));
    let todoMonths = Array(12).fill(0)
    shateredMonths.forEach((element) => {
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
