function TodoListLoder() {
  return (
    <>
      <ul className="space-y-2">
        {[...Array(7)].map((_, i) => (
          <li
            key={i}
            className="flex items-center justify-between border border-gray-200/70 rounded-md p-2 animate-pulse"
          >
            <div className="flex-1 min-w-0">
              <div className="h-5 bg-gray-200/70 rounded w-[95%] mb-1"></div>
            </div>

            <div className="h-4 w-4 bg-gray-200/70 rounded-full ml-2"></div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoListLoder
