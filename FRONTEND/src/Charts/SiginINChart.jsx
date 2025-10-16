import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"

ChartJS.register(ArcElement, Tooltip)

export default function EfficiencyChart({ value = Math.floor(Math.random()*100) }) {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#000", "#e5e5e5"],
        borderWidth: 0,
        cutout: "90%",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
  }

  return (
    <div className="relative h-[20rem]">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold text-black">{value}%</span>
      </div>
    </div>
  )
}
