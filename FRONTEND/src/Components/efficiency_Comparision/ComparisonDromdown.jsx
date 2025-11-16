import { useState, useEffect, useRef } from "react"
import { useAppContext } from "../../hooks/useCustomContext.jsx"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import InitialAnimation from "../../utils/MotionComponents/InitialAnimation.jsx"
import { toast } from "react-toastify"
import { fetch_ALLTimeEfficiency } from "../../utils/EfficiencyAPICall/ALLTimeEfficiency.jsx"
import { Click_AnyWhere_to_Close } from "../../utils/Click_AnyWhere_to_Close.js"

export default function Dropdown() {
  const {
    dataDropdownselected,
    setdataDropdownselected,
    setefficiencyPageAttribute,
    efficiencyApiData,
    setEfficiencyGraphLoding,
    setXaxis,
    setYaxis,
    showComparision,
    setallTimeEfficiencyVal,
  } = useAppContext()

  const [isOpen, setIsOpen] = useState(false)
  const items = ["Day", "Month", "Year", "All Time"]

  const dropdownRef = useRef(null)

  // Close dropdown if clicking outside
  useEffect(() => {
    const CleanUP = Click_AnyWhere_to_Close(dropdownRef, setIsOpen)
    return CleanUP
  }, [])

  async function menuHandler(e, item) {
    efficiencyApiData.current = {
      ...efficiencyApiData.current,
      periodType: item.toLowerCase(),
    }
    setefficiencyPageAttribute(item)
    setdataDropdownselected(item)
    setIsOpen(false)

    // This API shoud be called after the dropdown state changes.
    // When we call the API, it will update the X-axis state. After the API logic finishes,
    // the dropdown state will also change. in InputDate component, a useEffect will run based on the dropdown state
    // and reset both the X-axis and Y-axis to an empty value.
    // Before even retrieving the X-axis values, they will be empty,
    // so Chart.js will not be able to render the chart.
    if (item.replace(/\s+/g, "").toLowerCase() === "alltime") {
      try {
        setEfficiencyGraphLoding(true)
        const response = await fetch_ALLTimeEfficiency(setallTimeEfficiencyVal)
        setYaxis(response?.data?.data?.efficiencyData || [])
        setXaxis(response?.data?.data?.Xaxis_Lables || [])
        setEfficiencyGraphLoding(false)
      } catch (error) {
        toast.error(" No data for selected dates", { theme: "dark" })
      }
    }
  }

  return (
    <InitialAnimation>
      <div ref={dropdownRef} className="relative inline-block text-left">
        {/* Main button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 cursor-pointer border-[1px] border-black/20 text-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white px-2 py-1 rounded text-center"
        >
          {dataDropdownselected}{" "}
          {isOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-[9999] mt-2 w-32 bg-white shadow-md rounded">
            {items.map((item, index) => {
              if (
                showComparision &&
                item.replace(/\s+/g, "").toLowerCase() === "alltime"
              )
                return null
              return (
                <button
                  value={item}
                  key={index}
                  onClick={(e) => menuHandler(e, item)}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                >
                  {item}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </InitialAnimation>
  )
}
