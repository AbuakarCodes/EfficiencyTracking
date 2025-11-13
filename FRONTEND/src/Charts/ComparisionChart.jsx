import ChartDataLabels from "chartjs-plugin-datalabels"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { options } from "./ChartOptions/ComparasionsChartOptions"
import { useAppContext } from "../hooks/useCustomContext"
import DotLoder from "../utils/Loders/dotLoder"
import { ProductName } from "../utils/Data_Bytes"

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

const Comparison_LineChart = () => {
  const {
    Yaxis,
    Xaxis,
    EfficiencyGraphLoding,
    showComparision,
    Comparison_Cordinates,
    dataDropdownselected,
  } = useAppContext()

  const periodA = Comparison_Cordinates?.periodA || {}
  const periodB = Comparison_Cordinates?.periodB || {}

  // Helper to make sure data is a plain number array
  const sanitizeData = (arr) => arr?.map(Number) || []

  // reusable dataset factory
  const createDataset = (data, color, label) => ({
    label,
    data: sanitizeData(data),
    borderColor: color,
    borderWidth: 2,
    pointRadius: 3,
    tension: 0.35,
  })

  // Build datasets dynamically
  const PlotingValues = []
  if (showComparision) {
    if ((periodA?.Yaxis || []).length) {
      PlotingValues.push(createDataset(periodA.Yaxis, "#86efac", "Period A"))
    }
    if ((periodB?.Yaxis || []).length) {
      PlotingValues.push(createDataset(periodB.Yaxis, "#fca5a5", "Period B"))
    }
  } else {
    if ((Yaxis || []).length) {
      PlotingValues.push(createDataset(Yaxis, "#14B8A6", "Efficiency"))
    }
  }

  // Set X-axis labels
  const labels = showComparision
    ? periodA?.XAxis?.length
      ? periodA.XAxis
      : periodB?.XAxis || []
    : Xaxis

  const data = {
    labels,
    datasets: PlotingValues,
  }

  // Update options with dynamic X-axis title
  const updatedOptions = {
    ...options,
    scales: {
      ...options.scales,
      x: {
        ...options.scales.x,
        title: {
          ...options.scales.x.title,
          text: showComparision
            ? `${dataDropdownselected}'s`
            : dataDropdownselected,
        },
      },
    },
  }



  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {EfficiencyGraphLoding ? <DotLoder /> : ""}
      {(
        Yaxis.length === 0 &&
        Xaxis.length === 0 &&
        Object.keys(periodA).length === 0 &&
        Object.keys(periodB).length === 0
      ) ? (
        <div className=" text-[3rem] md:text-[5rem] md:font-thin absolute left-[53%] md:left-1/2 top-[30%] -translate-x-1/2   flex items-center justify-center text-black/10">
          {ProductName || "" }
        </div>
      ): ""}

      <Line data={data} options={updatedOptions} />
    </div>
  )
}

export default Comparison_LineChart
