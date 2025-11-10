import { useState, useEffect, useRef } from "react"
import { useAppContext } from "../../hooks/useCustomContext.jsx"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import InitialAnimation from "../../utils/MotionComponents/InitialAnimation.jsx"

export default function Dropdown() {
  const {
    dataDropdownselected,
    setdataDropdownselected,
    setefficiencyPageAttribute,
    efficiencyApiData,
  } = useAppContext()

  const [isOpen, setIsOpen] = useState(false)
  const items = ["Day", "Month", "Year"]

  const dropdownRef = useRef(null)

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function menuHandler(e, item) {
    efficiencyApiData.current = {
      ...efficiencyApiData.current,
      periodType: item.toLowerCase(),
    }
    setefficiencyPageAttribute(item)
    setdataDropdownselected(item)
    setIsOpen(false)
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
            {items.map((item, index) => (
              <button
                value={item}
                key={index}
                onClick={(e) => menuHandler(e, item)}
                className="block cursor-pointer w-full text-left px-4 py-2 text-black hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </InitialAnimation>
  )
}
