import { createContext, useState } from "react"

const AppContext = createContext()

export function AppProvider({ children }) {
  // Comparison Dropdown
  const [dataDropdownselected, setdataDropdownselected] = useState("Day")
  const [showComparision, setshowComparision] = useState(sessionStorage.getItem("comparision_Togel") || false)

  const value = {
    dataDropdownselected,
    setdataDropdownselected,
    showComparision,
    setshowComparision,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
