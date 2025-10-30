import dayjs from "dayjs"
import { createContext, useContext, useRef, useState } from "react"

const TodoContext = createContext()

export const useTodoContext = () => useContext(TodoContext)

export function ToDoApiProvider({ children }) {
  const [Todos, setTodos] = useState([])
  const [isTodoLoding, setisTodoLoding] = useState(false)
  const [specificDateEfficiency, setspecificDateEfficiency] = useState(0)

  const Today = dayjs().format("YYYY/MM/DD")
  let API_dateID = useRef([Today])
  let API_goals = useRef({ goals: [] })
  const sendApiData = useRef({})

  const value = {
    Todos,
    setTodos,
    isTodoLoding,
    setisTodoLoding,
    API_dateID,
    API_goals,
    sendApiData,
    specificDateEfficiency,
    setspecificDateEfficiency,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export default ToDoApiProvider
