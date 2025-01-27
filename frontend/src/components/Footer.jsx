import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Footer = () => {
    return (
        <div className="bg-black text-white mt-0 py-8 max-w-full mx-auto border-t-1 border-amber-200">
            <h1 className="text-center text-3xl font-semibold mb-16">Connect with me</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                {/* Contact Links */}
                <div className="text-center space-y-4 md:mt-16 lg:mt-0">
                    <a
                        href="mailto:sushants2711@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Send me an email"
                        className="flex items-center justify-center text-lg hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        <FaEnvelope className="mr-2" /> Email
                    </a>

                    <a
                        href="https://www.linkedin.com/in/sushant-kumar-singh-414782230/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit my LinkedIn profile"
                        className="flex items-center justify-center text-lg hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        <FaLinkedin className="mr-2" /> LinkedIn
                    </a>

                    <a
                        href="https://github.com/sushants2711?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit my GitHub profile"
                        className="flex items-center justify-center text-lg hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        <FaGithub className="mr-2" /> GitHub
                    </a>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center items-center">
                    <img
                        src="/signinimage.avif"
                        alt="Sushant Kumar Singh"
                        className="w-60 h-60 rounded-full shadow-lg transform transition-all duration-3000 hover:translate-x-20"
                    />
                </div>

                {/* Address Section */}
                <div className="md:ml-[200px] md:col-span-2 md:mt-10 lg:mt-0">
                    <p className="font-semibold">Address:</p>
                    <p>Kharar, Mohali, Punjab</p>
                    <p>Near Kurali Highway, Just Behind the White Tower, 5th Floor</p>
                    <p>Pincode: 140301</p>
                </div>
            </div>

            <div className="text-center mt-16 text-sm opacity-60">
                <p>&copy; 2025 E-Commerce Website. All rights reserved.</p>
            </div>
        </div>
    );
};
