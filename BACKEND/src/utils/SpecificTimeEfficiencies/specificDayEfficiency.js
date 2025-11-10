export function getSpecificDayEfficiency(periodValueQuery, todoArray) {
    const todo = todoArray[0];
    
    const totalTasks = todo?.totalTodoTasks || 0;
    const completedTasks = todo?.completedTodoTasks || 0;
    const efficiency = Number(todo?.dayEfficiency) || 0;

    const efficiencyData = Array(totalTasks)
        .fill(0)
        .map((_, i) => (i < completedTasks ? 100 : 0));
    
    let Xaxis_Lables = []
    for (let index = 1; index <= efficiencyData.length; index++) {
        Xaxis_Lables.push(`Task${index}`)
    }

    const result = {
        Day_id: periodValueQuery || todo.date_id || "",
        Xaxis_Lables,
        elementLength: totalTasks,
        efficiencyData,
        avrageEfficiency: efficiency.toFixed(2),
    };
    return result;
}
