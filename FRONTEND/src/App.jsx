import { useEffect } from "react"
import EfficiencyChart from "./Charts/HomePagePieCgart"
import Calendar from "./Components/calender"
import Navbar from "./Components/navbar"
import Todo from "./Components/ToDo"
import Signin from "./Pages/signin"
import { useAuthContext } from "./Contexts/AuthProvider"

function App() {
  const { IsLoggedIn, isCheacking, Error} = useAuthContext()
  useEffect(() => {
    // rerender app to chech which component shoud render home or signin
  }, [IsLoggedIn])
  
  // if (!Error) {
  //   return <div>Something went wrong</div>
  // }
  // if (isCheacking) {
  //   return <div>cheakink....</div>
  // }

  return !IsLoggedIn ? (
    <Signin></Signin>
  ) : (
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
