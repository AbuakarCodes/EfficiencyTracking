import Comparison_LineChart from "../../Charts/ComparisionChart.jsx"
import { useAppContext } from "../../hooks/useCustomContext.jsx"
import InitialAnimation from "../../utils/MotionComponents/InitialAnimation.jsx"
import PeriodSelector from "./ComparisionDate"
import ToggleButton from "./ComparisionTogel"
import Dropdown from "./ComparisonDromdown"
import InputDate from "./inputDate.jsx"
function EfficienciesComparison() {
  const { showComparision } = useAppContext()
  return (
    <InitialAnimation>
      <div className="container mx-auto flex flex-col  gap-y-2.5">
        <h1 className="p-4 text-[2rem] italic">Chart</h1>
        <div className=" flex flex-col gap-y-[1rem]  md:p-5 p-4 rounded-[.3rem] border-black/20 border-[1px]">
          <div className="flex md:items-center gap-2  md:gap-x-[3rem] flex-col md:flex-row  ">
            <Dropdown></Dropdown>
            <InputDate />
            <ToggleButton></ToggleButton>
          </div>
          {showComparision ? <PeriodSelector /> : ""}
        </div>
        <div className="w-full h-[30rem] ">
          <Comparison_LineChart />
        </div>
      </div>
    </InitialAnimation>
  )
}

export default EfficienciesComparison
