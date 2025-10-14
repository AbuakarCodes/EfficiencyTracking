import Navbar from "../Components/navbar";

export default function Signin() {
  return (
    <main className="min-h-screen flex flex-col  ">
      {/* Navbar */}
     <Navbar></Navbar>

      {/* Sign Up Card */}
      <section className="flex-1 grid place-items-center px-4 py-8">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Create Account
          </h2>

          {/* User Avatar */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/64"
              alt="User Avatar"
              className="rounded-full"
            />
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm ">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm ">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm ">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm ">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Sign Up
          </button>

          {/* Footer Text */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <a href="#" className="underline text-black dark:text-white hover:text-gray-700">
              Sign in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
