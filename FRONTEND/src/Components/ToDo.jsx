import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import { useTodoContext } from "../Contexts/TodosAPIContext"
import { add_MultipleTodos_URL, addupdateTodo_url } from "../../API_EndPoints"
import { apiCall_addTodos } from "../utils/todoAPIcalls/apiCall_addTodos.jsx"
import { apiCall_fetchRemoteTodos } from "../utils/todoAPIcalls/apiCall_fetchRemoteTodos.jsx"
import { apiCall_changeTodoState } from "../utils/todoAPIcalls/apiCall_changeTodoState.jsx"
import { apiCall_deleteTodo } from "../utils/todoAPIcalls/apiCall_deleteTodo.jsx"
import { apiCall_SettedTodo } from "../utils/todoAPIcalls/apiCall_SettedTodo.jsx"
import TodoListLoder from "../utils/Loders/TodoListLoder.jsx"
import dayjs from "dayjs"

export default function TodoComponent() {
  const [input, setInput] = useState("")
  const [isDisable, setisDisable] = useState({
    isClickedDate_bigger_thenToday: false,
    isClickedDate_smaller_thenToday: false,
    isClickedDate_equalsToToday: true,
  })
  const today = dayjs().format("YYYY/MM/DD")

  const {
    API_goals,
    sendApiData,
    API_dateID,
    setspecificDateEfficiency,
    Todos,
    setTodos,
    isTodoLoding,
    setisTodoLoding,
    isMultipleTask,
    setSettedTodosDate,
    clickedDates,
  } = useTodoContext()

  useEffect(() => {
    if (isMultipleTask || clickedDates.length === 0) return

    setisDisable(() => {
      if (dayjs(clickedDates[0].date).isSame(today, "day")) {
        return {
          isClickedDate_bigger_thenToday: false,
          isClickedDate_smaller_thenToday: false,
          isClickedDate_equalsToToday: true,
        }
      } else if (dayjs(clickedDates[0].date).isBefore(today, "day")) {
        return {
          isClickedDate_bigger_thenToday: false,
          isClickedDate_smaller_thenToday: true,
          isClickedDate_equalsToToday: false,
        }
      } else if (dayjs(clickedDates[0].date).isAfter(today, "day")) {
        return {
          isClickedDate_bigger_thenToday: true,
          isClickedDate_smaller_thenToday: false,
          isClickedDate_equalsToToday: false,
        }
      }
    })
  }, [clickedDates])

  useEffect(() => {
    if (isMultipleTask) return
    ;(async function () {
      const RemoteTodo = await apiCall_fetchRemoteTodos(
        API_dateID,
        setisTodoLoding,
        setspecificDateEfficiency,
        isMultipleTask
      )
      setTodos(Array.isArray(RemoteTodo) ? RemoteTodo : [])
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      try {
        const response = await apiCall_SettedTodo()
        setSettedTodosDate(response?.data?.data || [])
      } catch (error) {
        setSettedTodosDate([])
      }
    })()
  }, [Todos])

  const addTodo = () => {
    if (input.trim() === "") return
    const newTodo = {
      todo_id: Date.now().toString(),
      text: input,
      isCompleted: false,
    }
    const UpdatedTodos = [...Todos, newTodo]
    setTodos(UpdatedTodos)
    setInput("")

    // API call
    apiDataBundel(UpdatedTodos)

    apiCall_addTodos(
      isMultipleTask ? add_MultipleTodos_URL : addupdateTodo_url,
      sendApiData.current,
      setspecificDateEfficiency
    )
  }

  const toggleTodo = (id) => {
    const TogeledTodo = Todos.map((element) =>
      element.todo_id == id
        ? { ...element, isCompleted: !element.isCompleted }
        : element
    )
    const newState = TogeledTodo.find(
      (element) => element.todo_id == id
    ).isCompleted
    setTodos(TogeledTodo)
    if (!isMultipleTask)
      apiCall_changeTodoState(
        API_dateID,
        id,
        newState,
        setspecificDateEfficiency
      )
  }

  const deleteTodo = (id) => {
    setTodos(Todos.filter((element) => element.todo_id !== id))
    apiCall_deleteTodo(API_dateID, id, setspecificDateEfficiency)
  }

  // Api Functions
  async function apiDataBundel(newTodo) {
    try {
      API_goals.current.goals = newTodo
      sendApiData.current["date_id"] = API_dateID.current
      sendApiData.current["goals"] = API_goals.current.goals
    } catch (error) {
      console.log(error?.message)
    }
  }

  return (
    <div className="flex justify-center items-center   text-black ">
      <div className="w-96 rounded-2xl shadow-lg p-6   ">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6  ] ">
          My To-Do List
        </h1>

        {/* Input Section */}
        <div className="flex mb-4">
          <input
            disabled={isDisable.isClickedDate_smaller_thenToday}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className=" disabled:cursor-not-allowed disabled:opacity-65 flex-grow border border-black rounded-l-md p-2 outline-none"
          />
          <button
            disabled={isDisable.isClickedDate_smaller_thenToday}
            onClick={addTodo}
            className="bg-black disabled:cursor-not-allowed disabled:opacity-65 text-white px-4 rounded-r-md hover:bg-gray-800"
          >
            Add
          </button>
        </div>

        {/* To-Do Items */}
        <div className=" overflow-x-auto max-h-[20rem] no-scrollbar scroll-smooth  ">
          {isTodoLoding ? (
            <TodoListLoder />
          ) : (
            <>
              <ul className="space-y-2">
                {Todos?.map((todo) => {
                  return (
                    <li
                      key={uuidv4()}
                      className="flex items-center justify-between border border-gray-300 rounded-md p-2 hover:bg-gray-100"
                    >
                      {/* Wrapper to enforce text wrapping */}
                      <div className="flex-1 min-w-0">
                        <button
                          disabled={!isDisable.isClickedDate_equalsToToday}
                          onClick={() => toggleTodo(todo?.todo_id)}
                          className={`block disabled:cursor-not-allowed disabled:opacity-65 w-full cursor-pointer break-words whitespace-normal ${
                            todo.isCompleted ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.text}
                        </button>
                      </div>

                      <button
                        disabled={isDisable.isClickedDate_smaller_thenToday}
                        onClick={() => deleteTodo(todo?.todo_id)}
                        className=" disabled:opacity-65 text-red-600 cursor-pointer disabled:cursor-not-allowed font-bold hover:text-red-800 ml-2 flex-shrink-0"
                      >
                        ✕
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
