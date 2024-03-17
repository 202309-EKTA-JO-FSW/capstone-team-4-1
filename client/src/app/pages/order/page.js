"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Footer from '@/app/components/footer/footer';
// import GoogleMapComponent from './cart/googleMap';
import EmptyOrderAnimation from '@/app/components/emptyOrderAnim';
import './orderPage.css';

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

  const [orderData, setOrderData] = useState({
    customer: '',
    restaurant: '',
    totalPrice: '',
    phone: '',
    location: '', // need to work on location
    note: ''
  });


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
          }),
        });
        if (response.ok) {
          setOrderSubmitted(true);
          console.log('Order created successfully!');
          setOrderData({ customer: '',
          restaurant: '',
          totalPrice: '',
          phone: '',
          location: '',
          note: '' });
        } else {
          console.error('Failed to create order');
        }
      } catch (error) {
        console.error('Error:', error);
      }

    }
  
  };
  



  const handleLocationSet = (location) => {
    setUserLocation(location);
    console.log("User location set to:", location);
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
      console.error('Error fetching previous restaurant:', error);
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


console.log(cartItems)
  return (

        <div className="flex flex-col realtive w-full">
            <div className="pt-[8rem] flex justify-end flex-row w-full">
              <div className="header w-full ml-[4rem]">
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
        
        <div className="restaurantCard w-[1000px] rounded-3xl mr-[26rem] ml-[4rem]">
          
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
                <span className="text-lg font-bold py-1 bg-[#FDF3DC] pr-5 rounded-md">Delivery details</span>
                {/* <GoogleMapComponent onLocationSet={handleLocationSet} /> */}

                <div className="pr-8 flex space-between flex-row pt-4">
                    <div className="pt-2 pr-2">
                        <svg width="30px" height="30px" viewBox="-0.32 -0.32 16.64 16.64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 14.234375 11.714844 c -0.382813 0.382812 -1 0.382812 -1.386719 0 l -1.039062 -1.039063 l -1.039063 -1.042969 c -0.386719 -0.382812 -0.386719 -1 0 -1.386718 l 0.492188 -0.492188 c -2.035157 -1.109375 -4.5 -1.109375 -6.535157 0 l 0.492188 0.492188 c 0.386719 0.386718 0.386719 1.003906 0 1.386718 l -1.039062 1.042969 l -1.039063 1.039063 c -0.386719 0.382812 -1.003906 0.382812 -1.386719 0 l -1.042968 -1.039063 c -0.957032 -0.957031 -0.957032 -2.511719 0 -3.46875 l 0.347656 -0.347656 c 3.816406 -3.816406 10.054687 -3.816406 13.871094 0 l 0.347656 0.347656 c 0.957031 0.957031 0.957031 2.511719 0 3.46875 z m 0 0" fill="#FFC254"></path> </g></svg>
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
                        <span className="cursor-pointer text-lg font-bold py-1 bg-[#FDF3DC] pr-5 rounded-md">{showSpecialRequestInput ? '▼' : '▲'} Add special requests here</span>
                    </div>
                    {showSpecialRequestInput && (
                        <textarea
                            value={orderData.note}
                            onChange={handleChange}
                            rows="2"
                            placeholder="eg. if you have a food allergy or a request for the driver"
                            className="mr-3 text-xs text-gray-600 my-2 text-left font-md w-[930px] border border-black rounded-xl py-2 px-4 mb-2 focus:outline-none focus:border-[#FFC245]"
                        />
                    )}
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
                <button onClick={handleSubmit} className="w-full text-md mt-4 mb-5 px-[4rem] py-1 rounded-2xl bg-[#FFC245] text-black hover:bg-[#101B0B] hover:text-[#FFC245]">Confirm Order</button>
                </Link>
            </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;