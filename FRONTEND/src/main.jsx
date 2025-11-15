import { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import { AppProvider } from "./Contexts/globalContext"
import { ToastContainer } from "react-toastify"
import { MantineProvider } from "@mantine/core"
import { AnimatePresence } from "framer-motion"

import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

import { AuthProvider } from "./Contexts/AuthProvider"
import { ProtectedRoute } from "./utils/ProtectedRoute"
import App from "./App"
import DotLoder from "./utils/Loders/dotLoder"
import ChangePassword from "./Components/efficiency_Comparision/profilePopUP/ChangePassword"

const Login = lazy(() => import("./Pages/login"))
const Signin = lazy(() => import("./Pages/signin"))
const Efficiency = lazy(() => import("./Pages/Efficiency"))
const Profile = lazy(() => import("./Pages/profile"))
const AboutPage = lazy(() => import("./Pages/About"))

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
              <Suspense fallback={<DotLoder />}>
                <Efficiency />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<DotLoder />}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="/About"
          element={
            <Suspense fallback={<DotLoder />}>
              <AboutPage />
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={<DotLoder />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/login/:intentionalRoute"
          element={
            <Suspense fallback={<DotLoder />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/signin"
          element={
            <Suspense fallback={<DotLoder />}>
              <Signin />
            </Suspense>
          }
        />

        <Route
          path="/signin/:intentionalRoute"
          element={
            <Suspense fallback={<DotLoder />}>
              <Signin />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<DotLoder />}>
              <div>404 Not Found</div>
            </Suspense>
          }
        />
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
