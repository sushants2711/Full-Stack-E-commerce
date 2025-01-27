import React from 'react'
import { FaCodepen } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

export const PasswordResetPage = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-black to-blue-950 min-h-screen flex justify-center items-center">
        <div className="max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white md:grid md:grid-cols-2">
          {/* Left Section */}
          <div className="flex items-center justify-center bg-black">

            <img
              src= "/signinimage.avif"
              alt="Secure Password"
              className="h-[500px] rounded-lg shadow-md transform transition duration-500 hover:-translate-y-4"
            />

          </div>

          {/* Right Section */}
          <div className="p-6 sm:p-12 flex flex-col justify-center">

            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
              Reset The Password
            </h2>

            <form className="space-y-4">

              {/* code Input */}
              <div className="flex flex-col">

                <label htmlFor="code" className="flex items-center text-lg font-medium text-gray-600 mb-2">
                  <FaCodepen className="mr-2" /> Code
                </label>

                <input
                  type="text"
                  name="code"
                  id="code"
                  className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your otp"
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
                />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-300 hover:scale-105"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
