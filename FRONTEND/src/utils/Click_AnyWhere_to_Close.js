export function Click_AnyWhere_to_Close(ElementRef, setState) {
  function handleClickOutside(event) {
    if (ElementRef.current && !ElementRef.current.contains(event.target)) {
      setState(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  document.addEventListener("touchstart", handleClickOutside)


  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
    document.removeEventListener("touchstart", handleClickOutside)
  }
}
