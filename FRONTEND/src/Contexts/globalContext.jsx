import { createContext, useState } from "react"

const AppContext = createContext()

export function AppProvider({ children }) {
  // Comparison Dropdown
  const [dataDropdownselected, setdataDropdownselected] = useState("Day")
  const [showComparision, setshowComparision] = useState(sessionStorage.getItem("comparision_Togel") || false)
  const [loggedin_Usersid, setloggedin_Usersid] = useState("")
  const [isLoogedin, setisLoogedin] = useState(false)

  const value = {
    dataDropdownselected,
    setdataDropdownselected,
    showComparision,
    setshowComparision,
    loggedin_Usersid,
    setloggedin_Usersid,
    isLoogedin,
    setisLoogedin
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
