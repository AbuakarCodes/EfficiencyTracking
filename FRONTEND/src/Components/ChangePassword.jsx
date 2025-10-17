import axios from "axios"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { ImCross } from "react-icons/im";

import DotLoder from "../utils/Loders/dotLoder"

export default function ChangePassword({ setisPasswordUpdating }) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  async function submithandler(data) {}

  function PassWordPopUPhandler(params) {
    setisPasswordUpdating((prev)=>{
      sessionStorage.setItem("isPasswordUpdating", false)
      return false
     })
  }

  return (
    <>
      {isSubmitting && <DotLoder></DotLoder>}
      <div className="fixed inset-0 bg-black/50 min-h-screen flex flex-col items-center justify-center">
        <div className="py-6 px-4">
          {/* ---- Form Section ---- */}
          <div className=" bg-white/60 border border-black/70 rounded-2xl p-8  max-w-md shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)]  backdrop-blur max-lg:mx-auto">
            <div className=" flex justify-end ">
              <button
                onClick={PassWordPopUPhandler}
                className="cursor-pointer"
              >
                <ImCross />
              </button>
            </div>
            <form
              onSubmit={handleSubmit(submithandler)}
              className="space-y-6  "
            >
              <div className="mb-12">
                <h1 className="text-4xl font-semibold text-black">
                  Update Password
                </h1>
                <p className="text-black mt-4 text-[15px] leading-relaxed">
                  Login in to your account and explore endless possibilities.
                </p>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  Current Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("currentPassword", { required: true })}
                    name="currentPassword"
                    required={true}
                    type="password"
                    className="w-full text-sm text-black border border-black/30 pl-4 pr-10 py-3 rounded-lg  focus:border-black placeholder-gray-500"
                    placeholder="Enter Current Password"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("newPassword", { required: true })}
                    name="newPassword"
                    required={true}
                    type="password"
                    className="w-full text-sm text-black border border-black/30 pl-4 pr-10 py-3 rounded-lg  focus:border-black placeholder-gray-500"
                    placeholder="Enter New password"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("confirmPasword", { required: true })}
                    name="confirmPasword"
                    required={true}
                    type="password"
                    className="w-full text-sm text-black border border-black/30 pl-4 pr-10 py-3 rounded-lg  focus:border-black placeholder-gray-500"
                    placeholder="Enter New password"
                  />
                </div>
              </div>

              <div className="mt-10">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3 px-4 text-[15px] font-medium rounded-lg bg-black text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
