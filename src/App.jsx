import { Routes, Route } from "react-router-dom"
import LoginPage from "./features/auth/LoginPage"
import RegisterPage from "./features/auth/RegisterPage"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import AboutPage from "./pages/AboutPage"
import CartPage from "./features/cart/CartPage"
import PrivateRoute from "./components/PrivateRoute"
import PrenotazioniPage from "./pages/PrenotazioniPage"
import AdminDashboard from "./features/admin/AdminDashboard"
import MassaggiPage from "./pages/MassaggiPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import AdminMassaggiatoriPage from "./pages/AdminMassaggiatoriPage"
import PrenotazioniAssegnatePage from "./pages/PrenotazioniAssegnatePage"
import Unauthorized from "./pages/Unauthorized"
import "./App.css"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Rotte PUBBLICHE */}
        <Route path="/" element={<HomePage />} />
        <Route path="/massaggi" element={<MassaggiPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/password-dimenticata" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Rotte PROTETTE */}
        <Route element={<PrivateRoute allowedRoles={["CLIENTE"]} />}>
          <Route path="/carrello" element={<CartPage />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["CLIENTE", "ADMIN"]} />}>
          <Route path="/prenotazioni" element={<PrenotazioniPage />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["MASSAGGIATORE"]} />}>
          <Route
            path="/prenotazioni/ricevute"
            element={<PrenotazioniAssegnatePage />}
          />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="/admin/massaggiatori"
            element={<AdminMassaggiatoriPage />}
          />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
