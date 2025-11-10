import { useAppContext } from "../../hooks/useCustomContext"
import { useEffect, useRef, useState } from "react"
import { apiCall_getMonthData } from "../../utils/EfficiencyAPICall/fetch_perMonthAPI"
import { PeriodEfficiency_URL } from "../../../API_EndPoints"
import dayjs from "dayjs"
import { MonthPickerInput } from "@mantine/dates"
import { YearPickerInput } from "@mantine/dates"
import { DatePickerInput } from "@mantine/dates"
import { EfficiencyDateStyle } from "../../utils/Data_Bytes"
import { toast } from "react-toastify"

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

  async function triggerAPICall(year, month, day) {
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
      toast.error(" No data for selected dates", {theme: "dark"})
      setXaxis("")
      setYaxis("")
    }
  }

  const handleMonthChange = (date) => {
    const Year = date.split("-")[0]
    const month = date.split("-")[1]
    triggerAPICall(Year, month)
  }

  const handleYearChange = (year) => {
    triggerAPICall(year.split("-")[0])
  }

  const handleDayChange = (date) => {
    const formatedDate = dayjs(date).format("YYYY/MM/DD")
    triggerAPICall(null, null, formatedDate)
  }

  if (dataDropdownselected === "Month") {
    return (
      <MonthPickerInput
        placeholder={`Select ${dataDropdownselected}`}
        onChange={handleMonthChange}
        styles={EfficiencyDateStyle}
      />
    )
  }

  if (dataDropdownselected === "Day") {
    return (
      <DatePickerInput
        placeholder={`Select ${dataDropdownselected}`}
        onChange={handleDayChange}
        styles={EfficiencyDateStyle}
      />
    )
  }

  if (dataDropdownselected === "Year") {
    return (
      <YearPickerInput
        placeholder={`Select ${dataDropdownselected}`}
        onChange={handleYearChange}
        styles={EfficiencyDateStyle}
      />
    )
  }

  return null
}

export default InputDate
