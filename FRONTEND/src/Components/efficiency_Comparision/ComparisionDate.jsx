import { useRef, useState } from "react"
import { useAppContext } from "../../hooks/useCustomContext.jsx"
import { useForm } from "react-hook-form"
import { IoIosGitCompare } from "react-icons/io"
import InitialAnimation from "../../utils/MotionComponents/InitialAnimation.jsx"

export default function PeriodSelector() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const { dataDropdownselected } = useAppContext()

  let type = null
  if (dataDropdownselected === "Day") type = "date"
  if (dataDropdownselected === "Month") type = "month"
  if (dataDropdownselected === "Year") type = "number"

  function submithandler(data) {
    console.log(data)
  }

  return (
    <InitialAnimation Y={-20} >
      <div className="w-full  mx-auto ">
        <form onSubmit={handleSubmit(submithandler)} className="flex flex-col ">
          <div className=" gap-4 flex flex-col md:flex-row">
            {/* Period A */}
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-black  px-3 py-2 rounded-t">
                Period A
              </label>
              <input
                {...register("periodA", { required: true })}
                name="periodA"
                type={type}
                className="w-full border border-black/30 px-3 py-2 rounded-b text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Period B */}
            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-black  px-3 py-2 rounded-t">
                Period B
              </label>
              <input
                {...register("periodB", { required: true })}
                name="periodB"
                type={type}
                className="w-full border border-black/30 px-3 py-2 rounded-b text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={
                "cursor-pointer rounded-[5px] px-3 py-1 bg-black text-white border-[1px] border-black/20"
              }
            >
              {isSubmitting ? "..." : `Compare`}
            </button>
          </div>
        </form>
      </div>
    </InitialAnimation>
  )
}
