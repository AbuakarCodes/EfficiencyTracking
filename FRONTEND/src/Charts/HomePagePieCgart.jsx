import React from "react"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"

// Register chart components
ChartJS.register(ArcElement, Tooltip)

export default function EfficiencyChart({ value = 75 }) {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#000", "#e5e5e5"],
        borderWidth: 0,
        cutout: "85%",
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="flex flex-col md:flex-row container mx-auto p-4  ">
      {/* chart */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-42 h-42 relative">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-semibold text-black">{value}%</span>
          </div>
          <p className="text-center mt-1">
            {new Date().toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      {/* text */}
      <div className="  flex-1 hidden md:flex items-center justify-center text-center">
        <div className="italic">
          “True efficiency isn’t measured by how much we do, but by how wisely
          we use our time and energy. When we focus on what truly matters, every
          effort becomes more meaningful — and even small steps lead to big
          progress.”
        </div>
      </div>
    </div>
  )
}
