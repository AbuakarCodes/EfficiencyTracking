import { useAppContext } from "../../hooks/useCustomContext"
import { useEffect, useRef, useState } from "react"
import { apiCall_getMonthData } from "../../utils/EfficiencyAPICall/fetch_perMonthAPI"
import { PeriodEfficiency_URL } from "../../../API_EndPoints"
import dayjs from "dayjs"
import { EfficiencyDateStyle } from "../../utils/Data_Bytes"
import { toast } from "react-toastify"
import BaseDateInput from "../Date_Inputs/BaseDateInput"

function InputDate() {
  const {
    dataDropdownselected,
    efficiencyPageAttribute,
    efficiencyApiData,
    setXaxis,
    setYaxis,
    setEfficiencyGraphLoding,
  } = useAppContext()

  useEffect(() => {
    setXaxis("")
    setYaxis("")
  }, [dataDropdownselected])

  let type = null
  if (dataDropdownselected === "Day") type = "date"
  if (dataDropdownselected === "Month") type = "month"
  if (dataDropdownselected === "Year") type = "year"

  async function triggerAPICall(year, month, day) {
    if (dataDropdownselected === "Day") {
      if (!day || !dayjs(day).isValid()) {
        toast.error("Invalid Day selected", { theme: "dark" })
        return false
      }
    } else if (dataDropdownselected === "Month") {
      if (!year || !month || !dayjs(`${year}-${month}-01`).isValid()) {
        toast.error("Invalid Month selected", { theme: "dark" })
        return false
      }
    } else if (dataDropdownselected === "Year") {
      if (!year || !dayjs(`${year}-01-01`).isValid()) {
        toast.error("Invalid Year selected", { theme: "dark" })
        return false
      }
    }

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
        result?.data?.data?.Xaxis_Lables ||
          Array.from(
            { length: result?.data?.data?.elementLength || 30 },
            (_, i) => i + 1
          )
      )
    } catch (error) {
      setEfficiencyGraphLoding(false)
      toast.error(" No data for selected dates", { theme: "dark" })
      setXaxis("")
      setYaxis("")
    }
  }

  const handleMonthChange = (date) => {
    if (!date) return // user clicked cross/clear (no need for toster)

    const d = dayjs(date).format("YYYY/MM/DD").split("/")
    const year = Number(d[0])
    const month = Number(d[1])

    if (!year || !month) {
      toast.error("Invalid month selected", { theme: "dark" })
      return
    }

    triggerAPICall(year, month)
  }

  const handleYearChange = (date) => {
    if (!date) return // user clicked cross/clear (no need for toster)

    const d = dayjs(date)
    if (!d.isValid()) {
      toast.error("Invalid date entered", { theme: "dark" })
      return
    }
    const year = Number(d.format("YYYY/MM/DD").split("/")[0])
    triggerAPICall(year)
  }

  const handleDayChange = (date) => {
    if (!date) return // user clicked cross/clear (no need for toster)

    const d = dayjs(date)
    if (!d.isValid()) {
      toast.error("Invalid date entered", { theme: "dark" })
      return
    }
    const day = d.format("YYYY/MM/DD")
    triggerAPICall(null, null, day)
  }

  if (dataDropdownselected === "Month") {
    return (
      <BaseDateInput
        type={type}
        placeholder={`Select ${dataDropdownselected}`}
        onChange={handleMonthChange}
      />
    )
  }

  if (dataDropdownselected === "Day") {
    return (
      <BaseDateInput
        type={type}
        placeholder={`Select ${dataDropdownselected}`}
        onChange={handleDayChange}
      />
    )
  }

  if (dataDropdownselected === "Year") {
    return (
      <BaseDateInput
        type={type}
        placeholder={`Select ${dataDropdownselected}`}
        onChange={handleYearChange}
        styles={EfficiencyDateStyle}
      />
    )
  }

  return null
}

export default InputDate
