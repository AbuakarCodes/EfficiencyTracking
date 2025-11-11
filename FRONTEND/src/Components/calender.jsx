import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTodoContext } from "../Contexts/TodosAPIContext.jsx"
import { months } from "../utils/Data_Bytes.js"
import { apiCall_fetchRemoteTodos } from "../utils/todoAPIcalls/apiCall_fetchRemoteTodos.jsx"
import { useAuthContext } from "../Contexts/AuthProvider.jsx"

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

  const { User } = useAuthContext()

  useEffect(() => {
    isMultipleTask ? (API_dateID.current = []) : null
  }, [isMultipleTask])

  const [date, setDate] = useState(dayjs())
  const [userRegisteredDate, setUserRegisteredDate] = useState({
    date: dayjs(User?.createdAt.split("T")[0]).format("YYYY/MM/DD"),
    isperMonthButtonDisable: false,
  })

  const year = date.year()
  const month = date.month() + 1
  const today = date.date()

  const firstDay = date.startOf("month").day()
  const daysInMonth = date.daysInMonth()

  let CalenderDays = []
  for (let index = 0; index < firstDay + daysInMonth; index++) {
    if (!(index < firstDay)) {
      CalenderDays.push({
        id: dayjs(`${year}-${month}-${index - (firstDay - 1)}`).format(
          "YYYY/MM/DD"
        ),
        day: index - (firstDay - 1),
        isSelected: false,
      })
    } else CalenderDays.push(null)
  }

  function getPrevMonth_handler() {
    setDate((prev) => {
      if (!prev.isSame(dayjs(userRegisteredDate.date), "month")) {
        setUserRegisteredDate((prevState) => ({
          ...prevState,
          isperMonthButtonDisable: false,
        }))
        return prev.subtract(1, "month")
      } else {
        setUserRegisteredDate((prevState) => ({
          ...prevState,
          isperMonthButtonDisable: true,
        }))
        return prev
      }
    })
  }

  function goNextMonth_handler() {
    setDate((prev) => {
      setUserRegisteredDate((prevState) => ({
        ...prevState,
        isperMonthButtonDisable: false,
      }))
      return prev.add(1, "month")
    })
  }

  const onClickHandler = async (e) => {
    if (isMultipleTask) {
      API_dateID.current = Array.from(
        new Set([...API_dateID.current, e.target.id])
      )
      return
    }

    API_dateID.current[0] = e.target.id
    sethomePageChartDate(dayjs(e.target.id).format("DD/MM/YY"))
    const RemoteTodos = await apiCall_fetchRemoteTodos(
      API_dateID,
      setisTodoLoding,
      setspecificDateEfficiency
    )
    setTodos(RemoteTodos)
  }

  return (
    <>
      <div className="flex justify-center items-center bg-white text-black">
        <div className="w-80 rounded-2xl shadow-lg p-4">
          {/* Header */}
          <div className={`flex justify-between items-center mb-4`}>
            <button
              className={`px-2 text-lg font-bold hover:text-gray-500 ${
                userRegisteredDate.isperMonthButtonDisable
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={getPrevMonth_handler}
              disabled={userRegisteredDate.isperMonthButtonDisable}
            >
              ‹
            </button>
            <h2 className="text-xl font-semibold">
              {months[month - 1]} {year}
            </h2>
            <button
              onClick={goNextMonth_handler}
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
          {/* CalenderDays */}
          <div className="grid grid-cols-7 text-center gap-y-2">
            {CalenderDays.map((element, index) => {
              if (element?.day) {
                return (
                  <button
                    key={index}
                    id={dayjs(`${year}-${month}-${element.day}`).format(
                      "YYYY/MM/DD"
                    )}
                    onClick={onClickHandler}
                    className={`p-2 border rounded-full cursor-pointer
                      ${isMultipleTask ? "border-black" : "border-white"}
                      ${
                        !isMultipleTask
                          ? element.day === today
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-200"
                          : ""
                      }`}
                  >
                    {element.day}
                  </button>
                )
              } else return <div></div>
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="p-4 bg-black text-white cursor-pointer w-70"
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
