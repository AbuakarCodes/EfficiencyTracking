import { useRef, useState } from "react"
import { CalenderButton } from "../utils/CalenderButtons.jsx"
import dayjs from "dayjs"
import { useNavigate } from "react-router"

export default function Calendar() {
  const isLongPress = useRef(false)
  const timer = useRef(null)
  const navigate = useNavigate()

  const [date, setDate] = useState(new Date())

  const year = date.getFullYear()
  const month = date.getMonth()
  const today = date.getDate()

  // Get first and last day of month
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Create days array
  const days = []

  for (let i = 0; i < firstDay; i++) days.push(null) // empty cells before 1st day
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // handlers

  const startPress = () => {
    timer.current = setTimeout(() => {
      isLongPress.current = true
    }, 600)
  }

  const endPress = () => {
    clearTimeout(timer.current)
   
  }

  const onclickHandler = (e) => {
    if (isLongPress.current) {
      console.log(e.target.id)
    } else {
      navigate("/efficiency")
    }
  }

  return (
    <div className="flex justify-center items-center  bg-white text-black">
      <div className="w-80  rounded-2xl shadow-lg p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setDate(new Date(year, month - 1, 1))}
            className="px-2 text-lg font-bold hover:text-gray-500"
          >
            ‹
          </button>
          <h2 className="text-xl font-semibold">
            {months[month]} {year}
          </h2>
          <button
            onClick={() => setDate(new Date(year, month + 1, 1))}
            className="px-2 text-lg font-bold hover:text-gray-500"
          >
            ›
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-sm font-medium border-b border-black pb-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 text-center gap-y-2">
          {days.map((day, index) => (
            <button
              id={dayjs(new Date(year, month, day)).format("D/M/YYYY")}
              onMouseDown={startPress}
              onMouseUp={endPress}
              onMouseLeave={endPress}
              onTouchStart={startPress}
              onTouchEnd={endPress}
              onClick={onclickHandler}
              key={index}
              className={`p-2 rounded-full ${
                day === today ? "bg-black text-white font-semibold": "hover:bg-gray-200"

              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
