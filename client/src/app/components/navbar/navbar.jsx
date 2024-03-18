"use client";
import React, { useEffect, useState } from "react";
import Login from "./login";
import Logout from "./logout";
import LoginModal from "../../pages/loginPage/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import helpers from "../../services/helpers";

function Navbar() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRoleState, setUserRoleState] = useState("");
  const [isValidTokenState, setIsValidTokenState] = useState(false);
  const [isActive, setActive] = useState("");

  useEffect(() => {
    let userID = localStorage.getItem("userID");
    let userRole = localStorage.getItem("userRole");
    let isValidToken = helpers.tokenValidator();
    let activePage = localStorage.getItem("activePage");
    changeActivePage(activePage);
    setIsValidTokenState(isValidToken);
    setUserRoleState(userRole);
    setUserId(userID);
  }, []);

  const handleImageClick = () => {
    if (userRoleState == "customer") {
      router.push(`/pages/customer/restaurantList`);
    } else if (userRoleState == "restaurant") {
      router.push(`/pages/restaurant/${userId}`);
    } else {
      router.push("/");
    }
  };

  function logout() {
    helpers.deleteCookie("token");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("userRole", "");
    setIsValidTokenState("");
    setUserRoleState("");
    localStorage.clear();
    router.push(`/`);
  }
  function changeActivePage(pageName) {
    localStorage.setItem("activePage", pageName);
    setActive(pageName);
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`flex firstPiece items-center space-x-2 sticky ${
          isActive == "registerCustomer" ? " bg101B0B" : " bg101B0B"
        }`}
      >
        <a style={{ cursor: "pointer" }}>
          <img
            src="/logo.png"
            onClick={handleImageClick}
            className="
            2xs:pl-4 sm:pl-6 w-[200px] md:pl-10 xl:pl-10
          "
            alt="logo"
          />
        </a>

        <div
          className="flex justify-end text-[#FFC245] w-full 
          xl:space-x-8 xl:pr-10  xl:text-[16px] 
          md:space-x-4 md:pr-10  2xs:space-x-2 2xs:pr-4 2xs:text-xs"
        >
          <div className="inActive">
            {!isValidTokenState && (
              <Login onLoginClick={() => setShowLoginModal(true)} />
            )}
          </div>
          {!isValidTokenState && (
            <Link
              className={
                isActive == "registerCustomer" ? " active" : " inActive"
              }
              onClick={() => changeActivePage("registerCustomer")}
              href="/pages/customerSignup"
            >
              Register
            </Link>
          )}
          {isValidTokenState && (
            <div className="inActive">
              <Logout
                onLoginClick={() => {
                  changeActivePage("home");
                  logout();
                }}
              />
            </div>
          )}
          {/* <Link
            className={isActive == "home" ? " active" : " inActive"}
            onClick={() => changeActivePage("home")}
            href="/"
          >
            Home
          </Link> */}
          {isValidTokenState && userRoleState == "customer" && (
            <Link
              className={isActive == "restaurantList" ? " active" : " inActive"}
              onClick={() => changeActivePage("restaurantList")}
              href="/pages/customer/restaurantList"
            >
              All restaurants
            </Link>
          )}
          {isValidTokenState && userRoleState == "customer" && (
            <Link
              className={isActive == "profile" ? " active" : " inActive"}
              onClick={() => changeActivePage("profile")}
              href={`/pages/customer/${userId}`}
            >
              Profile
            </Link>
          )}
          {isValidTokenState && userRoleState == "restaurant" && (
            <Link
              className={isActive == "myRestaurant" ? " active" : " inActive"}
              onClick={() => changeActivePage("myRestaurant")}
              href={`/pages/restaurant/${userId}`}
            >
              My Restaurant
            </Link>
          )}
        </div>
      </div>
      <svg
        className="secondPiece"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
      >
        <path
          fill={isActive == "registerCustomer" ? " #101B0B" : " #101B0B"}
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