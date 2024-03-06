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
      <div className="relative top-20 mx-auto p-5 border w-[650px] shadow-lg rounded-3xl bg-white">
      <button 
        onClick={onClose} 
        className="absolute top-5 right-5 rounded-full p-1 transition-all ease-in-out duration-200 hover:bg-gray-200"
      >
        <span className="sr-only">Close</span>
        <svg 
          className="h-6 w-6 transform transition-transform duration-400 ease-in-out hover:rotate-45 hover:text-[#FFC245]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

        <div className="mt-3 text-center">
          <h2 className="text-3xl leading-6 font-medium text-black mb-10">Login</h2>
          <form onSubmit={handleSubmit} className="mt-8 px-7 pb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 mb-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-3 px-3 py-2 bg-gray-50 border-b border-gray-300 w-full focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
            />
            <div className="flex justify-between items-center mt-4">
              <a href="#" className="text-sm font-bold text-[#FFC245] hover:text-[#101B0B]">Forgot password?</a>
            </div>
            <Captcha onChange={handleCaptchaChange} />
            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-black text-sm font-medium rounded-md w-full mx-[80px]"
              >
                Login
              </button>
            </div>
            <div className="mt-4 justify-center transform scale-75">
              <GoogleLogin 
                onSuccess={handleGoogleLoginSuccess} 
                onError={handleGoogleLoginFailure} 
              />
            </div>
          </form>
          <div className="mt-2">
            <p className="text-sm">Don't have an account? <a href="#" className="text-[#FFC245] hover:text-[#101B0B] font-bold">Create an account</a></p>
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}
