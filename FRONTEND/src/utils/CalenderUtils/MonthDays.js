import dayjs from "dayjs"

export function getMonthDays(firstDay, daysInMonth, year, month) {
    let CalenderDays = [
        {
            id: "",
            day: 0,
            isSelected: false
        }
    ]
    Array.from({ length: firstDay + daysInMonth }).forEach((_, index) => {
        if (!(index < firstDay)) {
            CalenderDays.push({
                id: dayjs(`${year}-${month}-${index - (firstDay - 1)}`).format("YYYY/MM/DD"),
                day: index - (firstDay - 1),
                isSelected: false,
            })
        } else {
            CalenderDays.push(null)
        }
    })
    return CalenderDays
}
