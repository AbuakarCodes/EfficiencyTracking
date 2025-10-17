import { BrowserRouter, Route, Routes } from "react-router"
import { AppProvider } from "./Contexts/globalContext"
import { ToastContainer } from "react-toastify"
import App from "./app"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import ReactDOM from "react-dom/client"
import Login from "./Pages/login"
import Signin from "./Pages/signin"
import Efficiency from "./Pages/Efficiency"
import Profile from "./Pages/profile"
import { AuthProvider } from "./Contexts/AuthProvider"
import { ProtectedRoute } from "./utils/ProtectedRoute"
import ChangePassword from "./Components/ChangePassword"

const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
  <>
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
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
            <Route path="/signin" element={<Signin />} />
            <Route path="/test" element={<ChangePassword />} />
            <Route path="*" element={<div>fuc*k off</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>

    <ToastContainer position="top-right" autoClose={1000} />
  </>
)
