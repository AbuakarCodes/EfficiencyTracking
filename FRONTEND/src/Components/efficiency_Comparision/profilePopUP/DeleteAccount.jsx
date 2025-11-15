import axios from "axios"
import { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ImCross } from "react-icons/im"
import { toast } from "react-toastify"
import { delete_URL } from "../../../../API_EndPoints"
import { Credentials } from "../../../utils/axios_Credentials"
import DotLoder from "../../../utils/Loders/dotLoder"
import InitialAnimation from "../../../utils/MotionComponents/InitialAnimation"
import { useAuthContext } from "../../../Contexts/AuthProvider"
import { useNavigate } from "react-router"

export default function DeleteAccountPopup({
  setshowPasswordPopup,
  setisLoding,
}) {
  const elementRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const [isBorderRed, setisBorderRed] = useState(false)
  const [isAgreed, setisAgreed] = useState(false)
  const form_Ref = useRef(null)
  const { User } = useAuthContext()
  const Navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setshowPasswordPopup(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  async function submithandler(data) {
    if (!isAgreed) {
      toast.error("You must agree to delete your account!", { theme: "dark" })
      return
    }

    if (data.email !== User?.email) {
      setisBorderRed(true)
      return
    }

    try {
      setisLoding(true)
      const res = await axios.post(delete_URL, data, Credentials)
      Navigate("/signin")
      setisLoding(false)
      setshowPasswordPopup(false)
    } catch (err) {
      setisLoding(false)
      toast.error(err?.response?.data?.message || "Something went wrong", {
        theme: "dark",
      })
    }
  }

  function formClick_handler(e) {
    if (form_Ref.current && form_Ref.current.contains(e.target)) {
      setisBorderRed(false)
    }
  }

  return (
    <InitialAnimation Y={0}>
      {isSubmitting && <DotLoder />}
      <div className="fixed inset-0 bg-black/55 min-h-screen flex flex-col items-center justify-center">
        <div className="py-6 px-4">
          <div
            ref={elementRef}
            className="bg-white border border-black/70 rounded-2xl p-8 max-w-md shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)] backdrop-blur max-lg:mx-auto"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setshowPasswordPopup(false)}
                className="cursor-pointer"
              >
                <ImCross />
              </button>
            </div>

            <form
              ref={form_Ref}
              onMouseDown={formClick_handler}
              onSubmit={handleSubmit(submithandler)}
              className="space-y-6"
            >
              <div className={`${isBorderRed ? "mb-1" : "mb-12"}`}>
                <h1 className="text-4xl font-semibold text-red-400">
                  Delete Account
                </h1>
                <p className="text-black/30 mt-4 text-[15px] leading-relaxed">
                  Permanently remove your account and all data by confirming
                  below.
                </p>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative flex flex-col items-center gap-y-1.5">
                  <input
                    {...register("email", { required: true })}
                    name="email"
                    type="email"
                    required
                    onClick={() => setisBorderRed(false)}
                    className={`${
                      isBorderRed
                        ? "border-red-700 focus:border-red-700 underline text-red-700 border-2"
                        : "border-black/30 focus:border-black "
                    } w-full text-sm text-black border border-black/30 pl-4 pr-10 py-3 rounded-lg focus:border-black placeholder-gray-500`}
                    placeholder="Enter your email"
                  />
                  {isBorderRed ? (
                    <span className="text-red-700">Email didin't match</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("Password", { required: true })}
                    name="Password"
                    required
                    className="w-full text-sm text-black border pl-4 pr-10 py-3 rounded-lg placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="checkbox"
                    id="isAgreed"
                    className="w-4 h-4 text-black bg-black border-black rounded"
                    checked={isAgreed}
                    onChange={() => setisAgreed((prev) => !prev)}
                  />
                  <label htmlFor="isAgreed" className="text-black text-sm">
                    I agree to delete my account
                  </label>
                </div>
              </div>

              <div className="mt-10">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3 px-4 text-[15px] font-medium rounded-lg bg-black text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </InitialAnimation>
  )
}
