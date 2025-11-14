import dayjs from "dayjs"
import { useEffect, useRef, useState } from "react"
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
    clickedDates,
    setclickedDates,
  } = useTodoContext()

  const { User } = useAuthContext()
  const today = dayjs().format("YYYY/MM/DD")

  const [date, setDate] = useState(dayjs())
  const [userRegisteredDate, setUserRegisteredDate] = useState({
    date: dayjs(User?.createdAt.split("T")[0]).format("YYYY/MM/DD"),
    isperMonthButtonDisable: false,
  })

  useEffect(() => {
    isMultipleTask ? (API_dateID.current = []) : null
    setclickedDates([])
    sethomePageChartDate(today)
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

  // API date_id being seted and APi call as well
  useEffect(() => {
    if (clickedDates.length === 0) return
    if (isMultipleTask) {
      const filteredSelectedDates = clickedDates
        .filter((elem) => elem?.date && elem?.isSelected == true)
        .map((elem) => elem?.date)
      API_dateID.current = filteredSelectedDates
      sethomePageChartDate(filteredSelectedDates)
    } else {
      API_dateID.current = clickedDates[clickedDates.length - 1]?.date
      sethomePageChartDate([clickedDates[clickedDates.length - 1]?.date])
    }
    // calling APi
    ;(async function () {
      if (isMultipleTask) return
      try {
        const RemoteTodos = await apiCall_fetchRemoteTodos(
          API_dateID,
          setisTodoLoding,
          setspecificDateEfficiency
        )
        setTodos(RemoteTodos)
      } catch (error) {
        console.log(error?.message || "somthing Went Worng")
      }
    })()
  }, [clickedDates])

  const year = date.year()
  const month = date.month() + 1

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
    // setting data for api CALL TO set and unset data, can just modified days of month as
    // id the user change the month the whole data will bw lost or user will be
    // bounded to only set multiple todos of same month
    if (isMultipleTask) {
      setclickedDates((currentState) => {
        const AlreadyExist = currentState.some((obj) => obj.date == e.target.id)
        if (AlreadyExist) {
          return currentState.map((obj) =>
            obj.date === e.target.id
              ? { ...obj, isSelected: !obj.isSelected }
              : obj
          )
        } else return [...currentState, { date: e.target.id, isSelected: true }]
      })
    } else {
      setclickedDates([{ date: e.target.id, isSelected: true }])
    }
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

                const isDisabled_userRegesterDate = !dayjs(element.id).isAfter(
                  dayjs(userRegisteredDate.date),
                  "day"
                )
                const chosingMultipleDates = Array.isArray(clickedDates)
                  ? clickedDates.some(
                      (obj) => obj.date == elementDate && obj.isSelected == true
                    )
                  : null

                const isToday = element.id === today

                const hasTodos =
                  SettedTodosDate.length !== 0
                    ? SettedTodosDate.includes(elementDate)
                    : false

                let buttonClass = `disabled:cursor-not-allowed disabled:text-black/20
                      min-h-[2.5rem] min-w-[2.5rem] flex items-center justify-center
                      border rounded-[50%] cursor-pointer
                      ${isMultipleTask ? "border-black/20" : "border-white"}
                   
                      // Today background
                      ${
                        !isMultipleTask
                          ? clickedDates.length === 0
                            ? isToday
                              ? "!bg-black text-white font-semibold"
                              : hasTodos
                              ? "bg-black/5"
                              : ""
                            : ""
                          : ""
                      }

                    single Clicked background 
                      ${
                        chosingMultipleDates
                          ? "bg-black text-white font-semibold"
                          : hasTodos
                          ? "bg-black/5"
                          : "hover:!text-red-300"
                      }

                // Multiple Todos
              

                ${
                  isMultipleTask
                    ? chosingMultipleDates
                      ? "bg-black text-white"
                      : ""
                    : ""
                }
                    `

                return (
                  <button
                    key={element.id}
                    id={elementDate}
                    onClick={onClickHandler}
                    disabled={
                      isDisabled_userRegesterDate || isMultipleTask
                        ? dayjs(elementDate).isBefore(today, "day")
                        : ""
                    }
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
