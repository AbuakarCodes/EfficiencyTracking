import  { useState } from "react"
import { Link, NavLink } from "react-router"
import Logo from ".././assets/Logo.svg"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  let NavItems = [
    {
      link: "/efficiency",
      text: "Efficiency",
    },
    {
      link: "/profile",
      text: "Profile",
    },
  ]

  return (
    <div className="border-black/20 border-b-[1px]">
      <nav className="container mx-auto bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          {/* Logo */}
          <Link to={"/"} className="text-[1.4rem] h-[4rem] w-[4rem]">
            <img src={Logo} alt="Logo" />
          </Link>

          {/* Toggle Button (for mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navbar Links */}
          <div
            className={`
              w-full md:block md:w-auto
              overflow-hidden transition-[max-height] duration-300 ease-linear
              ${isOpen ? "max-h-96" : "max-h-0 md:max-h-full"}
            `}
            id="navbar-default"
          >
            <ul className="font-normal flex flex-col p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              {NavItems.map((e, index) => (
                <li key={index}>
                  <NavLink
                    to={e.link}
                    className={({ isActive }) =>
                      `text-[1.2rem] font-medium block rounded-[5px] border-[1px] border-transparent px-5 py-[.5rem] hover:border-black/20 hover:bg-black hover:text-white transition-all duration-200 ${
                        isActive ? "border-black/20 bg-black text-white" : ""
                      }`
                    }
                  >
                    {e.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
