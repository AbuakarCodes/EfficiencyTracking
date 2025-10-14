import React, { useState } from "react"

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input.trim() === "") return
    const newTodo = { id: Date.now(), text: input, done: false }
    setTodos([...todos, newTodo])
    setInput("")
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="flex justify-center items-center bg-white text-black">
      <div className="w-96 rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">
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
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border border-gray-300 rounded-md p-2 hover:bg-gray-100"
            >
              {/* Wrapper to enforce text wrapping */}
              <div className="flex-1 min-w-0">
                <span
                  onClick={() => toggleTodo(todo.id)}
                  className={`block w-full cursor-pointer break-words whitespace-normal ${
                    todo.done ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 cursor-pointer font-bold hover:text-red-800 ml-2 flex-shrink-0"
              >
                ✕
              </button>
            </li>
          ))}                
        </ul>
      </div>
    </div>
  )
}
