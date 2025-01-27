import React from 'react'
import { Button } from '../components/Button'
import { InputEmail } from '../components/InputEmail'

export default function ForgotPassword() {
  return (
    <>
   <div className="flex items-center justify-center min-h-screen bg-gray-100">
           <div className="bg-white max-w-[600px] w-full mx-4 p-6 shadow-lg rounded-md">
             <h2 className="text-2xl font-serif font-semibold text-center mb-6  bg-gradient-to-r from-red-500 via-yellow-500 to-pink-600 bg-clip-text text-transparent">
               Enter Your Email For Forgot Password
             </h2>
             <form className="flex flex-col items-center">
               <div className="flex gap-2 mb-6">
               <InputEmail />
               </div>
               <Button />
             </form>
           </div>
         </div>
   
    </>
  )
}
