import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../contextApi/AuthenticationContext";
import { handleError, handleSuccess } from "../toastMessage/message";


export const SignUpPage = () => {

  // context api calling  
  const { signinState, setSigninState, setToken } = useContext(AuthenticationContext)

  const navigate = useNavigate();


  // handle local state data for forms value
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  // handle the input value of form 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // handle the form data 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmpassword } = formData;

    if (!name || !email || !password || !confirmpassword) {
      return handleError("All fields are required")
    }

    try {

      const url = "http://localhost:8000/api/auth/signup"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

   
      const { success, message, error, token } = result;
    
      if (success) {
        setToken(token);
        setSigninState(true);
        handleSuccess(message);
        setTimeout(() => {
          navigate('/verify/otp-code');
        }, 1000);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmpassword: ""
        })
      }
      else if (error) {
        handleError(error)
      }
      else if (!success) {
        handleError(message)
      }
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <>
      <div className="bg-gradient-to-br from-black to-blue-950 min-h-screen flex justify-center items-center">
        <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white md:grid md:grid-cols-2">
          {/* Left Section */}

          <div className="flex items-center justify-center bg-black">
            <img
              src="s1.avif"
              alt="Secure login"
              className="h-[600px] rounded-lg shadow-md transform transition duration-500 hover:-translate-y-4"
            />
          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-12 flex flex-col justify-center">

            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
              Signin to Continue
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Name Input */}
              <div className="flex flex-col">

                <label htmlFor="name" className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FiUser className="mr-2" /> Name
                </label>

                <input
                  type="text"
                  name="name"
                  id="name"
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={formData.name}
                />

              </div>

              {/* Email Input */}
              <div className="flex flex-col">

                <label htmlFor="email" className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FiMail className="mr-2" /> Email
                </label>

                <input
                  type="email"
                  name="email"
                  id="email"
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  value={formData.email}
                />

              </div>

              {/* Password Input */}
              <div className="flex flex-col">

                <label htmlFor="password" className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FiLock className="mr-2" /> Password
                </label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.password}
                />

              </div>

              {/* Confirm Password Input */}
              <div className="flex flex-col">

                <label htmlFor="confirmpassword" className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FiLock className="mr-2" /> Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={formData.confirmpassword}
                />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-300 hover:scale-105"
              >
                Sign In
              </button>

            </form>

            {/* Animation on hover */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?
                <Link to="/login" className="text-blue-900 font-semibold ml-2 hover:text-red-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
