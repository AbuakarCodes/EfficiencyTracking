import EfficiencyChart from "./Charts/HomePagePieCgart"
import Calendar from "./Components/calender"
import Navbar from "./Components/navbar"
import Todo from "./Components/ToDo"

function App() {
  return (
    <div className="flex flex-col gap-y-[2rem] ">
      <Navbar></Navbar>
      <EfficiencyChart value={22}></EfficiencyChart>
      {/* Calender TODO */}
      <div className="container p-4 flex flex-col md:flex-row  mx-auto">
        {/* Calender */}
        <div className="flex-1 ">
          <Calendar />
        </div>
        {/* Todo */}
        <div className="flex-1">
          <Todo />
        </div>
      </div>
    </div>
  )
}

export default App
