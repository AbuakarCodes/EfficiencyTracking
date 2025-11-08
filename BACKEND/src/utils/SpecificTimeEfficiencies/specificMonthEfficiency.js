import dayjs from "dayjs"
export function getSpecificMonthEfficiency(periodValueQuery, todo) {
    const daysInMonth = dayjs(`${periodValueQuery.year}-${periodValueQuery.month}-01`).daysInMonth();
  
  
    const result = {
        month_id: {},
        elementLength: daysInMonth,
        efficiencyData: [],
        monthEfficiency: 0
    };

    // Finding Efficiency Arry 
    let settedEfficienciesDate = todo.map((elem) => {
        return Number(elem.date_id.split("/")[2])
    })
    let EfficiencyArry = Array(daysInMonth).fill(0);
    for (let index = 0; index < settedEfficienciesDate.length; index++) {
        let date = settedEfficienciesDate[index]
        EfficiencyArry[date - 1] = todo[index].dayEfficiency
    }

    // Finding Avg month efficiency 
    const avgAllDays = EfficiencyArry.reduce((sum, val) => sum + val, 0) / EfficiencyArry.length;


    // setting the return object
    result["month_id"] = periodValueQuery;
    result["efficiencyData"] = EfficiencyArry
    result["monthEfficiency"] = avgAllDays

    return result;
}
