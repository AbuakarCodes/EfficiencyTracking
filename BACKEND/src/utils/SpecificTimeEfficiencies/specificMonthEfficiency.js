import dayjs from "dayjs"
export function getSpecificMonthEfficiency(periodValueQuery, todo) {
    const daysInMonth = dayjs(`${periodValueQuery.year}-${periodValueQuery.month}-01`).daysInMonth();

    const CurrentMonth = dayjs().month() + 1
    // we haev to add +! there to cheack, iscurrect Month, in further dealing with arry will -1 again 
    const days_of_Month_Till_Yet = dayjs().date()
    const isCurrentMonth = Number(CurrentMonth) === Number(periodValueQuery?.month)


    const result = {
        month_id: {},
        Xaxis_Lables: [],
        elementLength: daysInMonth,
        efficiencyData: [],
        monthEfficiency: 0
    };

    // Finding Efficiency Arry 
    // that todo has data for all the setted days of a specific month
    let settedEfficienciesDate = todo.map((elem) => {
        return Number(elem.date_id.split("/")[2])
    })

    let EfficiencyArry = Array(isCurrentMonth ? days_of_Month_Till_Yet : daysInMonth).fill(0);
    for (let index = 0; index < settedEfficienciesDate.length; index++) {
        let date = settedEfficienciesDate[index] - 1
        if (date < EfficiencyArry?.length)
            EfficiencyArry[date] = todo[index]?.dayEfficiency
    }

    // Finding Avg month efficiency 
    const avgAllDays = EfficiencyArry.reduce((sum, val) => sum + val, 0) / EfficiencyArry.length;

    let Xaxis_Lables = []
    for (let index = 1; index <= EfficiencyArry.length; index++) {
        Xaxis_Lables.push(`day${index}`)
    }

    // setting the return object
    result["month_id"] = periodValueQuery;
    result["efficiencyData"] = EfficiencyArry
    result["monthEfficiency"] = avgAllDays
    result["Xaxis_Lables"] = Xaxis_Lables

    return result;
}
