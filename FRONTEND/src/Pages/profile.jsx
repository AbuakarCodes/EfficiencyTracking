import { useState, useRef, useEffect } from "react"
import { Credentials } from "../utils/axios_Credentials"
import { Link, useNavigate } from "react-router"
import { logout_URL, UplodeProfileImage_URL } from "../../API_EndPoints"
import axios from "axios"
import Navbar from "../Components/navbar"
import DotLoder from "../utils/Loders/dotLoder"
import { useAuthContext } from "../Contexts/AuthProvider.jsx"
import ChangePassword from "../Components/efficiency_Comparision/profilePopUP/ChangePassword.jsx"
import { toast } from "react-toastify"
import InitialAnimation from "../utils/MotionComponents/InitialAnimation.jsx"
import DeleteAccountPopup from "../Components/efficiency_Comparision/profilePopUP/DeleteAccount.jsx"
import defaultProfileImage from "../assets/ProfileImage.svg"
import ProfileImageLoader from "../utils/Loders/ProfileIPicLoder.jsx"
import { useAppContext } from "../hooks/useCustomContext.jsx"
import { fetch_ALLTimeEfficiency } from "../utils/EfficiencyAPICall/ALLTimeEfficiency.jsx"

export default function Profile() {
  const navigate = useNavigate()
  const { setIsLoggedIn, User } = useAuthContext()
  const [isLoding, setisLoding] = useState(false)
  const [isImageFetching, setisImageFetching] = useState(false)
  const [showPasswordPopup, setshowPasswordPopup] = useState(false)
  const [showDeleteAccountPopup, setshowDeleteAccountPopup] = useState(false)
  const [updatedPassDate, setupdatedPassDate] = useState("")
  const [Avatar, setAvatar] = useState("")
  const fileInputRef = useRef(null)

  const { allTimeEfficiencyVal, setallTimeEfficiencyVal } = useAppContext()

  useEffect(() => {
    fetch_ALLTimeEfficiency(setallTimeEfficiencyVal)
  }, [])


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
    setshowDeleteAccountPopup(true)
  }

  function PassWordPopUPHandler() {
    setshowPasswordPopup((prev) => {
      sessionStorage.setItem("showPasswordPopup", !prev)
      return !prev
    })
  }

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("ProfileImage", file)
    setisImageFetching(true)
    try {
      const response = await axios.post(UplodeProfileImage_URL, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      setAvatar(response?.data?.data?.link?.url || defaultProfileImage)
    } catch (error) {
      console.error(error)
    } finally {
      setisImageFetching(false)
    }
  }

  return (
    <InitialAnimation>
      {showPasswordPopup && (
        <ChangePassword
          setisLoding={setisLoding}
          setshowPasswordPopup={setshowPasswordPopup}
          setupdatedPassDate={setupdatedPassDate}
        />
      )}
      {showDeleteAccountPopup && (
        <DeleteAccountPopup
          setisLoding={setisLoding}
          setshowPasswordPopup={setshowDeleteAccountPopup}
        />
      )}
      <Navbar />
      {isLoding && <DotLoder />}
      <div className="bg-background-light font-display text-primary">
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

              <div className="space-y-6 rounded-lg border border-black/20 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-16 w-16 overflow-hidden flex items-center justify-center rounded-full ${
                        !isImageFetching ? "border-black border-1" : ""
                      }`}
                    >
                      {isImageFetching ? (
                        <ProfileImageLoader />
                      ) : Avatar || User?.ProfileImage ? (
                        <Link
                          target="_blank"
                          className="block w-full h-full"
                          to={
                            Avatar || User?.ProfileImage || defaultProfileImage
                          }
                        >
                          <img
                            className="w-full h-full object-cover flex-shrink-0"
                            src={
                              Avatar ||
                              User?.ProfileImage ||
                              defaultProfileImage
                            }
                            alt="Image"
                          />
                        </Link>
                      ) : (
                        <div>
                          <img
                            className="w-full h-full object-cover flex-shrink-0"
                            src={defaultProfileImage}
                            alt="Image"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-primary dark:text-background-light">
                        {User?.name || ""}
                      </h3>
                      <p
                        className={`
                              w-20 h-6 font-bold text-center rounded
                              ${
                                allTimeEfficiencyVal <= 50
                                  ? "text-red-500"
                                  : allTimeEfficiencyVal <= 75
                                  ? "text-yellow-400"
                                  : allTimeEfficiencyVal <= 100
                                  ? "text-green-500"
                                  : "text-black"
                              }
                            `}
                      >
                        {allTimeEfficiencyVal
                          ? `${Number(allTimeEfficiencyVal)?.toFixed(1)} % `
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className=" disabled:cursor-not-allowed cursor-pointer bg-black/90 text-white flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium"
                      disabled={isImageFetching}
                    >
                      Change Picture
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-primary/80 dark:text-background-light/80">
                      Name
                    </dt>
                    <dd className="text-primary/60 dark:text-background-light/60 sm:col-span-2">
                      {User?.name || ""}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-primary/80 dark:text-background-light/80">
                      Email
                    </dt>
                    <dd className="text-primary/60 dark:text-background-light/60 sm:col-span-2">
                      {User?.email || ""}
                    </dd>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-black/20 p-6">
                <h3 className="text-lg font-bold text-primary dark:text-background-light">
                  Password
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-primary/60 dark:text-background-light/60">
                    {`Last changed ${updatedPassDate}`}
                  </p>
                  <button
                    onClick={PassWordPopUPHandler}
                    className="bg-black text-white p-2 transition-all duration-200 cursor-pointer flex items-center justify-center rounded bg-primary/10 dark:bg-background-light/10 px-4 py-2 text-sm font-medium hover:bg-primary/20 dark:hover:bg-background-light/20"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-black/20 p-6">
                <h3 className="text-lg font-bold text-primary dark:text-background-light">
                  Manage Accounts
                </h3>
                <div className="flex flex-col gap-1">
                  <Link
                    to="/login/:intentionalRoute"
                    className="bg-black text-white flex w-full items-center justify-center gap-2 rounded px-4 py-3 text-sm font-medium"
                  >
                    Log into another account
                  </Link>
                  <Link
                    to="/signin/:intentionalRoute"
                    className="bg-black text-white flex w-full items-center justify-center gap-2 rounded px-4 py-3 text-sm font-medium"
                  >
                    Add another account
                  </Link>
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
                    className="cursor-pointer flex items-center justify-center rounded bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/20"
                  >
                    Delete Account
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={logoutHandler}
                  disabled={isLoding}
                  className={`${
                    isLoding ? "cursor-not-allowed" : ""
                  } flex items-center justify-center bg-black text-sm text-white hover:bg-black/90 w-full sm:w-auto rounded px-6 py-2 font-bold cursor-pointer`}
                >
                  Log Out
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </InitialAnimation>
  )
}
