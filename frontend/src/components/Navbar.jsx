import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { activeClassStyle } from "../utils/activeClassStyle";
import { activeClassForMobileNavbarMenu } from "../utils/activeClassForMobileNavbarMenu";
import { TiShoppingCart } from "react-icons/ti";
import { IoSearchSharp } from "react-icons/io5";
import { AuthenticationContext } from "../contextApi/AuthenticationContext";
import { handleError, handleSuccess } from "../toastMessage/message";

export const Navbar = () => {

    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { token, setToken, loginState, setLoginState } = useContext(AuthenticationContext);

    const handleToggleButton = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            const url = "http://localhost:8000/api/auth/logout"
            const token = localStorage.getItem("token");
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    token: token,
                },
            })
            const result = await response.json();

            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                navigate("/logout");
                setLoginState(false);
                localStorage.removeItem("token");
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInUserEmail")
                setToken("");
            }
            else if (!success) {
                handleError(message)
            }
            else if (error) {
                handleError(error)
            }
        } catch (error) {
            handleError(error)
        }

    }


    return (
        <>
            <nav className="bg-white shadow-inner border-b-2 border-red-200">
                <div className="max-w-full mx-auto px-4 md:px-4 lg:px-12 py-2 md:py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo section */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent first-letter:text-4xl first-letter:text-pink-600">
                                goldBasket
                            </Link>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex space-x-14">
                            {loginState && (
                                <>
                                    <NavLink to="/collection" className={({ isActive }) => activeClassStyle(isActive)}>
                                        Collections
                                    </NavLink>

                                    <NavLink to="/cart" className="relative">
                                        <TiShoppingCart className="text-3xl" />
                                        <p className="absolute right-[-5px] bottom-[15px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
                                    </NavLink>

                                    <NavLink to="/about" className={({ isActive }) => activeClassStyle(isActive)}>
                                        About
                                    </NavLink>

                                    <div className="text-xl">
                                        <button className={({ isActive }) => activeClassStyle(isActive)} onClick={handleLogout}>Logout</button>
                                    </div>

                                    <div className="text-3xl hover:text-red-500">
                                        <IoSearchSharp />
                                    </div>
                                </>
                            )}

                            {!loginState && (
                                <>
                                    <NavLink to="/signup" className={({ isActive }) => activeClassStyle(isActive)}>
                                        Signup
                                    </NavLink>

                                    <NavLink to="/login" className={({ isActive }) => activeClassStyle(isActive)}>
                                        Login
                                    </NavLink>
                                </>
                            )}
                        </div>

                        {/* Mobile button for navbar */}
                        <div className="md:hidden flex items-center">
                            <button onClick={handleToggleButton} className="text-gray-700 hover:text-blue-600 focus:outline-none">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu responsiveness */}
                <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} py-2 text-center`}>
                    {loginState && (
                        <>
                            <NavLink to="/collection" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                Collections
                            </NavLink>

                            <NavLink to="/cart" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                <TiShoppingCart className="text-3xl" />
                            </NavLink>

                            <NavLink to="/about" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                About
                            </NavLink>

                            <NavLink to="/logout" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                Logout
                            </NavLink>

                            <NavLink to="/search" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                <IoSearchSharp className="text-3xl" />
                            </NavLink>
                        </>
                    )}

                    {!loginState && (
                        <>
                            <NavLink to="/signup" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                Signup
                            </NavLink>

                            <NavLink to="/login" className={({ isActive }) => activeClassForMobileNavbarMenu(isActive)}>
                                Login
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};
