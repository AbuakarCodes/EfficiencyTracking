import { useState } from "react"
import { Credentials } from "../utils/axios_Credentials"
import { useNavigate } from "react-router"
import { delete_URL, logout_URL } from "../../API_EndPoints"
import axios from "axios"
import Navbar from "../Components/navbar"
import DotLoder from "../utils/Loders/dotLoder"
import { useAuthContext } from "../Contexts/AuthProvider.jsx"
import ChangePassword from "../Components/ChangePassword.jsx"
import { toast } from "react-toastify"

export default function Profile() {
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAuthContext()
  const [isLoding, setisLoding] = useState(false)
  const [showPasswordPopup, setshowPasswordPopup] = useState(false)
  const [updatedPassDate, setupdatedPassDate] = useState("")
  

  async function logoutHandler() {
    try {
      setisLoding(true)
      const res = await axios.get(logout_URL, Credentials)
      setIsLoggedIn(false)
      setisLoding(false)
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message)
      setisLoding(false)
      alert(error.response?.data?.message || "Something went wrong")
      console.error(error.response?.data?.message || "Something went wrong")
    }
  }

  async function deleteAccountHandler() {
    try {
      setisLoding(true)
      const res = await axios.get(delete_URL, Credentials)
      toast.warning("Account deleted")
      setIsLoggedIn(false)
      setisLoding(false)
      navigate("/")
    } catch (error) {
      setisLoding(false)
      toast(error.response?.data?.message || "Something went wrong", {theme:"dark"})
      console.error(error.response?.data?.message || "Something went wrong")
    }
  }

  function PassWordPopUPHandler() {
     setshowPasswordPopup((prev)=>{
      sessionStorage.setItem("showPasswordPopup", !prev)
      return !prev
     })
  }

  return (
    <>
      {showPasswordPopup && <ChangePassword setisLoding={setisLoding}
       setshowPasswordPopup={setshowPasswordPopup}  setupdatedPassDate={setupdatedPassDate} />}
      <Navbar></Navbar>
      {isLoding && <DotLoder></DotLoder>}
      <div className="bg-background-light font-display text-primary ">
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 justify-center p-4 sm:p-6 md:p-10">
            <div className="w-full max-w-2xl space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-primary dark:text-background-light">
                  Profile Settings
                </h1>
                <p className="mt-1 text-primary/60 dark:text-background-light/60">
                  Manage your profile, password, and account settings.
                </p>
              </div>

              <div className="space-y-6 rounded-lg border border-black/20  p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-16 w-16 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAp-eQBizWtgFxljxdyfXP_NRFJ0tuaLYNs1wUpYJCjFNqlf2FzTrfOM4mHKJVzrAqZYEPfNZXKsVa5HPHB_kokDSoo_g_G_OFzfgaUapEeHBCllU3EO_FMYUqhwYh4rs4EiZM6I1HsMBcQIZNQBrqXT_2ctzNU47nLMB5AtFxJmMSVW2ILWFbX_fPfU8z48-tVeiqnoA-w-4HFL1DqlWCIryJH0XN5UjDyx3KyC9Efu262KrGY1WMuw-FvmeZQXqRhYWEq2YDxBA")',
                      }}
                    ></div>
                    <div>
                      <h3 className="text-lg font-bold text-primary dark:text-background-light">
                        Sophia Carter
                      </h3>
                      <p className="text-sm text-primary/60 dark:text-background-light/60">
                        sophia.carter
                      </p>
                    </div>
                  </div>

                  <button className="flex items-center justify-center gap-2 rounded bg-primary/10 dark:bg-background-light/10 px-4 py-2 text-sm font-medium hover:bg-primary/20 dark:hover:bg-background-light/20">
                    <span className="material-symbols-outlined text-base">
                      edit
                    </span>
                    <span>Change Picture</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-primary/80 dark:text-background-light/80">
                      Name
                    </dt>
                    <dd className="text-primary/60 dark:text-background-light/60 sm:col-span-2">
                      Sophia Carter
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-primary/80 dark:text-background-light/80">
                      Email
                    </dt>
                    <dd className="text-primary/60 dark:text-background-light/60 sm:col-span-2">
                      sophia.carter@email.com
                    </dd>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-black/20  p-6">
                <h3 className="text-lg font-bold text-primary dark:text-background-light">
                  Password
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-primary/60 dark:text-background-light/60">
                    {`Last changed ${updatedPassDate}`}
                  </p>
                  <button
                    onClick={PassWordPopUPHandler}
                    className=" hover:bg-black hover:text-white p-2 transition-all duration-200 cursor-pointer  flex items-center justify-center rounded bg-primary/10 dark:bg-background-light/10 px-4 py-2 text-sm font-medium hover:bg-primary/20 dark:hover:bg-background-light/20"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-red-500/30 p-6">
                <h3 className="text-lg font-bold text-red-500">Danger Zone</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-primary/60 dark:text-background-light/60">
                    Deleting your account is permanent and cannot be undone.
                  </p>
                  <button
                    onClick={deleteAccountHandler}
                    className="flex items-center justify-center rounded bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20"
                  >
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="flex justify-end ">
                <button
                  onClick={logoutHandler}
                  disabled={isLoding}
                  className={`${
                    isLoding ? "cursor-not-allowed" : ""
                  } flex items-center justify-center  bg-black  text-sm  text-white 
                  hover:bg-black/90 w-full sm:w-auto rounded  px-6 py-2 font-bold cursor-pointer`}
                >
                  Log Out
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
