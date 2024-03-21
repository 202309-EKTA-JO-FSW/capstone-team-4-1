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
      <div className="flex flex-col items-start justify-center xl:mx-[4rem] sm:mx-[2rem] md:mx-[3rem] lg:mx-[4rem]">
        <div
          className="flex flex-row w-full mt-[10rem] border bg-white shadow-xl rounded-3xl
       text-gray-900"
        >
          <div className="rounded-t-lg h-32 overflow-hidden"></div>
          <div className="flex relative border-4 mt-10 ml-5 border-white rounded-full overflow-hidden">
            {edit ? (
              <>
                <input
                  id="profilePicture"
                  name="img"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <img
                  src={
                    imageSrc
                      ? imageSrc
                      : updatedCustomer.img
                      ? `http://localhost:3001/images/${updatedCustomer.img}`
                      : "/profilePlaceholder.png"
                  }
                  alt="profile picture"
                  onClick={() => fileInputRef.current.click()}
                  className="w-[300px] h-[250px] object-cover object-center rounded-full"
                />
              </>
            ) : (
              <img
                src={
                  updatedCustomer.img != ""
                    ? `http://localhost:3001/images/${updatedCustomer.img}`
                    : "/profilePlaceholder.png"
                }
                alt="profile picture"
                className="w-[300px] h-[250px] object-cover object-center rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col w-full -pt-8 userCardSubContainer items-start text-left ml-[2rem] mt-[3rem] pr-[4rem]">
            {edit ? (
              <div className="pt-2 flex flex-col items-start w-full">
                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="text"
                    className="block text-gray-700 text-sm font-bold w-[150px]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedCustomer.firstName}
                    placeholder={updatedCustomer.firstName}
                    className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="text"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedCustomer.lastName}
                    placeholder={updatedCustomer.lastName}
                    className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={updatedCustomer.email}
                    placeholder={updatedCustomer.email}
                    className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={updatedCustomer.phone}
                    placeholder={updatedCustomer.phone}
                    className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="locationLong"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  >
                    Current location Lon/Lat :
                  </label>
                  <input
                    type="number"
                    value={updatedCustomer.locationLat}
                    onChange={handleChange}
                    onClick={handleUserCurrentLocation}
                    id="locationLat"
                    name="locationLat"
                    placeholder="0"
                    required
                    className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                  />
                </div>
                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="locationLong"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  ></label>
                  <input
                    type="number"
                    value={updatedCustomer.locationLong}
                    onChange={handleChange}
                    onClick={handleUserCurrentLocation}
                    id="locationLong"
                    name="locationLong"
                    placeholder="0"
                    required
                    className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                  />
                </div>

                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="text"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={updatedCustomer.street}
                    placeholder={updatedCustomer.street}
                    className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center space-x-2 py-2 w-full">
                  <label
                    htmlFor="text"
                    className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                  >
                    Building Number
                  </label>
                  <input
                    type="text"
                    name="buildingNo"
                    value={updatedCustomer.buildingNo}
                    placeholder={updatedCustomer.buildingNo}
                    className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                    onChange={handleChange}
                  />
                </div>
                {!showPasswordState && (
                  <div className="flex items-center w-full">
                    <button
                      onClick={() => {
                        setShowPasswordState(true);
                      }}
                      className="loginFormBTN text-center text-gray-700 text-sm font-bold w-full hover:text-[#FFC254]"
                    >
                      Change password
                    </button>
                  </div>
                )}
                {showPasswordState && (
                  <div className="flex flex-col items-start py-2 w-full">
                    <div className="flex items-center space-x-2 py-2 w-full">
                      <label
                        htmlFor="password"
                        className="block text-left text-gray-700 text-md font-bold w-[150px] mb-2 customMargin"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={updatedCustomer.password}
                        placeholder="Current Password"
                        className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput hidden"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-center space-x-2 py-2 w-full">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={updatedCustomer.password}
                        placeholder="Current Password"
                        className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-center space-x-2 py-2 w-full">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newpassword"
                        value={updatedCustomer.newpassword}
                        placeholder="New Password"
                        className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-center space-x-2 py-2 w-full">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold w-[150px] mb-2 customMargin"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmpassword"
                        value={updatedCustomer.confirmpassword}
                        placeholder="Confirm Password"
                        className="w-full px-3 py-1 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                        onChange={handleChange}
                      />
                    </div>

                    <button
                      onClick={() => {
                        setShowPasswordState(false);
                      }}
                      className="loginFormBTN text-left text-sm text-gray-700 font-bold w-[60px] my-2 px-2 py-1/2 bg-[#FDF3DC] rounded-md"
                    >
                      Ignore
                    </button>
                  </div>
                )}
                <div className="flex w-full justify-center sapce-between space-x-[3rem] mb-8 mt-4">
                  <button
                    onClick={handleEdit}
                    className="loginFormBTN rounded-2xl px-[4rem] py-1 text-[#FFC245] bg-gray-600 hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="loginFormBTN rounded-2xl px-[4rem] py-1 text-[#101B0B] bg-[#FFC245] hover:bg-[#e69b05]"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-bold pb-4 text-2xl">
                  {updatedCustomer.firstName} {updatedCustomer.lastName}
                </h2>
                <p className="text-gray-500 py-1">
                  Email: {updatedCustomer.email}
                </p>
                <p className="text-gray-500 py-1">
                  Phone: +962 {updatedCustomer.phone}
                </p>
                <p className="text-gray-500 py-1">
                  Balance: {updatedCustomer.balance} JOD
                </p>
                <p className="text-gray-500 py-1">
                  Street: {updatedCustomer.street}
                </p>
                <p className="text-gray-500 py-1">
                  Building Number: {updatedCustomer.buildingNo}
                </p>
                <div className="flex mt-3">
                  <button
                    className="loginFormBTN bg-[#FFC254] rounded-2xl px-[4rem] py-1/2 hover:bg-[#916204] hover:text-white"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CusotmerProfile;
