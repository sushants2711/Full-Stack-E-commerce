import React from 'react';

export const LogoutPage = () => {
  return (
    <>
      <div className="max-w-full mx-auto bg-gradient-to-l from-black via-gray-800 to-black h-screen flex flex-col justify-between">
     
        <div className="flex items-center justify-center flex-col pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-serif border-b-2 border-red-700 bg-gradient-to-r from-orange-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Thanks for Coming to Our Website!
            </h1>
            <p className="text-xl bg-gradient-to-r from-blue-500 via-red-500 to-green-500 bg-clip-text text-transparent mt-4">
              We hope you truly enjoy our services.
            </p>
          </div>
        </div>

      
        <div className="text-center pb-5">
          <p className="text-sm text-gray-400">
            Admin: <span className="text-white font-medium">Sushant Kumar Singh</span>
          </p>
        </div>
      </div>
    </>
  );
};
