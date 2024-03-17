"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Footer from '@/app/components/footer/footer';
import GoogleMapComponent from './components/googleMap';
import EmptyOrderAnimation from '@/app/components/emptyOrderAnim';
import './orderPage.css';
import TrakingPopup from './traking/page';
const Order = () => {
  const [restaurantState, setRestaurantState] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [order, setOrder] = useState(false);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [showSpecialRequestInput, setShowSpecialRequestInput] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [userID, setUserID] = useState(null);
  const [restaurantID, setRestaurantID] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [showTrackingPopup, setShowTrackingPopup] = useState (false);  const [orderData, setOrderData] = useState({});


  useEffect(() => {
    const localUserID = localStorage.getItem('userID');
    setUserID(localUserID);

    const cartData = localStorage.getItem(`cart_${localUserID}`) || '[]';
    const parsedCartData = JSON.parse(cartData);
    setCartItems(parsedCartData);

    if (parsedCartData.length > 0) {
      const restaurantId = parsedCartData[0].restaurantId;
      setRestaurantID(restaurantId)
      fetchRestaurant(restaurantId);  // what are we doing here?
      fetchCustomer(localUserID);     // same here what is going on?
    }
  }, []);


  const totalQuantity = cartItems.reduce((total, item) => total + item.count, 0);
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0).toFixed(2);
  const totalPriceWithDelivery = (parseFloat(totalPrice) + deliveryFee).toFixed(2);


console.log("cartItems set:", cartItems)



  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    if(cartItems && cartItems.length > 0) {
      
      try {
        await Promise.all(cartItems.map(async (item) => {
            const response = await fetch(`http://localhost:3001/customer/cart`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                  restaurant: restaurantID,
                  customer: userID,
                  dish: item.dishId,
                  dishName: item.title,
                  quantity: item.count,
                  price: item.price,
                  totalPrice: item.totalPrice,
                  note: item.note,
                }),
            });

            if (response.ok) {
              setOrder(true);
            } else {
              setOrder(false);
              console.error('Failed to create item');
            }

        }))

      } catch (error) {
          console.error('Error:', error);
      }
  
    }

    if(order) {

      try {
        const response = await fetch(`http://localhost:3001/customer/order`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            ...orderData,
            customer: userID,
            restaurant: restaurantID,
            // location: userLocation
          }),
        });
        if (response.ok) {
          setOrderSubmitted(true);
          console.log('Order created successfully!');
          setOrderData({});
        } else {
          console.error('Failed to create order');
        }
      } catch (error) {
        console.error('Error:', error);
      }

    }
  
  };
  
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };


  const handleLocationSet = (location) => {
    setUserLocation(location);
    //console.log("User location set to:", location);
  };

  useEffect(() => {
   
    const fee = localStorage.getItem('deliveryFee');
    
    if (fee) {
      setDeliveryFee(parseFloat(fee));
    }
  }, []);

  const fetchRestaurant = async (restaurant_id) => {
    try {
      const response = await axios.get(`http://localhost:3001/customer/restaurant/${restaurant_id}`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data) {
        setRestaurantState(response.data);
      }
    } catch (error) {
   //   console.error('Error fetching previous restaurant:', error);
    }
  };

  const fetchCustomer = async (customerId) => {
    try {
      const response = await axios.get(`http://localhost:3001/customer/profile/${customerId}`, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data) {
        setCustomer(response.data);
      }
    } catch (error) {
      console.error('Error fetching previous restaurant:', error);
    }
  };

  const handleNoteChange = (event, dishId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.dishId === dishId) {
        return { ...item, note: event.target.value };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userID}`, JSON.stringify(updatedCartItems));
  };

  const renderNoteField = (item) => {
    if (editNoteId === item.dishId || item.note) {
      return (
        <input
          type="text"
          value={itemData.note}
          defaultValue={item.note}
          onChange={(event) => handleNoteChange(event, item.dishId)}
          placeholder="Add note here"
          className="mr-3 text-xs text-gray-600 my-2 text-left font-md w-[830px] border border-black rounded-xl py-2 px-4 mb-2 focus:outline-none focus:border-2 focus:border-[#FFC245]"
          onBlur={() => setEditNoteId(null)}
        />
      );
    } else {
      return (
        <div className="flex justify-start items-start">
          <button
            className="mr-3 pr-4 my-2 w-[70px] hover:text-[#FFC254] text-left text-xs text-gray-600 cursor-pointer"
            onClick={() => setEditNoteId(item.dishId)}
          >
            Add Note
          </button>
        </div>
      );
    }
  };

  if (!restaurantState) {
    return <EmptyOrderAnimation />;
  }

  const handleAddressChange = (newAddress) => {
    setUserAddress(newAddress);
};
//console.log(cartItems)
  return (

        <div className="flex flex-col realtive w-full">
            <div className="pt-[8rem] flex justify-end flex-row w-full">
              <div className="header w-full ml-[4rem] mr-[2rem]">
                <div className="breadcrumbContainer">
                    <Link className="breadcrumpTextActive hover:text-[#FFC245]" href="/">
                    Home
                    </Link>
                    <p className="angularbrackets">{">"}</p>
                    <Link
                    className="breadcrumpTextActive hover:text-[#FFC245]"
                    href="/pages/customer/restaurantList"
                    >
                    Restaurants
                    </Link>
                    <p className="angularbrackets">{">"}</p>
                    <Link key={restaurantState._id} className="breadcrumpTextActive hover:text-[#FFC245]"
                    href={`/pages/customer/restaurantPage/${restaurantState._id}`} passHref>
                    {restaurantState.title}
                    </Link>
                    
                    <p className="angularbrackets">{">"}</p>
                    <span className="breadcrumpTextInactive">
                    Checkout
                    </span>
                </div>
                <div className="flex flex-col items-start justify-center my-4">
                    <h1 className="text-3xl font-extrabold text-left">{restaurantState.title}</h1>
                </div>

                <div className="flex flex-row justify-between items-center border-b">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700">Order Summary</h1>
                    </div>
                    <div>
                    <Link key={restaurantState._id}  href={`/pages/customer/restaurantPage/${restaurantState._id}`} passHref>
                        <button className="text-sm hover:text-[#FFC245] py-1 mr-[4rem]">Modify Order</button>
                    </Link>
                    </div>
                    </div>
              </div>
            </div>
      <div className="flex justify-end flex-row">
        
        <div className="w-[1000px] rounded-3xl mr-[26rem] ml-[4rem]">
          
          <div className="flex items-start flex-col">
            <div className="flex flex-col items-center justify-center mb-4 mt-2">
               <span className="text-lg font-bold pl-1 bg-[#FDF3DC] pr-5 rounded-md">Item(s)</span>
            </div>
          </div>
          <div style={{ maxHeight: cartItems.length > 3 ? '264px' : 'auto', overflowY: cartItems.length > 3 ? 'scroll' : 'visible' }} className="w-[950px] border-b pb-4">
            {cartItems.map((item) => (
                <div key={item.dishId} className="flex flex-col py-3">
                <div className="flex flex-row justify-left items-center ml-5">
                    <img
                    className="itemImage w-[60px] h-[60px] rounded-3xl"
                    src={item.image ? item.image : "/placeholder.png"}
                    alt={item.title}
                    />
                    <div className="text-left flex-grow pl-3">
                        <h2 className="text-lg font-md">{item.title}</h2>
                        <div className="justify-left">
                            {renderNoteField(item)}
                        </div>
                        <div className="mr-3 text-md font-bold pr-10">{parseFloat(item.totalPrice).toFixed(2)}<span className="text-xs">JOD</span></div>
                    </div>
                </div>
                
                <div className="flex flex-row justify-end items-right -mt-[2rem]">
                
                    <div className="justify-right mt-2">
                    <span className="mx-3 text-md text-center font-md">Qty: {item.count}</span>
                    </div>
                </div>
                </div>
            ))}
            </div>

          <div className="flex items-start flex-col">
            <div className="mb-4 mt-2 w-full">
                <span className="text-lg font-bold pl-1 py-1 bg-[#FDF3DC] pr-5 rounded-md">Delivery details</span>
                <GoogleMapComponent onLocationSet={handleLocationSet} onAddressChange={handleAddressChange} loca/>    
                <div className="pr-8 flex space-between flex-row">
                  <div className="pt-8 pr-2">
                    <svg width="30px" height="30px" viewBox="-0.32 -0.32 16.64 16.64" xmlns="http://www.w3.org/2000/svg" fill="#FF" stroke="#FF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 8 0 c -3.3125 0 -6 2.6875 -6 6 c 0.007812 0.710938 0.136719 1.414062 0.386719 2.078125 l -0.015625 -0.003906 c 0.636718 1.988281 3.78125 5.082031 5.625 6.929687 h 0.003906 v -0.003906 c 1.507812 -1.507812 3.878906 -3.925781 5.046875 -5.753906 c 0.261719 -0.414063 0.46875 -0.808594 0.585937 -1.171875 l -0.019531 0.003906 c 0.25 -0.664063 0.382813 -1.367187 0.386719 -2.078125 c 0 -3.3125 -2.683594 -6 -6 -6 z m 0 3.691406 c 1.273438 0 2.308594 1.035156 2.308594 2.308594 s -1.035156 2.308594 -2.308594 2.308594 c -1.273438 -0.003906 -2.304688 -1.035156 -2.304688 -2.308594 c -0.003906 -1.273438 1.03125 -2.304688 2.304688 -2.308594 z m 0 0" fill="#FFC254"></path> </g></svg>
                  </div>
                  <div className="w-full">
                    <label htmlFor="location" className="block text-left">Your Location<span className="text-red-900">*</span>:</label>
                    <input 
                      type="text" 
                      id="location" 
                      name="location" 
                      value={userAddress}
                      readOnly 
                      className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
                    />
                  </div>
                </div>
                <label htmlFor="phone" className="block pt-4 pl-10 text-left">Your Phone<span className="text-red-900">*</span>:</label>
                <div className="pr-8 flex space-between flex-row">
                  
                    <div className="pt-2 pr-2">
                        <svg width="30px" height="30px" viewBox="-0.32 -0.32 16.64 16.64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 14.234375 11.714844 c -0.382813 0.382812 -1 0.382812 -1.386719 0 l -1.039062 -1.039063 l -1.039063 -1.042969 c -0.386719 -0.382812 -0.386719 -1 0 -1.386718 l 0.492188 -0.492188 c -2.035157 -1.109375 -4.5 -1.109375 -6.535157 0 l 0.492188 0.492188 c 0.386719 0.386718 0.386719 1.003906 0 1.386718 l -1.039062 1.042969 l -1.039063 1.039063 c -0.386719 0.382812 -1.003906 0.382812 -1.386719 0 l -1.042968 -1.039063 c -0.957032 -0.957031 -0.957032 -2.511719 0 -3.46875 l 0.347656 -0.347656 c 3.816406 -3.816406 10.054687 -3.816406 13.871094 0 l 0.347656 0.347656 c 0.957031 0.957031 0.957031 2.511719 0 3.46875 z m 0 0" fill="#FFC254"></path> </g></svg>
                    </div>
                    
                    <div className="flex w-full">
                        
                        <span className="bg-gray-50 border-b border-gray-300 px-3 py-2">+962</span>
                        <input type="tel" id="phone" name="phone" 
                        value={orderData.phone} onChange={handleChange}
                         defaultValue={customer.phone} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
                    </div>
                </div>
            </div>
          </div>

          <div className="flex items-start flex-col">
            <div className="mb-4 mt-2">
              <div 
                className="flex items-center " 
                onClick={() => setShowSpecialRequestInput(!showSpecialRequestInput)}
              >
              <span className="cursor-pointer text-lg font-bold pl-1 py-1 bg-[#FDF3DC] pr-5 rounded-md">{showSpecialRequestInput ? '▼' : '▲'} Add special requests here</span>
              </div>
              {showSpecialRequestInput && (
                <textarea
                  // value={orderData.note}
                  rows="2"
                  placeholder="eg. if you have a food allergy or a request for the driver"
                  className="mr-3 text-xs text-gray-600 my-2 text-left font-md w-[930px] border border-black rounded-xl py-2 px-4 mb-2 focus:outline-none focus:border-[#FFC245]"
                />
              )}
            </div>
          </div>

          <div className="flex items-start flex-col">
            <div className="mb-4 mt-2 w-full">
              <span className="text-lg font-bold py-1 bg-[#FDF3DC] pr-5 rounded-md">Payment Method</span>
              <div className="mt-2">
                <label className="flex items-center justify-between bg-white px-4 py-2 border border-[#FFC254] rounded-3xl leading-tight focus:outline-none cursor-pointer">
                  <div className="flex items-center">
                   <svg className="pt-1/2 pr-2" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 13C7 11.1144 7 10.1716 7.58579 9.58579C8.17157 9 9.11438 9 11 9H14H17C18.8856 9 19.8284 9 20.4142 9.58579C21 10.1716 21 11.1144 21 13V14V15C21 16.8856 21 17.8284 20.4142 18.4142C19.8284 19 18.8856 19 17 19H14H11C9.11438 19 8.17157 19 7.58579 18.4142C7 17.8284 7 16.8856 7 15V14V13Z" stroke="#FFC254" stroke-width="2" stroke-linejoin="round"></path> <path d="M7 15V15C5.11438 15 4.17157 15 3.58579 14.4142C3.58579 14.4142 3.58579 14.4142 3.58579 14.4142C3 13.8284 3 12.8856 3 11L3 9C3 7.11438 3 6.17157 3.58579 5.58579C4.17157 5 5.11438 5 7 5L13 5C14.8856 5 15.8284 5 16.4142 5.58579C17 6.17157 17 7.11438 17 9V9" stroke="#FFC254" stroke-width="2" stroke-linejoin="round"></path> <path d="M16 14C16 15.1046 15.1046 16 14 16C12.8954 16 12 15.1046 12 14C12 12.8954 12.8954 12 14 12C15.1046 12 16 12.8954 16 14Z" stroke="#FFC254" stroke-width="2"></path> </g></svg>
                    Pay with cash
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cash" 
                    checked={paymentMethod === 'cash'} 
                    onChange={handlePaymentMethodChange} 
                    className="form-radio h-5 w-5 text-gray-600" 
                  />
                </label>
                <label className="flex items-center justify-between mt-3 bg-white px-4 py-2 border border-[#FFC254] rounded-3xl leading-tight focus:outline-none cursor-pointer">
                  <div className="flex items-center">
                    <svg className="pt-1/2 pr-2 " width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.5 10H20.5" stroke="#FFC254" stroke-width="2" stroke-linecap="round"></path> <path d="M6 14H8" stroke="#FFC254" stroke-width="2" stroke-linecap="round"></path> <path d="M11 14H13" stroke="#FFC254" stroke-width="2" stroke-linecap="round"></path> <path d="M3 9C3 7.11438 3 6.17157 3.58579 5.58579C4.17157 5 5.11438 5 7 5H12H17C18.8856 5 19.8284 5 20.4142 5.58579C21 6.17157 21 7.11438 21 9V12V15C21 16.8856 21 17.8284 20.4142 18.4142C19.8284 19 18.8856 19 17 19H12H7C5.11438 19 4.17157 19 3.58579 18.4142C3 17.8284 3 16.8856 3 15V12V9Z" stroke="#FFC254" stroke-width="2" stroke-linejoin="round"></path> </g></svg>
                    Add a new card
                  </div>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="newCard" 
                    checked={paymentMethod === 'newCard'} 
                    onChange={handlePaymentMethodChange} 
                    className="form-radio h-5 w-5 text-gray-600" 
                  />
                </label>
              </div>
            </div>
          </div>



        </div>
        
        <div className="cartItem rounded-2xl w-[350px] z-20 top-0 mr-[2rem] fixed mt-[20rem] mb-[10rem]">
            <div className="flex flex-col bg-white justify-center rounded-2xl items-center border px-2">
            <h1 className="font-bold text-2xl w-full text-center pb-2 text-gray-700 mt-5 border-b">Summary</h1>
            <div className="w-full text-left pl-7">
                <h1 className="text-md mt-2 text-left pt-2 text-gray-700">Products: {totalPrice} <span className="text-xs">JOD</span></h1>
                <h1 className="text-md mt-2 text-left text-gray-700">Delivery Fee: {deliveryFee} <span className="text-xs">JOD</span></h1>
                <h1 className="text-xl mt-2 text-left pt-2 font-bold text-gray-700">Total amount: {totalPriceWithDelivery} <span className="text-xs">JOD</span></h1>
            </div>
            <div className="flex items-center justify-center">
                <Link href="/pages/order">
                <button onClick={() => setShowTrackingPopup(true)} className="w-full text-md mt-4 mb-5 px-[4rem] py-1 rounded-2xl bg-[#FFC245] text-black hover:bg-[#101B0B] hover:text-[#FFC245]">Confirm Order</button>
                </Link>
            </div>
            </div>
        </div>
      </div>
      <Footer />
      {showTrackingPopup && (
        <TrakingPopup
          closePopup={() => setShowTrackingPopup(false)}
          restaurantName={restaurantState.title}
        />
      )}
    </div>
  );
};

export default Order;