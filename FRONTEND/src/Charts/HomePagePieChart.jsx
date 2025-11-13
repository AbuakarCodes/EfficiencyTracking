import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js"
import { useTodoContext } from "../Contexts/TodosAPIContext"
import InitialAnimation from "../utils/MotionComponents/InitialAnimation"
import dayjs from "dayjs"
import { useEffect } from "react"

// Register chart components
ChartJS.register(ArcElement, Tooltip)

export default function HomePagePieChart() {
  const {
    specificDateEfficiency,
    setspecificDateEfficiency,
    homePageChartDate,
    isMultipleTask,
  } = useTodoContext()

  useEffect(() => {
    if (isMultipleTask) setspecificDateEfficiency(0)
  }, [isMultipleTask])

  const data = {
    datasets: [
      {
        data: [specificDateEfficiency, 100 - specificDateEfficiency],
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
      <div className="flex-1 flex items-center justify-center flex-col ">
        <div className="w-42 h-42 relative  ">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-semibold text-black">
              {Math.trunc(specificDateEfficiency)}%
            </span>
          </div>
        </div>

        <div className=" flex items-center justify-center w-50 md:w-80 no-scrollbar overflow-x-auto gap-2 text-center mt-1 ">
          {Array.isArray(homePageChartDate)
            ? homePageChartDate.map((date, idx, originalArray) =>
                originalArray.length == 1 ? (
                  <p key={idx}> {dayjs(date).format("DD/MM/YYYY")}</p>
                ) : (
                  <p key={idx}> {dayjs(date).format("D/MM/YY")}</p>
                )
              )
            : dayjs(homePageChartDate).format("DD/MM/YYYY")}
        </div>
      </div>

      {/* text */}
      <div className="  flex-1 hidden md:flex items-center justify-center text-center">
        <InitialAnimation>
          <div className="italic">
            “True efficiency isn’t measured by how much we do, but by how wisely
            we use our time and energy. When we focus on what truly matters,
            every effort becomes more meaningful — and even small steps lead to
            big progress.”
          </div>
        </InitialAnimation>
      </div>
    </div>
  )
}
