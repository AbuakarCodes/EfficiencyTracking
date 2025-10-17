import ReactDOM from "react-dom"

function DotLoder() {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      {/* <div className="bg-white p-6 rounded-lg shadow-lg relative"> */}
      <div className="flex space-x-2 justify-center items-center  h-screen">
        <div className="h-4 md:h-8 w-4 md:w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 md:h-8 w-4 md:w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 md:h-8 w-4 md:w-8 bg-black rounded-full animate-bounce"></div>
        {/* </div> */}
      </div>
    </div>,
    document.getElementById("portal-root") // 👈 destination
  )
}

export default DotLoder
