import dayjs from "dayjs"
import { Backend_isDateValid } from "../utils/Backend_isDateValid.js"
import { responseClass } from "../utils/responseClass.js"
import { ErrorClass } from "../utils/ErrorClass.js"

export const isDateValid = (req, res, next) => {
    const { date_id } = req

    let date = date_id
    if (!Array.isArray(date)) date = [date_id]

    const Valid = date.every((element) => {
        return Backend_isDateValid(dayjs(element))
    })

    if (!Valid) return res.status(400).json(new ErrorClass("Date is not valid"))
    else return next()

}