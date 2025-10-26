 import { useAppContext } from "../../hooks/useCustomContext.jsx"

export default function ToggleButton() {
  const { showComparision, setshowComparision } = useAppContext()
  function ToggleButton() {
    setshowComparision((prev) => {
      sessionStorage.setItem("comparision_Togel", !prev)
      return !prev
    })
  }
  return (
    <button
      onClick={ToggleButton}
      className={` cursor-pointer rounded-[5px] px-3 py-1 transition-all border-[1px] border-black/20 ${
        showComparision ? "bg-white/20 text-black" : "bg-black text-white"
      }`}
    >
      {showComparision ? "Hide Comparison" : "Comparison"}
    </button>
  )
}
