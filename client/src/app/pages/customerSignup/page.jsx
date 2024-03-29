"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/app/components/footer/footer";
import axios from "axios";
import { useRouter } from "next/navigation";
import Location from "./components/location";
import urlService from "../../services/appConfig";

export default function CustomerSignup() {
  const router = useRouter();
  const [rigesterCustomerDataState, setRigesterCustomerDataState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    locationLong: "",
    locationLat: "",
    img: "",
    phone: "",
    street: "",
    buildingNo: "",
  });

  useEffect(() => {}, []);

  const handleUserCurrentLocation = async (e) => {
    getLocation();
  };

  function getLocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      return "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    setRigesterCustomerDataState({
      ...rigesterCustomerDataState,
      locationLat: position.coords.latitude,
      locationLong: position.coords.longitude,
    });
  }

  const handleRigester = async (e) => {
    let validData = true;
    e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("firstName", rigesterCustomerDataState.firstName);
    formData.append("lastName", rigesterCustomerDataState.lastName);
    formData.append("location", [
      rigesterCustomerDataState.locationLat,
      rigesterCustomerDataState.locationLong,
    ]);
    formData.append("email", rigesterCustomerDataState.email);
    formData.append("password", rigesterCustomerDataState.password);
    formData.append("phone", rigesterCustomerDataState.phone);
    formData.append("street", rigesterCustomerDataState.street);
    formData.append("buildingNo", rigesterCustomerDataState.buildingNo);
    formData.append("img", rigesterCustomerDataState.img);
    try {
      if (
        !rigesterCustomerDataState.firstName ||
        !rigesterCustomerDataState.lastName
      ) {
        validData = false;
        alert("First name and last name are required");
      }
      if (
        !rigesterCustomerDataState.password ||
        !rigesterCustomerDataState.confirmPassword ||
        rigesterCustomerDataState.confirmPassword !=
          rigesterCustomerDataState.password ||
        rigesterCustomerDataState.password?.length < 8
      ) {
        validData = false;
        alert(
          "Wrong password, the password must be +8 characters and must be repeated correctly"
        );
      }
      if (
        !rigesterCustomerDataState.phone ||
        rigesterCustomerDataState.phone?.length != 9
      ) {
        validData = false;
        alert("Wrong phone number, phone number must contain 9 degits");
      }
      if (
        !rigesterCustomerDataState.locationLong &&
        !rigesterCustomerDataState.locationLat
      ) {
        validData = false;
        alert("Wrong location");
      }
      if (validData) {
        const response = await axios.post(
          `${urlService.serverUrl}/user/customer/register`,
          formData,
          { headers }
        );
        if (response?.status == 201) {
          alert(`${response?.data?.message}`);
          router.push(`/`);
        } else {
          alert(`Failed to signup info, ${response?.data?.message}`);
        }
      }
    } catch (error) {
      alert(`Failed to signup info, ${error}`);
    }
  };
  const handleChange = (e) => {
    setRigesterCustomerDataState({
      ...rigesterCustomerDataState,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (event) => {
    setRigesterCustomerDataState({
      ...rigesterCustomerDataState,
      [event.target.name]: event.target.files[0],
    });
  };
  return (
    <div className="relative bg-[#101B0B] overflow-hidden text-black">
      <div
        className="relative w-full overflow-hidden bg-black xl:h-[600px] 
            lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
      >
        <img
          className="absolute top-0 left-0 z-0 bg-black opacity-50 w-full
          xl:mt-6 xl:pt-6 md:mt-8 md:pt-4 mt-4 pt-5
            xl:h-[600px] lg:h-[400px] md:h-[300px] sm:h-[250px] h-[200px]"
          src="/customerSignupBackground.png"
          alt="gifwelcome"
        />

        <div
          className="relative w-full  flex items-center justify-center z-10 
            xl:h-[600px] lg:h-[400px] md:h-[400px] sm:h-[300px] h-[200px]"
        >
          <h1
            className="font-bold text-white text-left
              xl:text-4xl lg:text-2xl md:text-lg sm:text-md text-sm
               "
          >
            Join us today for a world of flavors delivered right <br />
            to your doorstep!
          </h1>
        </div>
      </div>

      <svg
        className="z-0 relative xl:-mt-16 lg:-mt-8 md:-mt-6 sm:-mt-4 2xs:-mt-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
      >
        <path
          fill="#101B0B"
          fillOpacity="1"
          d="M0,40L60,40C120,40,240,40,360,36C480,32,600,24,720,28C840,32,960,64,1080,68C1200,72,1320,64,1380,62L1440,60L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          transform="rotate(180 720 40)"
        ></path>
      </svg>

      <div
        className="xl:mt-[6.5rem] xl:pt-[6.5rem]
        lg:mt-[4.5rem] lg:pt-[4.5rem]
        md:mt-[8.5rem] md:pt-[8.5rem]
        2xs:mt-[8.5rem] 2xs:pt-[8.5rem]"
      ></div>

      <div
        className="flex justify-center items-center xl:mt-[3.5rem] xl:pt-[3.5rem] xl:mr-[4.5rem] xl:pr-[4.5rem]
        lg:mt-[6.5rem] lg:pt-[6.5rem] lg:mr-[2.5rem] lg:pr-[2.5rem]
        md:mt-[4.5rem] md:pt-[4.5rem] md:mr-[2.5rem] md:pr-[2.5rem]
        2xs:mt-[4.5rem] 2xs:pt-[4.5rem] 2xs:mr-[2.5rem] 2xs:pr-[2.5rem]
        "
      >
        <div
          className="flex absolute z-20 items-center justify-center p-4 xl:mr-[6.5rem] xl:pr-[6.5rem]
        lg:mr-[4.5rem] lg:pr-[4.5rem]
        md:mr-[2rem] md:pr-[2rem]
        2xs:mr-[1.5rem] 2xs:pr-[1.5rem]
        "
        >
          <form
            className="relative mx-auto border shadow-lg rounded-3xl bg-white p-8
            xl:w-[550px] xl:h-auto xl:rounded-3xl xl:shadow-lg
            lg:w-[400px] lg:h-auto lg:rounded-3xl lg:shadow-lg
            md:w-[300px] md:h-auto md:rounded-2xl md:shadow-sm
            2xs:w-[200px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs
          "
          >
            <div className="text-center mb-4">
              <h2
                className=" font-medium text-black 
              xl:text-3xl xl:mb-10
              lg:text-2xl lg:mb-10
              md:text-xl md:mb-8
              2xs:text-md 2xs:mb-5
              "
              >
                Create Account
              </h2>
              <label htmlFor="firstName" className="block text-left">
                First Name<span className="text-red-900"> *</span>:
              </label>
              <input
                type="text"
                value={rigesterCustomerDataState.firstName}
                onChange={handleChange}
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />

              <label htmlFor="lastName" className="block text-left mt-4">
                Last Name<span className="text-red-900"> *</span>:
              </label>
              <input
                type="text"
                value={rigesterCustomerDataState.lastName}
                onChange={handleChange}
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />

              <label htmlFor="email" className="block text-left mt-4">
                Email<span className="text-red-900"> *</span>:
              </label>
              <input
                type="email"
                value={rigesterCustomerDataState.email}
                onChange={handleChange}
                id="email"
                name="email"
                placeholder="example@example.com"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />

              <label htmlFor="password" className="block text-left mt-4">
                Password<span className="text-red-900"> *</span>:
              </label>
              <input
                type="password"
                value={rigesterCustomerDataState.password}
                onChange={handleChange}
                id="password"
                name="password"
                placeholder="Password123"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />

              <label htmlFor="password2" className="block text-left mt-4">
                Repeat Password<span className="text-red-900"> *</span>:
              </label>
              <input
                type="password"
                value={rigesterCustomerDataState.confirmPassword}
                onChange={handleChange}
                id="password2"
                name="confirmPassword"
                placeholder="Password123"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />

              <label htmlFor="phone" className="block text-left mt-4">
                Phone<span className="text-red-900"> *</span>:
              </label>
              <div className="flex w-full">
                <span className="bg-gray-50 border-b border-gray-300 px-3 py-2">
                  +962
                </span>
                <input
                  type="number"
                  value={rigesterCustomerDataState.phone}
                  onChange={handleChange}
                  id="phone"
                  name="phone"
                  placeholder="777777777"
                  required
                  className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                />
              </div>
              {/* <Location /> */}
              <label htmlFor="locationLong" className="block text-left mt-4">
                Current location Lon/Lat<span className="text-red-900"> *</span>
                :
              </label>
              <input
                type="number"
                value={rigesterCustomerDataState.locationLat}
                onChange={handleChange}
                onClick={handleUserCurrentLocation}
                id="locationLat"
                name="locationLat"
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />
              <input
                type="number"
                value={rigesterCustomerDataState.locationLong}
                onChange={handleChange}
                onClick={handleUserCurrentLocation}
                id="locationLong"
                name="locationLong"
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />
              <label htmlFor="streetName" className="block text-left mt-4">
                Street Name:
              </label>
              <input
                type="text"
                value={rigesterCustomerDataState.street}
                onChange={handleChange}
                id="streetName"
                name="street"
                placeholder="123 Main St"
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />
              <label htmlFor="buildingNumber" className="block text-left mt-4">
                Building Number:
              </label>
              <input
                type="number"
                value={rigesterCustomerDataState.buildingNo}
                onChange={handleChange}
                id="buildingNumber"
                name="buildingNo"
                placeholder="123"
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
              />

              <label htmlFor="profilePicture" className="block text-left mt-4">
                Profile Picture:
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                id="profilePicture"
                name="img"
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                accept="image/ *"
              />
              <button
                onClick={handleRigester}
                className="mt-4 bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-black font-medium w-full rounded-md px-4 py-2"
              >
                Open Account
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-3 bg-[#101B0B] w-full -mt-10 -pt-10">
        <div></div>
        <div></div>

        <div className="flex flex-col justify-left items-left relative text-white -mt-10 -pt-10 pr-10 -ml-10">
          <div className="text-2xl -mt-10 -pt-10 mb-2 font-bold">
            <p>Welcome to FoodDrop!</p>
          </div>
          <div className="py-4 pr-10">
            <p>
              where your cravings meet convenience! Join our community today and
              embark on a journey of culinary discovery, right from the comfort
              of your home.
              <br />
              <br /> With FoodDrop, you gain access to' a wide array of
              restaurants and cuisines, ensuring that no matter what your taste
              buds are yearning for, we've got you covered. Signing up is the
              first step towards enjoying fast, reliable, and hassle-free food
              delivery. Be it a cozy family dinner, a quick lunch at the office,
              or those late-night snacks, FoodDrop is here to cater to every
              appetite.
            </p>
          </div>
          <div className="pt-4 pr-5 font-bold mb-10 pb-10">
            <p>
              Let’s make every meal memorable.
              <br />
              Sign up now and start exploring the flavors that await you!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-10 bg-[#101B0B]">
        <Footer />
      </div>
    </div>
  );
}
