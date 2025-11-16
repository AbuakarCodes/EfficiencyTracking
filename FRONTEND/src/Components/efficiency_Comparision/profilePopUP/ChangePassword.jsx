import axios from "axios"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { ImCross } from "react-icons/im"

import DotLoder from "../../../utils/Loders/dotLoder"
import { toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"
import { changePassword_URL } from "../../../../API_EndPoints"
import { Credentials } from "../../../utils/axios_Credentials"
import InitialAnimation from "../../../utils/MotionComponents/InitialAnimation"
import { Click_AnyWhere_to_Close } from "../../../utils/Click_AnyWhere_to_Close"

export default function ChangePassword({
  setshowPasswordPopup,
  setisLoding,
  setupdatedPassDate,
}) {
  const [isBorderRed, setisBorderRed] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const elementRef = useRef(null)

  useEffect(() => {
    const CleanUP = Click_AnyWhere_to_Close(elementRef, setshowPasswordPopup)
    return CleanUP
  }, [])

  function PassWordPopUPhandler(params) {
    setshowPasswordPopup((prev) => {
      sessionStorage.setItem("isPasswordUpdating", false)
      return false
    })
  }

  async function submithandler(data) {
    const { newPassword, confirmPasword } = data
    if (newPassword !== confirmPasword) {
      toast.error("Passwords do not match!")
      setisBorderRed(true)
      return
    }
    try {
      setisLoding(true)
      const res = await axios.post(changePassword_URL, data, Credentials)
      toast.success(res?.data?.message || "Password change sucessfully")
      setisLoding(false)
      setshowPasswordPopup(false)
    } catch (error) {
      setisLoding(false)
      toast.error(
        error.response?.data?.message || "Somethingswswswsws went wrong",
        {
          theme: "dark",
        }
      )
    }
  }
  return (
    <InitialAnimation Y={0}>
      {isSubmitting && <DotLoder></DotLoder>}
      <div className="fixed inset-0 bg-black/55 min-h-screen flex flex-col items-center justify-center">
        <div className="py-6 px-4">
          {/* ---- Form Section ---- */}
          <div
            ref={elementRef}
            className=" bg-white/90 border border-black/70 rounded-2xl p-8  max-w-md shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)]  backdrop-blur max-lg:mx-auto"
          >
            <div className=" flex justify-end ">
              <button onClick={PassWordPopUPhandler} className="cursor-pointer">
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
                <p className="text-black/30 mt-4 text-[15px] leading-relaxed">
                  Secure your account by updating your password and keep
                  exploring.
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
                    // type="password"
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
                    onChange={() => setisBorderRed(false)}
                    name="newPassword"
                    required={true}
                    // type="password"
                    className={` ${
                      isBorderRed
                        ? " border-red-700  focus:border-red-700 "
                        : "border-black/30  focus:border-black "
                    } w-full text-sm text-black border
                     pl-4 pr-10 py-3 rounded-lg 
                      placeholder-gray-500`}
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
                    onChange={() => setisBorderRed(false)}
                    name="confirmPasword"
                    required={true}
                    // type="password"
                    className={` ${
                      isBorderRed
                        ? " border-red-700  focus:border-red-700 "
                        : "border-black/30  focus:border-black "
                    } w-full text-sm text-black border
                     pl-4 pr-10 py-3 rounded-lg 
                      placeholder-gray-500`}
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
    </InitialAnimation>
  )
}
