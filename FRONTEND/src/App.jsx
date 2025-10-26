import EfficiencyChart from "./Charts/HomePagePieCgart"
import Calendar from "./Components/calender"
import Navbar from "./Components/navbar"
import Todo from "./Components/ToDo"
import { useAuthContext } from "./Contexts/AuthProvider"
import { motion } from "framer-motion"
import InitialAnimation from "./utils/MotionComponents/InitialAnimation"

function App() {
  return (
 <>
     <div className="flex flex-col gap-y-[2rem] ">
      <InitialAnimation>
        <Navbar></Navbar>
      </InitialAnimation>

      <InitialAnimation>
        <EfficiencyChart value={22} />
      </InitialAnimation>

      {/* Calender TODO */}
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
 </>
  )
}

export default App
