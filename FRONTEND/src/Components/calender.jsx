import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTodoContext } from "../Contexts/TodosAPIContext.jsx"
import { months } from "../utils/Data_Bytes.js"
import { apiCall_fetchRemoteTodos } from "../utils/todoAPIcalls/apiCall_fetchRemoteTodos.jsx"
import { useAuthContext } from "../Contexts/AuthProvider.jsx"
import { FaCaretLeft } from "react-icons/fa"
import { FaCaretRight } from "react-icons/fa"
import { getMonthDays } from "../utils/CalenderUtils/MonthDays.js"

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

  const CalenderDays = getMonthDays(firstDay, daysInMonth, year, month)

  // If the user registered this month, the check will trigger immediately without needing to click the previous month.
  // Otherwise, the condition will only become true after the user clicks the previous month button, moving one month back.

  useEffect(() => {
    setDate((CurrentDate) => {
      if (
        CurrentDate.isSame(userRegisteredDate.date, "month") ||
        CurrentDate.isBefore(userRegisteredDate.date, "month")
      ) {
        setUserRegisteredDate((CurrentRegesterDate) => ({
          ...CurrentRegesterDate,
          isperMonthButtonDisable: true,
        }))
        return CurrentDate
      } else {
        setUserRegisteredDate((CurrentRegesterDate) => ({
          ...CurrentRegesterDate,
          isperMonthButtonDisable: false,
        }))
        return CurrentDate
      }
    })
  }, [])

  function getPrevMonth_handler() {
    setDate((CurrentDate) => {
      const UIMonth = CurrentDate.subtract(1, "month")
      if (
        UIMonth.isSame(userRegisteredDate.date, "month") ||
        UIMonth.isBefore(userRegisteredDate.date, "month")
      ) {
        setUserRegisteredDate((CurrentRegesterDate) => ({
          ...CurrentRegesterDate,
          isperMonthButtonDisable: true,
        }))
        return UIMonth
      } else {
        setUserRegisteredDate((CurrentRegesterDate) => ({
          ...CurrentRegesterDate,
          isperMonthButtonDisable: false,
        }))
        return CurrentDate.subtract(1, "month")
      }
    })
  }

  function goNextMonth_handler() {
    setDate((CurrentDate) => {
      setUserRegisteredDate((CurrentRegesterDate) => ({
        ...CurrentRegesterDate,
        isperMonthButtonDisable: false,
      }))
      return CurrentDate.add(1, "month")
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
      <div className=" min-h-[26rem] flex flex-col gap-y-[1rem] ">
        {/* calender */}
        <div className="flex justify-center bg-wite text-black ">
          <div className="min-w-80 rounded-2xl shadow-lg p-4 bg-transparent h-fit  ">
            {/* Header */}
            <div className={`flex justify-between items-center mb-4`}>
              <button
                className={`px-2 text-lg font-bold hover:text-gray-500 p-2 rounded-[50%] ${
                  userRegisteredDate.isperMonthButtonDisable
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={getPrevMonth_handler}
                disabled={userRegisteredDate.isperMonthButtonDisable}
              >
                <FaCaretLeft />
              </button>
              <h2 className="text-xl font-semibold">
                {months[month - 1]} {year}
              </h2>
              <button
                onClick={goNextMonth_handler}
                className="px-2 text-lg font-bold hover:text-gray-500 p-2 rounded-[50%] cursor-pointer "
              >
                <FaCaretRight />
              </button>
            </div>
            {/* Weekdays */}
            <div className="grid grid-cols-7 text-center text-sm font-medium border-b border-black pb-2 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            {/* CalenderDays */}
            <div className="grid grid-cols-7 text-center text-[1.1rem] ">
              {CalenderDays.map((element, index) => {
                if (element?.day) {
                  return (
                    <button
                      key={element.id}
                      id={dayjs(`${year}-${month}-${element.day}`).format(
                        "YYYY/MM/DD"
                      )}
                      onClick={onClickHandler}
                      className={` min-h-[2.5rem] min-w-[2.5rem] flex items-center justify-center  border rounded-[50%] cursor-pointer
                      ${isMultipleTask ? "border-black m-1 " : "border-white"}
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
                } else return <div key={index} ></div>
              })}
            </div>
          </div>
        </div>

        {/* multiple select button */}
        <div className="flex items-center justify-center">
          <button
            className="p-4 bg-black text-white cursor-pointer w-70"
            onClick={() => {
              setisMultipleTask((CurrentDate) => !CurrentDate)
              setTodos([])
            }}
          >
            {isMultipleTask ? "single task" : "Multiple"}
          </button>
        </div>
      </div>
    </>
  )
}
