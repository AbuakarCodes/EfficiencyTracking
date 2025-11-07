import dayjs from "dayjs"

 export function formatPeriodValue(value, dataDropdownselected) {
    if (dataDropdownselected === "Month") {
      return value.toString().padStart(2, "0")
    } else if (dataDropdownselected === "Day") {
      const date = dayjs(value)
      const year = date.year()
      const month = (date.month() + 1).toString().padStart(2, "0")
      const day = date.date().toString().padStart(2, "0")
      return `${year}/${month}/${day}`
    } else if (dataDropdownselected === "Year") {
      return value
    }
    return value
  }