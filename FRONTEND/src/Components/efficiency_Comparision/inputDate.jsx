import { useAppContext } from "../../hooks/useCustomContext"
import { useRef, useState } from "react"
import { apiCall_getMonthData } from "../../utils/EfficiencyAPICall/fetch_perMonthAPI"
import { perMontEfficiency_URL } from "../../../API_EndPoints"

function InputDate() {
  const { dataDropdownselected, efficiencyApiData, setXaxis, setYaxis } =
    useAppContext()
  const intervalRef = useRef(null)
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("")

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

  function triggerAPICall(year, month) {
    if (!year || !month) return

    clearTimeout(intervalRef.current)
    intervalRef.current = setTimeout(async () => {
      const periodValue = `${year}/${month}`
      efficiencyApiData.current = { ...efficiencyApiData.current, periodValue }
      const result = await apiCall_getMonthData(
        perMontEfficiency_URL,
        efficiencyApiData.current
      )
      console.log(result?.data?.data || {})
      setYaxis(result?.data?.data?.efficiencyData)
      setXaxis(
        Array.from({ length: result?.data?.data?.days || 30 }, (_, i) => i + 1)
      )
    }, 700)
  }

  const handleMonthChange = (e) => {
    const month = e.target.value
    setSelectedMonth(month)
    triggerAPICall(selectedYear, month)
  }

  const handleYearChange = (e) => {
    const year = e.target.value
    setSelectedYear(year)
    triggerAPICall(year, selectedMonth)
  }

  if (dataDropdownselected === "Month") {
    return (
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm w-fit focus-within:ring-2 focus-within:ring-blue-500">
        <select
          onChange={handleMonthChange}
          defaultValue=""
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
        onChange={handleMonthChange}
        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    )
  }

  if (dataDropdownselected === "Year") {
    return (
      <input
        type="number"
        placeholder="Enter year"
        onChange={handleYearChange}
        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
      />
    )
  }

  return null
}

export default InputDate
