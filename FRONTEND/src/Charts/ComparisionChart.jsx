import React from "react"
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
import { useState } from "react"
import { options } from "./ChartOptions/ComparasionsChartOptions"

// Register chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

const Comparison_LineChart = () => {
  const [Xaxis, setXaxis] = useState([1, 2, 3, 4, 5, 6, 7, 8,4,5,56,6,76,7,78,7,8,8,8,8,8,8,8,8,8,8,])
  const [Yaxis, setYaxis] = useState([10, 2, 4, 5, 67, 88, 90])
  
  
  const data = {
    labels: Xaxis,
    datasets: [
      {
        label: "Data A",
        data: Yaxis,
        borderColor: "green",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
      },
    ],
  }



  return (
    <div className="w-full h-full flex items-center justify-center">
      <Line data={data} options={options} />
    </div>
  )
}

export default Comparison_LineChart
