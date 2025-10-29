import dayjs from "dayjs"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import { useTodoContext } from "../Contexts/TodosAPIContext"
import { useAuthContext } from "../Contexts/AuthProvider"
import { addupdateTodo_url } from "../../API_EndPoints"
import { apiCall_addTodos } from "../utils/todoAPIcalls/apiCall_addTodos.jsx"
import { apiCall_fetchRemoteTodos } from "../utils/todoAPIcalls/apiCall_fetchRemoteTodos.jsx"
import { apiCall_changeTodoState } from "../utils/todoAPIcalls/apiCall_changeTodoState.jsx"
import { apiCall_deleteTodo } from "../utils/todoAPIcalls/apiCall_deleteTodo.jsx"
import TodoListLoder from "../utils/Loders/TodoListLoder.jsx"

export default function TodoComponent() {
  const { API_goals, API_dateID } = useTodoContext()
  const { setspecificDateEfficiency } = useTodoContext()
  const { sendApiData } = useTodoContext()
  const { user_Id } = useAuthContext()
  const [isLoding, setisLoding] = useState(false)
  const [Todos, setTodos] = useState([])
  useEffect(() => {
    ;(async function () {
      setisLoding(true)
      const { RemoteTodo } = await apiCall_fetchRemoteTodos(setspecificDateEfficiency)
      setisLoding(false)
      setTodos(RemoteTodo)
    })()
  }, [])

  const [input, setInput] = useState("")

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
    addAPI(UpdatedTodos)
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
    apiCall_changeTodoState(API_dateID, id, newState)
  }

  const deleteTodo = (id) => {
    setTodos(Todos.filter((element) => element.todo_id !== id))
    apiCall_deleteTodo(API_dateID, id)
  }

  // Api Functions
  async function addAPI(newTodo) {
    try {
      API_goals.current.goals = newTodo

      sendApiData.current["user_id"] = user_Id
      sendApiData.current["date_id"] = API_dateID.current[0]
      sendApiData.current["month"] = dayjs(API_dateID.current[0]).month() + 1
      sendApiData.current["year"] = dayjs(API_dateID.current[0]).year()
      sendApiData.current["goals"] = API_goals.current.goals

      apiCall_addTodos(addupdateTodo_url, sendApiData.current)
    } catch (error) {
      console.log("error")
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
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow border border-black rounded-l-md p-2 outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800"
          >
            Add
          </button>
        </div>

        {/* To-Do Items */}
        <div className=" overflow-x-auto max-h-[20rem] no-scrollbar scroll-smooth  ">
          {isLoding ? (
            <TodoListLoder />
          ) : (
            <>
              <ul className="space-y-2">
                {Todos.map((todo) => {
                  return (
                    <li
                      key={uuidv4()}
                      className="flex items-center justify-between border border-gray-300 rounded-md p-2 hover:bg-gray-100"
                    >
                      {/* Wrapper to enforce text wrapping */}
                      <div className="flex-1 min-w-0">
                        <span
                          onClick={() => toggleTodo(todo.todo_id)}
                          className={`block w-full cursor-pointer break-words whitespace-normal ${
                            todo.isCompleted ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteTodo(todo.todo_id)}
                        className="text-red-600 cursor-pointer font-bold hover:text-red-800 ml-2 flex-shrink-0"
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
