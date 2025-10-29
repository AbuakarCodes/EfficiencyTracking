import dayjs from "dayjs"
import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useTodoContext } from "../Contexts/TodosAPIContext.jsx"
import { months } from "../utils/Data_Bytes.js"

export default function Calendar() {
  const { API_dateID } = useTodoContext()
  const [isSettingTodos, setIsSettingTodos] = useState(false)
  const isLongPress = useRef(false)
  const timer = useRef(null)
  const navigate = useNavigate()

  const [date, setDate] = useState(dayjs())

  const year = date.year()
  const month = date.month() + 1
  const today = date.date()

  const firstDay = date.startOf("month").day()
  const daysInMonth = date.daysInMonth()

  // days array
  const days = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  )

  // Long press handlers
  const startPress = () => {
    isLongPress.current = false
    timer.current = setTimeout(() => {
      isLongPress.current = true
    }, 600)
  }

  const endPress = () => {
    clearTimeout(timer.current)
  }

  const onClickHandler = (e) => {
    if (!e.target.id) return

    if (isLongPress.current || isSettingTodos) {
      // ✅ safer: check if API_dateID exists and avoid mutation if possible
      if (Array.isArray(API_dateID.current)) {
        if (!API_dateID.current.includes(e.target.id)) {
          API_dateID.current.push(e.target.id)
          console.log("Added:", e.target.id)
        }
      }
    } else {
      navigate("/efficiency")
    }

    // Reset long press state
    isLongPress.current = false
  }

  const goPrevMonth = () => setDate(date.subtract(1, "month"))
  const goNextMonth = () => setDate(date.add(1, "month"))

  return (
    <>
      <div className="flex justify-center items-center bg-white text-black">
        <div className="w-80 rounded-2xl shadow-lg p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goPrevMonth}
              className="px-2 text-lg font-bold hover:text-gray-500"
            >
              ‹
            </button>
            <h2 className="text-xl font-semibold">
              {months[month - 1]} {year}
            </h2>
            <button
              onClick={goNextMonth}
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
                key={index}
                id={dayjs(`${year}-${month}-${day}`).format("YYYY/M/D")}
                onMouseDown={startPress}
                onMouseUp={endPress}
                onMouseLeave={endPress}
                onTouchStart={startPress}
                onTouchEnd={endPress}
                onClick={onClickHandler}
                className={`p-2 rounded-full ${
                  day === today
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setIsSettingTodos((prev) => !prev)}>
        setTodos
      </button>
    </>
  )
}
