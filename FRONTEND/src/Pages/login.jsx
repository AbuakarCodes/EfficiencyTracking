import axios from "axios"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { Login_URL } from "../../API_EndPoints"
import { Credentials } from "../utils/axios_Credentials"
import { useAuthContext } from "../Contexts/AuthProvider"
import DotLoder from "../utils/Loders/dotLoder"

export default function Login() {
  const { IsLoggedIn, setIsLoggedIn } = useAuthContext()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  async function submithandler(data) {
    try {
      const res = await axios.post(Login_URL, data, Credentials)
      reset()
      setIsLoggedIn(true)
      navigate("/")
    } catch (error) {
      alert(error?.response?.data?.message)
      console.log(error?.response?.data?.message || "Somthing went wrong")
    }
  }

  return (
    <>
      {isSubmitting && <DotLoder></DotLoder>}
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="py-6 px-4">
          {/* ---- Form Section ---- */}
          <div className="border border-black/20 rounded-2xl p-8 max-w-md shadow-[0_0_25px_-5px_rgba(255,255,255,0.2)]  backdrop-blur max-lg:mx-auto">
            <form onSubmit={handleSubmit(submithandler)} className="space-y-6">
              <div className="mb-12">
                <h1 className="text-4xl font-semibold text-black">Log in</h1>
                <p className="text-black mt-4 text-[15px] leading-relaxed">
                  Login in to your account and explore endless possibilities.
                </p>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("email", { required: true })}
                    name="email"
                    required={true}
                    type="email"
                    className="w-full text-sm text-black border border-black/30 pl-4 pr-10 py-3 rounded-lg  focus:border-black placeholder-gray-500"
                    placeholder="Enter user name"
                  />
                </div>
              </div>

              <div>
                <label className="text-black text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    {...register("password", { required: true })}
                    name="password"
                    required={true}
                    type="password"
                    className="w-full text-sm text-black border border-black/30 pl-4 pr-10 py-3 rounded-lg  focus:border-black placeholder-gray-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <div className="text-sm">
                  <Link
                    to="#"
                    className="text-black/90 hover:underline transition"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-3 px-4 text-[15px] font-medium rounded-lg bg-black text-white hover:bg-black/90 transition-all duration-200 cursor-pointer"
                >
                  Log in
                </button>
                <p className="text-sm mt-6 text-center text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to={"/signin"}
                    className="text-black underline hover:opacity-80"
                  >
                    SignUp here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
