import { useAppContext } from "../../hooks/useCustomContext.jsx"
import InitialAnimation from "../../utils/MotionComponents/InitialAnimation.jsx"
import BaseDateInput from "../Date_Inputs/BaseDateInput.jsx"
import { useState, useEffect } from "react"
import { apiCall_getComparisionData } from "../../utils/ComparisionEfficiencyAPICall/ComparisionEfficiencyApiCall.jsx"
import { ComparisionPeriodEfficiency_URL } from "../../../API_EndPoints.js"
import dayjs from "dayjs"
import { toast } from "react-toastify"

export default function PeriodSelector() {
  const {
    dataDropdownselected,
    EfficiencyGraphLoding,
    setEfficiencyGraphLoding,
    setComparison_Cordinates,
  } = useAppContext()

  const [Period, setPeriod] = useState({ periodA: null, periodB: null })
  const [rawDateUIvalues, setrawDateUIvalues] = useState({
    periodA: null,
    periodB: null,
  })

  useEffect(() => {
    setPeriod({ periodA: null, periodB: null })
    setrawDateUIvalues({ periodA: null, periodB: null })
    setComparison_Cordinates({ PeriodA: {}, PeriodB: {} })
  }, [dataDropdownselected])

  let type = null
  if (dataDropdownselected === "Day") type = "date"
  if (dataDropdownselected === "Month") type = "month"
  if (dataDropdownselected === "Year") type = "year"

  function PeriodAhandler(data) {
    let value = null

    if (dataDropdownselected.toLowerCase() === "year") {
      value = Number(dayjs(data).format("YYYY/MM/DD").split("/")[0])
    } else if (dataDropdownselected.toLowerCase() === "month") {
      const [year, month] = dayjs(data).format("YYYY/MM/DD").split("/")
      value = { year: Number(year), month: Number(month) }
    } else {
      value = dayjs(data).format("YYYY/MM/DD")
    }

    setPeriod((prev) => ({ ...prev, periodA: value }))
    setrawDateUIvalues((prev) => ({ ...prev, periodA: data }))
  }

  function PeriodBhandler(data) {
    let value = null

    if (dataDropdownselected.toLowerCase() === "year") {
      value = Number(dayjs(data).format("YYYY/MM/DD").split("/")[0])
    } else if (dataDropdownselected.toLowerCase() === "month") {
      const [year, month] = dayjs(data).format("YYYY/MM/DD").split("/")
      value = { year: Number(year), month: Number(month) }
    } else {
      value = dayjs(data).format("YYYY/MM/DD")
    }

    setPeriod((prev) => ({ ...prev, periodB: value }))
    setrawDateUIvalues((prev) => ({ ...prev, periodB: data }))
  }

  async function submithandler() {
    if (
      (!Period.periodA || !Period.periodB) ||
      Period.periodA === "Invalid Date" ||
      Period.periodB === "Invalid Date"
    ) {
      toast.error("Both fields are required", { theme: "dark" })
      return
    }


    if (JSON.stringify(Period.periodA) === JSON.stringify(Period.periodB)) {
      setrawDateUIvalues((prev) => ({ ...prev, periodB: "" }))
      setPeriod((prev) => ({ ...prev, periodB: "" }))
      toast.error("Both fields are same", { theme: "dark" })
      return
    }

    const APIdata = {
      periodType: dataDropdownselected,
      periodValue: {
        periodA: Period.periodA,
        periodB: Period.periodB,
      },
    }

    try {
      setEfficiencyGraphLoding(true)
      const response = await apiCall_getComparisionData(
        ComparisionPeriodEfficiency_URL,
        APIdata
      )
      setComparison_Cordinates(response?.data?.data || "")
    } catch (error) {
      toast.error("No data for selected dates", { theme: "dark" })
      setComparison_Cordinates({ PeriodA: {}, PeriodB: {} })
    } finally {
      setEfficiencyGraphLoding(false)
    }
  }

  return (
    <InitialAnimation Y={-20}>
      <div className="w-full mx-auto">
        <div className="flex flex-col">
          <div className="gap-4 flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-black px-3 py-2 rounded-t">Period A</label>
              <BaseDateInput
                name="periodA"
                type={type}
                value={rawDateUIvalues?.periodA || ""}
                onChange={PeriodAhandler}
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-black px-3 py-2 rounded-t">Period B</label>
              <BaseDateInput
                name="periodB"
                type={type}
                value={rawDateUIvalues?.periodB || ""}
                onChange={PeriodBhandler}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={submithandler}
              disabled={EfficiencyGraphLoding}
              className="cursor-pointer rounded-[5px] px-3 py-1 bg-black text-white border-[1px] border-black/20"
            >
              {EfficiencyGraphLoding ? "Comparing ..." : "Compare"}
            </button>
          </div>
        </div>
      </div>
    </InitialAnimation>
  )
}
