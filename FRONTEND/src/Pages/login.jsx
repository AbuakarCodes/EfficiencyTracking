import React from "react"
import Navbar from "../Components/navbar"

export default function Login() {
  return (
    <main className="min-h-screen flex flex-col ">
      {/* Navbar */}
      <Navbar></Navbar>
      {/* Login Card */}
      <section className="flex-1 grid place-items-center px-4 py-8">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Login
          </h2>

          {/* User Icon */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User Avatar"
              className="rounded-full"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-1 rounded-md hover:bg-gray-800 transition"
          >
            Sign In
          </button>

          {/* Footer Text */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            New here?{" "}
            <a href="#" className="underline text-black ">
              Create a profile
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
