import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiMail, FiLock } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contextApi/AuthenticationContext";
import { handleError, handleSuccess } from "../toastMessage/message";


export const LoginPage = () => {

  const navigate = useNavigate();

  const { setLoginState, setToken } = useContext(AuthenticationContext);

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserLogin({
      ...userLogin,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { email, password } = userLogin;

    if (!email || !password) {
      return handleError("All fields are required")
    }

    try {

      const url = "http://localhost:8000/api/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userLogin)
      });

      const result = await response.json();

      const { success, message, error, token, email, name } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', token);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('loggedInUserEmail', email);
        setToken(token);
        setLoginState(true);

        setTimeout(() => {
          navigate("/");
        }, 1000);

        setUserLogin({
          email: "",
          password: ""
        })
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
      <div className="bg-gradient-to-br from-black to-gray-600 min-h-screen flex justify-center items-center">
        <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white md:grid md:grid-cols-2">

          {/* Left Section */}

          <div className=" flex items-center justify-center bg-black">

            <img
              src="couple.webp"
              alt="Secure login"
              className="rounded-lg shadow-md transform transition duration-500 hover:-translate-y-4 h-[500px]" />

          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-12 flex flex-col justify-center">

            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
              Login to Continue
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Email Input */}
              <div className="flex flex-col">

                <label htmlFor="email" className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FiMail className="mr-2" /> Email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email" />

              </div>

              {/* Password Input */}
              <div className="flex flex-col">

                <label
                  htmlFor="password"
                  className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FiLock className="mr-2" /> Password
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password" />

              </div>

              {/* Submit Button */}

              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-300 hover:scale-105">
                Login
              </button>

            </form>

            {/* Animation on hover */}
            <div className="mt-6 text-center">

              <p className="text-gray-600">
                Dont have an account?<Link to="/signup" className="text-blue-900 font-semibold ml-2 hover:text-red-600">Sign-in</Link>
              </p>

              <p className="text-gray-600">
                Forgot Your Password?<Link to="/forgot-password" className="text-blue-900 font-semibold ml-2 hover:text-red-600">Click-here</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

