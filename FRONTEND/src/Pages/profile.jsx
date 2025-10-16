// Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePic(file)
      setPreview(URL.createObjectURL(file))
    }
  }// Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updated Profile:", { ...formData, profilePic })
    alert("Profile updated successfully (demo only).")
  }

import { useEffect, useState } from "react"
import { Credentials } from "../utils/axios_Credentials"
import { logout_URL } from "../../API_EndPoints"
import axios from "axios"
import Navbar from "../Components/navbar"
import { useNavigate } from "react-router"
import { useAuthContext } from "../Contexts/AuthProvider"

export default function Profile() {
  const {IsLoggedIn,setIsLoggedIn} = useAuthContext()
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState(null)
  const [preview, setPreview] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  useEffect(() => {
    // rerender to get back on home page
  }, [IsLoggedIn])
  
  async function logoutHandler() {
    try {
      const res = await axios.get(logout_URL, Credentials)
      alert("User Loggedout")
      setIsLoggedIn(false)
      navigate("/")
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
      // navigate("/login")
      console.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
        <div className="border border-black rounded-2xl p-6 w-full max-w-md shadow-sm">
          <h1 className="text-2xl font-semibold mb-6 border-b border-black pb-2 text-center">
            Edit Profile
          </h1>

          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28 rounded-full border border-black overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <label className="mt-3 cursor-pointer border border-black px-3 py-1 rounded-lg text-sm hover:bg-black hover:text-white transition-all duration-200">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full border border-black rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full border border-black rounded-lg py-2 hover:bg-black hover:text-white transition-all duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
        <button onClick={logoutHandler}>LOGOUR</button>
      </div>
    </>
  )
}
