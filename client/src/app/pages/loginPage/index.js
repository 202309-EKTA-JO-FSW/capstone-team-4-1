"use client"
import React, { useState } from 'react';
import Captcha from './components/captcha';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
export default function LoginPage({ onClose }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!captchaValue) {
      alert('Please verify that you are not a robot.');
      return;
    }
    console.log(email, password, captchaValue);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login success:', response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };


  const clientId = "63738745837-k81ls7845ijo98r0k1bk2ktoema1akf0.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative mx-auto border w-[650px] shadow-lg rounded-3xl bg-white
      xl:top-20 xl:p-5 xl:w-[650px] xl:h-auto xl:rounded-3xl xl:shadow-lg
      md:top-20 md:p-3 md:w-[400px] md:h-auto md:rounded-2xl md:shadow-sm
      2xs:top-20 2xs:p-1 2xs:w-[250px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs
      ">
      <button 
        onClick={onClose} 
        className="absolute transition-all rounded-full ease-in-out duration-200 hover:bg-gray-200
        xl:top-5 xl:right-5 xl:p-1
        md:top-5 md:right-4 md:p-1
        2xs:top-2 2xs:right-2 2xs:p-1/2   
        "
      >
        <span className="sr-only">Close</span>
        <svg 
          className="transform transition-transform duration-200 ease-in-out hover:rotate-45 hover:text-[#FFC245]
          xl:h-6 xl:w-6
          md:h-5 md:w-5
          2xs:h-4 2xs:w-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

        <div className="mt-3 text-center">
          <h2 className="leading-6 font-medium text-black
          xl:text-3xl xl:mb-10
          md:text-xl md:mb-6
          2xs:text-md 2xs:mb-3
          ">Login</h2>
          <form onSubmit={handleSubmit} className="px-7 pb-3
          xl:mt-8 md:mt-5 2xs:mt-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none
              xl:text-lg
              md:text-sm
              2xs:text-[10px]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none
              xl:text-lg
              md:text-sm
              2xs:text-[10px]"
            />
            <div className="flex justify-between items-center mt-4">
              <a href="#" className="font-bold text-[#FFC245] hover:text-[#101B0B]
              xl:text-sm
              md:text-[12px]
              2xs:text-[8px]
              ">Forgot password?</a>
            </div>
            <Captcha onChange={handleCaptchaChange} />
            <div className="flex justify-between items-center
            xl:mt-4 md:mt-2 2xs:mt-1
            ">
              
              <button
                type="submit"
                className="bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-black font-medium w-full 
                xl:rounded-md xl:text-lg xl:mx-[50px] xl:px-4 xl:py-2
                md:rounded-md md:text-sm md:mx-[30px] md:px-3 md:py-1
                2xs:rounded-md 2xs:text-[10px] 2xs:mx-[10px] 2xs:px-2 2xs:py-1
                ">
                Login
              </button>
            </div>
            <div className="xl:mt-4 md:mt-2 2xs:mt-1 justify-center transform scale-75">
              <GoogleLogin 
                onSuccess={handleGoogleLoginSuccess} 
                onError={handleGoogleLoginFailure} 
              />
            </div>
          </form>
          <div className="xl:mb-5 md:mb-4 2xs:mb-3
          xl:-mt-2 md:-mt-2 2xs:-mt-2
          ">
            <p className="xl:text-sm md:text-[12px] 2xs:text-[8px]">Don't have an account? <a href="#" className="text-[#FFC245] hover:text-[#101B0B] font-bold">Create an account</a></p>
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}