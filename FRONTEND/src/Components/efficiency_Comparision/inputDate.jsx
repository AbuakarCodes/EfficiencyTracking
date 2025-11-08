import { useAppContext } from "../../hooks/useCustomContext"
import { useRef, useState } from "react"
import { apiCall_getMonthData } from "../../utils/EfficiencyAPICall/fetch_perMonthAPI"
import { PeriodEfficiency_URL } from "../../../API_EndPoints"
import dayjs from "dayjs"

function InputDate() {
  const {
    dataDropdownselected,
    efficiencyPageAttribute,
    efficiencyApiData,
    setXaxis,
    setYaxis,
    setEfficiencyGraphLoding,
  } = useAppContext()

  const intervalRef = useRef(null)
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ]

  function triggerAPICall(year, month, day) {
    clearTimeout(intervalRef.current)
    intervalRef.current = setTimeout(async () => {
      switch (efficiencyPageAttribute.toLowerCase()) {
        case "month": {
          const periodValue = `${year}/${month}`
          efficiencyApiData.current = {
            ...efficiencyApiData.current,
            periodValue,
          }
          break
        }

        case "year": {
          const periodValue = year
          efficiencyApiData.current = {
            ...efficiencyApiData.current,
            periodValue,
          }
          break
        }

        case "day": {
          const periodValue = day
          efficiencyApiData.current = {
            ...efficiencyApiData.current,
            periodValue,
          }
          break
        }
      }

      // Api call and setting chart values
      try {
        setEfficiencyGraphLoding(true)
        const result = await apiCall_getMonthData(
          PeriodEfficiency_URL,
          efficiencyApiData.current
        )
        setEfficiencyGraphLoding(false)

        setYaxis(result?.data?.data?.efficiencyData)
        setXaxis(
          Array.from(
            { length: result?.data?.data?.elementLength || 30 },
            (_, i) => i + 1
          )
        )
      } catch (error) {
        setEfficiencyGraphLoding(false)
      }
    }, 300)
  }

  const handleMonthChange = (e) => {
    const month = e.target.value
    setSelectedMonth(month)
    if (selectedYear && month) triggerAPICall(selectedYear, month)
  }

  const handleYearChange = (e) => {
    const year = e.target.value
    setSelectedYear(year)
    if (year.length === 4 && selectedMonth) triggerAPICall(year, selectedMonth)
    if (dataDropdownselected === "Year" && year.length === 4)
      triggerAPICall(year)
  }

  const handleDayChange = (e) => {
    const formattedDate = dayjs(e.target.value).format("YYYY/MM/DD")
    setSelectedDate(e.target.value)
    triggerAPICall(null, null, formattedDate)
  }

  if (dataDropdownselected === "Month") {
    return (
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm w-fit focus-within:ring-2 focus-within:ring-black">
        <select
          onChange={handleMonthChange}
          value={selectedMonth}
          className="bg-transparent focus:outline-none text-gray-700"
        >
          <option value="" disabled>
            Select month
          </option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          ))}
        </select>

        <span className="text-gray-400">/</span>

        <input
          type="number"
          min="1900"
          max="2100"
          placeholder="Year"
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-transparent focus:outline-none w-20 text-gray-700"
        />
      </div>
    )
  }

  if (dataDropdownselected === "Day") {
    return (
      <input
        type="date"
        value={selectedDate}
        onChange={handleDayChange}
        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    )
  }

  if (dataDropdownselected === "Year") {
    return (
      <input
        type="number"
        value={selectedYear}
        placeholder="Enter year"
        onChange={handleYearChange}
        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    )
  }

  return null
}

export default InputDate
