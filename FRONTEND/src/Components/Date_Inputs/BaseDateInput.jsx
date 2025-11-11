import { useState, useEffect, useRef } from "react"
import {
  DatePickerInput,
  MonthPickerInput,
  YearPickerInput,
} from "@mantine/dates"
import dayjs from "dayjs"
import { EfficiencyDateStyle } from "../../utils/Data_Bytes"
import { useAuthContext } from "../../Contexts/AuthProvider"

const BaseDateInput = ({
  type = "date",
  value,
  onChange,
  label,
  placeholder,
  styles,
  ...props
}) => {
  const {User} = useAuthContext()
  const [internalValue, setInternalValue] = useState(value || null)
  const userRegesteredDate = useRef(User?.createdAt.split("T")[0] )
  // console.log(userRegesteredDate.current)
  // console.log(dayjs(userRegesteredDate.current).toDate())

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
    setInternalValue(val || null)
    if (onChange) onChange(val || null)
  }

  return (
    <PickerComponent
      minDate={dayjs(userRegesteredDate.current).toDate()}
      label={label}
      placeholder={placeholder || `Select ${type}`}
      value={internalValue}
      onChange={handleChange}
      allowFreeInput
      clearable
      rightSectionWidth={40}
      styles={styles || EfficiencyDateStyle}
      {...props}
    />
  )
}

export default BaseDateInput
