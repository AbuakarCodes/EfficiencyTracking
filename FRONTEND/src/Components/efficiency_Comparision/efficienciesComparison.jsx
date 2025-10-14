import Comparison_LineChart from "../../Charts/ComparisionChart.jsx"
import { useAppContext } from "../../hooks/useCustomContext.jsx"
import PeriodSelector from "./ComparisionDate"
import ToggleButton from "./ComparisionTogel"
import Dropdown from "./ComparisonDromdown"
function EfficienciesComparison() {
  const { showComparision } = useAppContext()
  return (
    <>
      <div className="container mx-auto flex flex-col  gap-y-2.5">
        <h1 className="p-4 text-[2rem] italic">Chart</h1>
        <div className=" flex flex-col gap-y-[1rem]  md:p-5 p-4 rounded-[.3rem] border-black/20 border-[1px]">
          <div className="flex items-center gap-x-6 md:gap-x-[3rem]  ">
            <Dropdown></Dropdown>
            <ToggleButton></ToggleButton>
          </div>
          {showComparision ? <PeriodSelector /> : ""}
        </div>
        <div className="w-full h-[30rem] ">
          <Comparison_LineChart />
        </div>
      </div>
    </>
  )
}

export default EfficienciesComparison
