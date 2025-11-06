import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
import { useTodoContext } from "../Contexts/TodosAPIContext.jsx"
import { months } from "../utils/Data_Bytes.js"
import { apiCall_fetchRemoteTodos } from "../utils/todoAPIcalls/apiCall_fetchRemoteTodos.jsx"

export default function Calendar() {
  const {
    API_dateID,
    setTodos,
    setisTodoLoding,
    setspecificDateEfficiency,
    sethomePageChartDate,
    isMultipleTask,
    setisMultipleTask,
  } = useTodoContext()

  useEffect(() => {
    isMultipleTask ? (API_dateID.current = []) : null
  }, [isMultipleTask])

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

  const goPrevMonth = () => setDate(date.subtract(1, "month"))
  const goNextMonth = () => setDate(date.add(1, "month"))

  const onClickHandler = async (e) => {
    if (isMultipleTask) {
      API_dateID.current = Array.from(
        new Set([...API_dateID.current, e.target.id])
      )
      return
    }

    // Setting Single tasks
    API_dateID.current[0] = e.target.id
    sethomePageChartDate(dayjs(e.target.id).format("DD/MM/YY"))
    const RemoteTodos = await apiCall_fetchRemoteTodos(
      API_dateID,
      setisTodoLoding,
      setspecificDateEfficiency
    )
    console.log(RemoteTodos)
    setTodos(RemoteTodos)
  }

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
          <div className="grid grid-cols-7 text-center  gap-y-2">
            {days.map((day, index) => (
              <button
                key={index}
                id={dayjs(`${year}-${month}-${day}`).format("YYYY/M/D")}
                onClick={onClickHandler}
                className={`p-2  border rounded-full cursor-pointer
                        ${isMultipleTask ? "border-black" : "border-white"}
                        ${
                          !isMultipleTask
                            ? day === today
                              ? "bg-black text-white font-semibold"
                              : "hover:bg-gray-200"
                            : ""
                        }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="p-4 bg-black text-white cursor-pointer w-70  "
          onClick={() => {
            setisMultipleTask((prev) => !prev)
            setTodos([])
          }}
        >
          {isMultipleTask ? "single task" : "Multiple"}
        </button>
      </div>
    </>
  )
}
