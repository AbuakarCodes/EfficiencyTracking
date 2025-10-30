import EfficiencyChart from "./Charts/HomePagePieCgart"
import Calendar from "./Components/calender"
import Navbar from "./Components/navbar"
import Todo from "./Components/ToDo"
import InitialAnimation from "./utils/MotionComponents/InitialAnimation"
import ToDoApiProvider from "./Contexts/TodosAPIContext"

function App() {
  return (
    <>
      <ToDoApiProvider>
        <div className="flex flex-col gap-y-[2rem] ">
          <InitialAnimation>
            <Navbar/>
          </InitialAnimation>
          {/* chart */}
          <InitialAnimation>
            <EfficiencyChart  />
          </InitialAnimation>

          <div className="container p-4 flex flex-col md:flex-row  mx-auto">
            {/* Calender */}
            <div className="flex-1 ">
              <InitialAnimation>
                <Calendar />
              </InitialAnimation>
            </div>
            {/* Todo */}
            <div className="flex-1">
              <InitialAnimation>
                <Todo />
              </InitialAnimation>
            </div>
          </div>
        </div>
      </ToDoApiProvider>
    </>
  )
}

export default App
