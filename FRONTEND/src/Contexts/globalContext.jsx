import { createContext, useContext, useState } from "react"

const AppContext = createContext()



export function AppProvider({ children }) {
  // Comparison Dropdown
  const [dataDropdownselected, setdataDropdownselected] = useState("Day")
  const [efficiencyPageAttribute, setefficiencyPageAttribute] = useState("Day")
  const [showComparision, setshowComparision] = useState(
    sessionStorage.getItem("comparision_Togel") || false
  )

  // home Page

  const value = {
    dataDropdownselected,
    setdataDropdownselected,
    showComparision,
    setshowComparision,
    efficiencyPageAttribute,
    setefficiencyPageAttribute,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
