import React, { useState } from "react"
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
  const { Yaxis, Xaxis, EfficiencyGraphLoding } = useAppContext()

  const data = {
    labels: Xaxis,
    datasets: [
      {
        label: "Efficiency",
        data: Yaxis,
        borderColor: "purple",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.35,
      },
    ],
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {EfficiencyGraphLoding ? (
        <DotLoder />
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  )
}

export default Comparison_LineChart
