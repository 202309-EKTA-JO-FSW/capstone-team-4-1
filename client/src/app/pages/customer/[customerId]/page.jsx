"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/components/footer/footer";
import LoadingAnimation from "../../../components/loadingAnimation";
import axios from "axios";
import "./customerprofile.css";
import urlService from "../../../services/appConfig";

const CusotmerProfile = () => {
  const params = useParams();
  const fileInputRef = useRef(null);
  const customerId = params.customerId;
  const [edit, setEdit] = useState(false);
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [orders, setOrders] = useState({ current: [], past: [] });
  const [activeTab, setActiveTab] = useState('current');
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
    const fetchProfile = async () => {
      fetch(`${urlService.serverUrl}/customer/profile/${customerId}`, {
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
      };
      const fetchOrders = async () => {
        try {
          const response = await fetch(`${urlService.serverUrl}/customer/orders/${customerId}`, { headers });
          if (!response.ok) throw new Error('Failed to fetch orders');
          const data = await response.json();
          const ordersArray = data.orders;

          ordersArray.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
              setOrders({
              current: ordersArray.filter(order => order.status === 'Preparing'),
              past: ordersArray.filter(order => order.status === 'Delivered')
            });
       }catch (error) {
          console.error("Error loading orders data:", error);
        }
      };
  
      fetchProfile();
      fetchOrders();
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
    if (imageSrc) {
      formData.append("img", updatedCustomer.img);
    }
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
          `${urlService.serverUrl}/customer/profile/${customerId}`,
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

  const OrderDetail = ({ order }) =>{
    const [restaurantData, setRestaurantData] = useState([]);
    const [dishData, setDishData] = useState({}); 
    useEffect(() => {
      const fetchRestaurantDetails = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${urlService.serverUrl}/customer/restaurant/${order.restaurant}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (!response.ok) throw new Error('Failed to fetch restaurant details');
          const data = await response.json();
          setRestaurantData(data);
        } catch (error) {
          console.error("Error loading restaurant details:", error);
        }
      };

      const fecthDishDetails = async () => {
        try {
          const token = localStorage.getItem("token");
          const dishPromises = order.items.map(item =>
            fetch(`${urlService.serverUrl}/customer/dishes/${item.dish}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }).then(res => res.json())
          );
  
        const dishes = await Promise.all(dishPromises);
        const dishesMap = {};
        dishes.forEach(dish => {
          dishesMap[dish._id] = dish;
        });
        setDishData(dishesMap);
        } catch (error) {
          console.error("Error loading restaurant details:", error);
        }
      };

      
  
      fetchRestaurantDetails();
      fecthDishDetails();
    }, [order.restaurant], [order.items]);
    return (
    
    <div className="flex flex-col border p-4 rounded-3xl mb-4 w-[1000px]">
     <div className="ml-6 mb-2">
      <p className="flex items-center gap-2 text-xs text-gray-700">
        
          {new Date(order.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric', 
            timeZone: 'Asia/Amman' 
          })}
          <span className="inline-block h-1 w-1 bg-black rounded-full"></span>
          
          {new Date(order.createdAt).toLocaleTimeString('en-US', {
            hour: 'numeric',   
            minute: '2-digit', 
            hour12: true,     
            timeZone: 'Asia/Amman'
          })}
        
      </p>
    </div>

      <div className="flex flex-row">
        <div className="mr-5 mt-2 ml-4">
          <img className="w-[80px] h-[70px] rounded-3xl"
          src={restaurantData.image} alt="Restaurant"></img>
        </div>
        <div>
          <p className="pt-2 text-2xl"><strong>{restaurantData.title}</strong></p>
          <p className="py-2">{order.totalPrice.toFixed(2)} JOD</p>
         
        </div>
      </div>
      <div className="ml-4 mt-4">
        <p className="my-2 pl-1 font-bold bg-[#FDF3DC] rounded-md w-[60px]">Items</p>
      </div>
      <div className="overflow-y-auto mx-4 max-h-[270px] w-[800px]">
      {order.items.length > 0 ?
        order.items.map((item, index) => (
          
          <div key={index} className="flex py-1 flex-row border border-[#FFC254] rounded-3xl shadow-lg mb-4 cursor-pointer overflow-hidden">
            <div className="flex items-center justify-center ml-5">
              {dishData[item.dish] && <div><img className="w-[50px] h-[40px] rounded-lg" src={dishData[item.dish].image} alt="Dish Image" /></div>}
            </div>
            
            <div>
            <div className="ml-2 py-1 pl-1 font-bold text-left">
              {item.quantity > 1 ? `${item.quantity}X` : 'One'} {item.dishName}
            </div>
              <div className="flex flex-row justify-between ml-2 pr-[24rem]">            
                <p className="pb-1 pl-1 text-sm">{item.totalPrice.toFixed(2)} JOD</p> 
              </div>
            </div>
          </div>
        )) 
      : null}
      </div>
    </div>
    )
    
  }
    
    
  return (
    <div>
      <div className="flex flex-col items-start justify-center xl:mx-[4rem] sm:mx-[2rem] md:mx-[3rem] lg:mx-[4rem]">
        <div
          className="flex flex-row w-full pb-8 mt-[10rem] border bg-white shadow-xl rounded-3xl 
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
                      ? `${urlService.serverUrl}/images/${updatedCustomer.img}`
                      : "/profilePlaceholder.png"
                  }
                  alt="profile picture"
                  onClick={() => fileInputRef.current.click()}
                  className="w-[300px] h-[250px] object-cover object-center rounded-full"
                  style={{ cursor: 'pointer' }}
                />
              </>
            ) : (
              <img
                src={
                  updatedCustomer.img != ""
                    ? `${urlService.serverUrl}/images/${updatedCustomer.img}`
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
                  <div className="flex justify-center items-center w-full">
                    <button
                      onClick={() => {
                        setShowPasswordState(true);
                      }}
                      className="loginFormBTN text-center text-gray-700 text-sm font-bold hover:text-[#FFC254]"
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

      <div className={`ml-[4rem] mr-[4rem] mt-[4rem] mb-[1.5rem] pb-8 border-t flex flex-col justify-left items-left
       ${orders.current.length > 2 || orders.past.length > 2 ? 'max-h-[2000px] overflow-y-auto' : ''}
       `}>
        <div className="mr-[1.5rem] w-[80px] mt-4 text-xl font-bold py-1 pl-1 bg-[#FDF3DC] rounded-md">Orders</div> 
        <div className="flex flex-row tabs space-between space-x-[2rem] font-md mb-5">
          <button onClick={() => setActiveTab('current')} className={activeTab === 'current' ? 'shown' : 'unShown'}>Current</button>
          <button onClick={() => setActiveTab('past')} className={activeTab === 'past' ? 'shown' : 'unShown'}>Past</button>
        </div>
        <div className="order-content">
          {activeTab === 'current' ? orders.current.map(order => <OrderDetail key={order._id} order={order} />) : null}
          {activeTab === 'past' ? orders.past.map(order => <OrderDetail key={order._id} order={order} />) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CusotmerProfile;
