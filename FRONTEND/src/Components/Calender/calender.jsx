import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useTodoContext } from "../../Contexts/TodosAPIContext.jsx"
import { months } from "../../utils/Data_Bytes.js"
import { apiCall_fetchRemoteTodos } from "../../utils/todoAPIcalls/apiCall_fetchRemoteTodos.jsx"
import { useAuthContext } from "../../Contexts/AuthProvider.jsx"
import { FaCaretLeft } from "react-icons/fa"
import { FaCaretRight } from "react-icons/fa"
import { getMonthDays } from "./MonthDays.js"
import { apiCall_SettedTodo } from "../../utils/todoAPIcalls/apiCall_SettedTodo.jsx"

export default function Calendar() {
  const {
    API_dateID,
    setTodos,
    setisTodoLoding,
    setspecificDateEfficiency,
    sethomePageChartDate,
    isMultipleTask,
    setisMultipleTask,
    SettedTodosDate,
    setSettedTodosDate,
  } = useTodoContext()

  const { User } = useAuthContext()

  const [date, setDate] = useState(dayjs())
  const [userRegisteredDate, setUserRegisteredDate] = useState({
    date: dayjs(User?.createdAt.split("T")[0]).format("YYYY/MM/DD"),
    isperMonthButtonDisable: false,
  })
  const [clickedCalenderBtn, setclickedCalenderBtn] = useState("")

  useEffect(() => {
    isMultipleTask ? (API_dateID.current = []) : null
  }, [isMultipleTask])

  // Handle prev month button disable if user registered this month or before
  useEffect(() => {
    setDate((CurrentDate) => {
      if (!CurrentDate.isAfter(userRegisteredDate.date, "month")) {
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

  // Fetch setted todo dates
  useEffect(() => {
    ;(async function () {
      try {
        const response = await apiCall_SettedTodo()
        setSettedTodosDate(response?.data?.data || [])
      } catch (error) {
        setSettedTodosDate([])
      }
    })()
  }, [])

  const year = date.year()
  const month = date.month() + 1
  const today = dayjs().format("YYYY/MM/DD")

  const firstDay = date.startOf("month").day()
  const daysInMonth = date.daysInMonth()
  const CalenderDays = getMonthDays(firstDay, daysInMonth, year, month)

  function getPrevMonth_handler() {
    setDate((CurrentDate) => {
      const UIMonth = CurrentDate.subtract(1, "month")
      if (!UIMonth.isAfter(userRegisteredDate.date, "month")) {
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
    setclickedCalenderBtn(e.target.id)
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
                className={`px-2 text-lg font-bold hover:text-gray-500 p-2 rounded-[50%]  disabled:text-black/20 disabled:cursor-not-allowed cursor-pointer `}
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
                if (!element?.day) return <div key={index}></div>

                const elementDate = dayjs(element.id).format("YYYY/MM/DD")
                const isDisabled = !dayjs(element.id).isAfter(
                  dayjs(userRegisteredDate.date),
                  "day"
                )
                const hasTodos =
                  SettedTodosDate.length !== 0
                    ? SettedTodosDate.includes(elementDate)
                    : false

                let buttonClass = `disabled:cursor-not-allowed disabled:text-black/20
                      min-h-[2.5rem] min-w-[2.5rem] flex items-center justify-center
                      border rounded-[50%] cursor-pointer
                      ${isMultipleTask ? "border-black m-1" : "border-white"}
                      ${hasTodos ? "bg-black/5" : ""}
                      ${
                        !clickedCalenderBtn
                          ? element.id === today
                            ? "bg-black text-white font-semibold"
                            : "hover:bg-gray-200"
                          : ""
                      }
                      ${
                        elementDate === clickedCalenderBtn
                          ? "bg-black text-white font-semibold"
                          : ""
                      }
                    `
                return (
                  <button
                    key={element.id}
                    id={elementDate}
                    onClick={onClickHandler}
                    disabled={isDisabled}
                    className={buttonClass}
                  >
                    {element.day}
                  </button>
                )
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
