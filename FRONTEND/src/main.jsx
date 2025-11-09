import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import { AppProvider } from "./Contexts/globalContext"
import { ToastContainer } from "react-toastify"
import { MantineProvider } from "@mantine/core" 
import "@mantine/core/styles.css" 
import "@mantine/dates/styles.css" 
import "react-toastify/dist/ReactToastify.css"

import "./index.css"
import ReactDOM from "react-dom/client"
import Login from "./Pages/login"
import Signin from "./Pages/signin"
import Efficiency from "./Pages/Efficiency"
import Profile from "./Pages/profile"
import { AuthProvider } from "./Contexts/AuthProvider"
import { ProtectedRoute } from "./utils/ProtectedRoute"
import ChangePassword from "./Components/ChangePassword"
import App from "./App"
import { AnimatePresence } from "framer-motion"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="/efficiency"
          element={
            <ProtectedRoute>
              <Efficiency />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:intentionalRoute" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signin/:intentionalRoute" element={<Signin />} />
        <Route path="/test" element={<ChangePassword />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </AnimatePresence>
  )
}

function Root() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
     
      <AppProvider>
        <AuthProvider>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={1000} />
        </AuthProvider>
      </AppProvider>
    </MantineProvider>
  )
}

const root = document.getElementById("root")
ReactDOM.createRoot(root).render(<Root />)
