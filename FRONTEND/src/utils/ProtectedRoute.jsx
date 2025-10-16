import { Navigate } from "react-router"
import { useAuthContext } from "../Contexts/AuthProvider"
import DotLoder from "./Loders/dotLoder"

export function ProtectedRoute({ children }) {
  const { IsLoggedIn, isChecking } = useAuthContext()
  if (isChecking) {
    return <DotLoder></DotLoder>
  }
  if (!IsLoggedIn) {
    // user not logged in, redirect to login
    return <Navigate to="/signin" replace />
  }

  // user logged in, show the protected page
  return children
}
