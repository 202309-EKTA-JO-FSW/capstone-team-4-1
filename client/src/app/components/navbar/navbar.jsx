"use client";
import React, { useEffect, useState } from 'react';
import Login from "./login";
import Logout from "./logout";
import LoginModal from "../../pages/loginPage/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import helpers from "../../services/helpers";

function Navbar() {
  const router = useRouter();
  
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRoleState, setUserRoleState] = useState("");


  useEffect(() => {
    let userRole = localStorage.getItem("userRole");
    setUserRoleState(userRole);
  }, []);

  const handleImageClick = () => {
    if (userRoleState == 'customer') {
     
      router.push(`/pages/customer/restaurantList`);
    } 
    else if (userRoleState == 'restaurant') {
      router.push(`/pages/restaurant/restaurantList/page`);
    }
    else {

      router.push('/');
    }
 
  };

function logout (){
  helpers.deleteCookie("token");
  localStorage.setItem("user","");
  localStorage.setItem("userID","");
  localStorage.setItem("userRole","");
  setUserRoleState("");
  router.push(`/`);
};

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="flex firstPiece items-center space-x-2 bg-[#101B0B] sticky">
      <a style={{ cursor: 'pointer' }}>
        <img
          src="/logo.png"
          onClick={handleImageClick}
          className="
            2xs:w-25 2xs:h-8 2xs:pl-4 2xs:pt-2
            sm:w-24 sm:h-10 sm:pl-6 sm:pt-4 
            md:w-[180px] md:h-auto md:pl-10 md:pt-10
            xl:w-[250px] xl:h-auto xl:pl-10 xl:pt-10
          "
          alt="logo"
        />
      </a>
      
        
        <div
          className="flex justify-end text-[#FFC245] w-full 
          xl:space-x-8 xl:pr-10  xl:text-[16px] 
          md:space-x-4 md:pr-10  2xs:space-x-2 2xs:pr-4 2xs:text-xs"
        >
          <div className="py-2 px-2 font-bold cursor-pointer hover:text-[#B92719]">
            {userRoleState == "" && (
              <Login onLoginClick={() => setShowLoginModal(true)} />
            )}
          </div>
          <div className="py-2 px-2 font-bold cursor-pointer hover:text-[#B92719]">
            {userRoleState != "" && (
              <Logout onLoginClick={() => logout()} />
            )}
          </div>
          {userRoleState == "" && (
          <div className="bg-[#FFC245] hover:bg-[#B92719] text-black flex justify-center py-2 px-2 rounded-xl font-bold border-2 border-transparent hover:border-black">
            <Link href="/pages/customerSignup">Get Started</Link>
          </div>
          )}
          {/* {userRoleState == "customer" && (
          <div className="bg-[#FFC245] hover:bg-[#B92719] text-black flex justify-center py-2 px-2 rounded-xl font-bold border-2 border-transparent hover:border-black">
            <Link href="/pages/customer/restaurantList">All restaurants</Link>
          </div>
          )} */}

        </div>
      </div>
      <svg
        className="secondPiece"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
      >
        <path
          fill="#101B0B"
          fillOpacity="1"
          d="M0,40L60,40C120,40,240,40,360,36C480,32,600,24,720,28C840,32,960,64,1080,68C1200,72,1320,64,1380,62L1440,60L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
}

export default Navbar;
