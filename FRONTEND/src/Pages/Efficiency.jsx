import Navbar from "../Components/navbar"
import EfficienciesComparison from "../Components/efficiency_Comparision/efficienciesComparison"
import InitialAnimation from "../utils/MotionComponents/InitialAnimation"

function Efficiency() {
  
  return (
    <InitialAnimation>
      <Navbar></Navbar>
      <EfficienciesComparison></EfficienciesComparison>
    </InitialAnimation>
  )
}

export default Efficiency
