"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/components/footer/footer";
import LoadingAnimation from "../../../components/loadingAnimation";
import "./loginForm.css";

const CusotmerProfile = () => {
  const params = useParams();
  const customerId = params.customerId;
  const [customer, setCustomer] = useState();
  const [edit, setEdit] = useState(false);
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({
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
      .then((data) => setCustomer(data));
  }, [customerId]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleChange = (e) => {
    setUpdatedCustomer({ ...updatedCustomer, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(
        `http://localhost:3001/customer/profile/${customerId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(updatedCustomer),
        }
      );
      if (response.ok) {
        setEdit(false);
        // setFormSubmitted(true);
        console.log("Customer info updated successfully!");
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!customer) {
    return <LoadingAnimation />;
  } else {
    console.log(customer);
  }
  return (
    <div>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-32 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img
            src="/blur-restaurant.jpg"
            alt="background"
            className="object-cover object-top w-full"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img
            src="https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png"
            alt="profile picture"
            className="object-cover object-center h-32"
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
                placeholder={customer.firstName}
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
                placeholder={customer.lastName}
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
                placeholder={customer.email}
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
                placeholder={customer.phone}
                className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none customMarginInput"
                onChange={handleChange}
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
                placeholder={customer.street}
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
                placeholder={customer.buildingNo}
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
                {customer.firstName} {customer.lastName}
              </h2>
              <p className="text-gray-500">{customer.email}</p>
              <p className="text-gray-500">0{customer.phone}</p>
              <p className="text-gray-500">Balance: {customer.balance}</p>
              <p className="text-gray-500">Street: {customer.street}</p>
              <p className="text-gray-500">
                Building Number: {customer.buildingNo}
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
