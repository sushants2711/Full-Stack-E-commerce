import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { handleError } from "../toastMessage/message";

export const OtpPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  // Handle input change
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input automatically
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white max-w-[400px] w-full mx-4 p-6 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Verify Your Token
        </h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex gap-2 mb-6">
            {otp.map((value, index) => (
              <Input
                key={index}
                value={value}
                id={`otp-input-${index}`}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          > submit
          </Button>
        </form>
      </div>
    </div>
  );
};

