import { BrowserRouter, Route, Routes } from "react-router"
import { AppProvider } from "./Contexts/globalContext"
import App from "./app"
import "./index.css"
import ReactDOM from "react-dom/client"
import Login from "./Pages/login"
import Signin from "./Pages/signin"
import Efficiency from "./Pages/Efficiency"
import Profile from "./Pages/profile"
const root = document.getElementById("root")

ReactDOM.createRoot(root).render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/efficiency" element={<Efficiency />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lo" element={<Login />} />
        <Route path="/sn" element={<Signin />} />
        <Route path="*" element={<div>fuc*k off</div>} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
)
