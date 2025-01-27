import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { LoginPage } from "./pages/LoginPage"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { AboutPage } from "./pages/AboutPage"
import { CartPage } from "./pages/CartPage"
import { SignUpPage } from "./pages/SignupPage"
import { LogoutPage } from "./pages/LogoutPage"
import ForgotPassword from "./pages/ForgotPassword"
import { OtpPage } from "./pages/Otp-Page"
import { PasswordResetPage } from "./pages/PasswordResetPage"
import { Collection } from "./pages/Collection"
import { Contact } from "./pages/Contact"
import { Product } from "./pages/Product"
import { PlaceOrder } from "./pages/PlaceOrder"
import { Orders } from "./pages/Orders"


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/produuct/:productId" element={<Product />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify/otp-code" element={<OtpPage />} />
        <Route path="/otp/new-password" element={<PasswordResetPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
