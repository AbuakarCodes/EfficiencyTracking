import { Navigate } from "react-router"
import { useAuthContext } from "../Contexts/AuthProvider"

export function ProtectedRoute({ children }) {
  const { IsLoggedIn, isChecking } = useAuthContext()
  if (isChecking) {
    return <div className="bg-red-500 h-[22rem]">Loading  ...</div>; // or a spinner, skeleton, etc.
  }
  if (!IsLoggedIn) {
    // user not logged in, redirect to login
    return <Navigate to="/signin" replace />
  }

  // user logged in, show the protected page
  return children
}
