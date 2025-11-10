import { useState, useEffect } from "react"
import {
  DatePickerInput,
  MonthPickerInput,
  YearPickerInput,
} from "@mantine/dates"
import { EfficiencyDateStyle } from "../../utils/Data_Bytes"



const BaseDateInput = ({
  type = "date",
  value,
  onChange,
  label,
  placeholder,
  styles,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || null)

  // Sync internalValue with external controlled value
  useEffect(() => {
    setInternalValue(value || null)
  }, [value])

  let PickerComponent
  switch (type) {
    case "month":
      PickerComponent = MonthPickerInput
      break
    case "year":
      PickerComponent = YearPickerInput
      break
    default:
      PickerComponent = DatePickerInput
  }

  const handleChange = (val) => {
    setInternalValue(val || null) // clear internal state if null
    if (onChange) onChange(val || null)
  }

  return (
    <PickerComponent
      label={label}
      placeholder={placeholder || `Select ${type}`}
      value={internalValue}
      onChange={handleChange}
      allowFreeInput
      clearable
      styles={styles || EfficiencyDateStyle}
      {...props}
    />
  )
}

export default BaseDateInput
