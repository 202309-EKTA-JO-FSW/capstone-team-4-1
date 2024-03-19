"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/components/footer/footer";
import LoadingAnimation from "../../../components/loadingAnimation";
import axios from "axios";
import "./customerprofile.css";

const CusotmerProfile = () => {
  const params = useParams();
  const fileInputRef = useRef(null);
  const customerId = params.customerId;
  const [edit, setEdit] = useState(false);
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    newpassword: "",
    confirmpassword: "",
    locationLong: "",
    locationLat: "",
    img: "",
    phone: "",
    street: "",
    buildingNo: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    fetch(`http://localhost:3001/customer/profile/${customerId}`, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        let location = data.location;

        let locationLat = location?.lat;
        let locationLong = location?.lng;

        setUpdatedCustomer({
          ...data,
          password: "",
          locationLat: locationLat,
          locationLong: locationLong,
        });
      });
  }, [customerId]);

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
    setUpdatedCustomer({
      ...updatedCustomer,
      location: [position.coords.latitude, position.coords.longitude],
      locationLat: position.coords.latitude,
      locationLong: position.coords.longitude,
    });
  }
  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let validData = true;
    const token = await localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    };

    const formData = new FormData();
    formData.append("firstName", updatedCustomer.firstName);
    formData.append("lastName", updatedCustomer.lastName);
    formData.append("location", [
      updatedCustomer.locationLat,
      updatedCustomer.locationLong,
    ]);
    formData.append("email", updatedCustomer.email);
    formData.append("password", updatedCustomer.password);
    formData.append("confirmpassword", updatedCustomer.confirmpassword);
    formData.append("newpassword", updatedCustomer.newpassword);
    formData.append("phone", updatedCustomer.phone);
    formData.append("street", updatedCustomer.street);
    formData.append("buildingNo", updatedCustomer.buildingNo);
    formData.append("img", updatedCustomer.img);
    try {
      if (!updatedCustomer.firstName || !updatedCustomer.lastName) {
        validData = false;
        alert("First name and last name are required");
      }
      if (
        updatedCustomer.newpassword &&
        (updatedCustomer.newpassword != updatedCustomer.confirmpassword ||
          updatedCustomer.newpassword?.length < 8)
      ) {
        validData = false;
        alert(
          "Wrong password, the password must be +8 characters and must be repeated correctly"
        );
      }
      if (!updatedCustomer.phone || updatedCustomer.phone?.length != 9) {
        validData = false;
        alert("Wrong phone number, phone number must contain 9 degits");
      }
      if (!updatedCustomer.locationLong && !updatedCustomer.locationLat) {
        validData = false;
        alert("Wrong location");
      }
      if (validData) {
        const response = await axios.put(
          `http://localhost:3001/customer/profile/${customerId}`,
          formData,
          { headers }
        );
        if (response?.status == 201) {
          setEdit(false);
          alert(`Updated successfully!`);
          setUpdatedCustomer({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            newpassword: "",
            confirmpassword: "",
            phone: "",
            street: "",
            buildingNo: "",
          });
          window.location.reload();
        } else {
          console.error("Failed to update customer info");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!updatedCustomer) {
    return <LoadingAnimation />;
  } else {
  }
  const handleFileChange = (event) => {
    setUpdatedCustomer({
      ...updatedCustomer,
      [event.target.name]: event.target.files[0],
    });
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-32 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            src="/blur-restaurant.jpg"
            alt="background"
            className="object-cover object-top w-full"
          />
          <input
            type="file"
            onChange={handleFileChange}
            id="profilePicture"
            name="img"
            className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
            accept="image/ *"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            src={
              imageSrc
                ? imageSrc
                : updatedCustomer.img
                ? `http://localhost:3001/images/${updatedCustomer.img}`
                : "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            }
            alt="profile picture"
            onClick={() => {
              fileInputRef.current.click();
            }}
            className="object-cover object-center h-32 userImage"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            id="profilePicture"
            name="img"
            className="imageUploader"
            accept="image/ *"
          />
        </div>
        <div className="userCardSubContainer text-center mt-2">
          {edit ? (
            <div className="pt-2 flex flex-col items-center">
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={updatedCustomer.firstName}
                placeholder={updatedCustomer.firstName}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
              />
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2 customMargin"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={updatedCustomer.lastName}
                placeholder={updatedCustomer.lastName}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2 customMargin"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={updatedCustomer.email}
                placeholder={updatedCustomer.email}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
              />
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2 customMargin"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={updatedCustomer.phone}
                placeholder={updatedCustomer.phone}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
              />
              <label
                htmlFor="locationLong"
                className="block text-gray-700 text-sm font-bold mb-2 customMargin"
              >
                Current location Lon/Lat :
              </label>
              <input
                type="number"
                value={updatedCustomer.locationLat}
                onChange={handleChange}
                // onClick={handleUserCurrentLocation}
                id="locationLat"
                name="locationLat"
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
              />
              <input
                type="number"
                value={updatedCustomer.locationLong}
                onChange={handleChange}
                // onClick={handleUserCurrentLocation}
                id="locationLong"
                name="locationLong"
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
              />
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2 customMargin"
              >
                Street
              </label>
              <input
                type="text"
                name="street"
                value={updatedCustomer.street}
                placeholder={updatedCustomer.street}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
              />
              <label
                htmlFor="text"
                className="block text-gray-700 text-sm font-bold mb-2 customMargin"
              >
                Building Number
              </label>
              <input
                type="text"
                name="buildingNo"
                value={updatedCustomer.buildingNo}
                placeholder={updatedCustomer.buildingNo}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
              />
              {!showPasswordState && (
                <button
                  onClick={() => {
                    setShowPasswordState(true);
                  }}
                  className="loginFormBTN"
                >
                  Change password
                </button>
              )}
              {showPasswordState && (
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2 customMargin"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={updatedCustomer.password}
                    placeholder="Current Password"
                    className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput hidden"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2 customMargin"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={updatedCustomer.password}
                    placeholder="Current Password"
                    className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2 customMargin"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newpassword"
                    value={updatedCustomer.newpassword}
                    placeholder="New Password"
                    className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2 customMargin"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={updatedCustomer.confirmpassword}
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />{" "}
                  <button
                    onClick={() => {
                      setShowPasswordState(false);
                    }}
                    className="loginFormBTN"
                  >
                    Ignore
                  </button>
                </div>
              )}
              <div className="flex w-full justify-evenly">
                <button onClick={handleEdit} className="loginFormBTN">
                  Cancel
                </button>
                <button onClick={handleSave} className="loginFormBTN">
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-semibold">
                {updatedCustomer.firstName} {updatedCustomer.lastName}
              </h2>
              <p className="text-gray-500">{updatedCustomer.email}</p>
              <p className="text-gray-500">0{updatedCustomer.phone}</p>
              <p className="text-gray-500">
                Balance: {updatedCustomer.balance}
              </p>
              <p className="text-gray-500">Street: {updatedCustomer.street}</p>
              <p className="text-gray-500">
                Building Number: {updatedCustomer.buildingNo}
              </p>
              <button className="loginFormBTN" onClick={handleEdit}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CusotmerProfile;
