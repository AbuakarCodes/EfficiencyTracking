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


  // reusable dataset factory
  const createDataset = (data, color, label) => ({
    label: label,
    data,
    borderColor: color,
    borderWidth: 2,
    pointRadius: 3,
    tension: 0.35,
  })

  const PlotingValues = showComparision
    ? [
        createDataset(periodA?.Yaxis || [], "#14B8A6", "periodA"),
        createDataset(periodB?.Yaxis || [], "purple", "periodA"),
      ]
    : [createDataset(Yaxis, "#14B8A6", "Efficiency")]

  const data = {
    labels: showComparision ? periodA.XAxis || 0 : Xaxis,
    datasets: PlotingValues,
  }

  // Fixing data Labels
  const updatedOptions = {
    ...options, 
    scales: {
      ...options.scales, 
      x: {
        ...options.scales.x, 
        title: {
          ...options.scales.x.title, 
          text: showComparision? `${dataDropdownselected}'s`:dataDropdownselected, 
        },
      },
    },
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {EfficiencyGraphLoding ? (
        <DotLoder />
      ) : (
        <Line data={data} options={updatedOptions} />
      )}
    </div>
  )
}

export default Comparison_LineChart
