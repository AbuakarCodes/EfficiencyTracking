import { createContext, useRef, useState } from "react"

const AppContext = createContext()

export function AppProvider({ children }) {
  // Comparison Dropdown
  const [dataDropdownselected, setdataDropdownselected] = useState("Day")
  const [efficiencyPageAttribute, setefficiencyPageAttribute] = useState("Day")
  const [showComparision, setshowComparision] = useState(
    sessionStorage.getItem("comparision_Togel") || false
  )
  let efficiencyApiData = useRef({ periodType: "Day", periodValue: "" })
  const [Xaxis, setXaxis] = useState([])
 const [Yaxis, setYaxis] = useState([])

  // home Page

  const value = {
    dataDropdownselected,
    setdataDropdownselected,
    showComparision,
    setshowComparision,
    efficiencyPageAttribute,
    setefficiencyPageAttribute,
    efficiencyApiData,
    Xaxis,
    setXaxis,
    Yaxis,
    setYaxis,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppContext
