import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

dayjs.extend(customParseFormat)

export function Backend_isDateValid(input) {
  return dayjs(input, "YYYY/MM/DD", true).isValid()
}

