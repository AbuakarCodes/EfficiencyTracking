export function getSpecificDayEfficiency(periodValueQuery, todoArray) {
    if (!todoArray || typeof todoArray !== "object") return null;
    const todo = todoArray[0];
    
    const totalTasks = todo.totalTodoTasks || 0;
    const completedTasks = todo.completedTodoTasks || 0;
    const efficiency = Number(todo.dayEfficiency) || 0;

    const efficiencyData = Array(totalTasks)
        .fill(0)
        .map((_, i) => (i < completedTasks ? 100 : 0));

    const result = {
        Day_id: periodValueQuery.date_id || todo.date_id || "",
        elementLength: totalTasks,
        efficiencyData,
        avrageEfficiency: efficiency.toFixed(2),
    };
    return result;
}
