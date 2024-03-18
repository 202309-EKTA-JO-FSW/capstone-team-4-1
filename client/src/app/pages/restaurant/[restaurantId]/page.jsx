"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Stars from "./components/stars";
import Form from "./dishform/page";
import { FaSearch } from 'react-icons/fa';
import Footer from "@/app/components/footer/footer";
import LoadingAnimation from "../../../components/loadingAnimation"; 
import ModifyDish from "./modifyDish/[dishId]/page";

const RestaurantProfile = () => {
  const params = useParams();
  const restaurantId = params.restaurantId;
  const [restaurant, setRestaurant] = useState();
  const [menu, setMenu] = useState(null);
  const [orders, setOrders] = useState({ current: [], past: [] });
  const [activeTab, setActiveTab] = useState('current');
  const [showForm, setShowForm] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [dishID, setDishID] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const fetchData = async () => {
      try {
        const profileResponse = await fetch(`http://localhost:3001/restaurant/profile/${restaurantId}`, { headers });
        const profileData = await profileResponse.json();
        setRestaurant(profileData);

        const menuResponse = await fetch(`http://localhost:3001/restaurant/menu/${restaurantId}`, { headers });
        const menuData = await menuResponse.json();
        setMenu(menuData);

        const ordersResponse = await fetch(`http://localhost:3001/restaurant/orders/${restaurantId}`, { headers });
        const ordersData = await ordersResponse.json();
        const currentOrders = ordersData.filter(order => order.status === 'Preparing');
        const pastOrders = ordersData.filter(order => order.status === 'Delivered');
        setOrders({ current: currentOrders, past: pastOrders });
      } catch (error) {
        console.error("Error loading restaurant data:", error);
      }
    };

    fetchData();
  }, [restaurantId, searchInput]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (!restaurant || !menu) {
    return <LoadingAnimation />;
  }

  const OrderDetail = ({ order }) => (
    <div className="border p-4 rounded-3xl mb-4">
      <p className="py-2"><strong>Order ID:</strong> {order._id}</p>
      <p className="py-2"><strong>Total Price:</strong> {order.totalPrice} JOD</p>
      {/* <p className="py-2"><strong>Status:</strong> {order.status}</p> */}
      <p className="py-2"><strong>Phone:</strong> {order.phone}</p>
      <p className="py-2"><strong>Address:</strong> {order.address}</p>
      {/* <p className="py-2"><strong>Delivery Fee:</strong> {order.deliveryFee} JOD</p> */}
      {/* <p className="py-2"><strong>Estimated Delivery Time:</strong> {order.estimatedTime} minutes</p> */}
      <p className="py-2"><strong>Order Note:</strong> {order.note}</p>
      <p className="py-2"><strong>Items:</strong> {order.items.length}</p>
    </div>
  );

  return (
    <div>
      <div className="relative w-full h-[380px] overflow-hidden bg-black">
      <img className="absolute w-full h-[500px] top-0 left-0 z-0 mt-18 pt-10 bg-black opacity-50" src="/blur-restaurant.jpg" alt="restaurant background" />
        <div className=" absolute w-full h-[600px] flex items-center justify-center z-10">
          <h1 className="font-bold text-6xl text-white text-center pt-5 mt-3">{restaurant.title}</h1>
        </div>
      </div>
      <div className='mt-6 lg:px-50 md:px-40 sm:px-20 xs:px-5'>
      <div className="flex flex-row items-center justify-left text-white py-5 pl-10 bg-[#101B0B] rounded-2xl shadow-lg">
        <img src={restaurant.image} className="w-[200px] h-auto my-5 rounded-3xl" alt="logo" />
        <div className="flex flex-col items-start justify-center ml-10">
          <p className="text-lg p-1"><b>Email:</b> {restaurant.email}</p>
          <p className="text-lg p-1"><b>Phone:</b> {restaurant.phone}</p>
          <p className="text-lg p-1"><b>Area:</b> {restaurant.area}</p>
          <p className="text-lg p-1"><b>Street:</b> {restaurant.street}</p>
          <p className="text-lg p-1"><b>Building:</b> {restaurant.buildingNo}</p>
          <div className="flex flex-row justify-start items-center text-lg p-1">
            <p className="mr-4"><b>Delivery Time:</b> {restaurant.deliveryTime}</p>
            <p><b>Delivery Fee:</b> {restaurant.deliveryFee} JOD</p>
          </div>

          <div className="text-lg p-1 flex items-center">
            <b>Rate: </b><Stars rating={restaurant.rate} />
          </div>
    
        </div>
  
      </div>
      </div>
      <div className='mt-6 lg:px-50 md:px-40 sm:px-20 xs:px-5'>
        <div className="flex ml-[1.5rem] mt-[3.5rem] mb-[1.5rem] mr-[1.5rem] flex-row justify-between items-center">
          <div className="mr-[1.5rem] w-[100px] text-xl font-bold py-1 pl-1 bg-[#FDF3DC] rounded-md">Menu</div> 
          <div><button className=" bg-[#FFC245] text-gray-700 text-center py-1 px-[2rem] rounded-xl text-md hover:bg-[#e69b05]" onClick={() => setShowForm(true)}>Add Dish</button></div>
        </div>

        

        <div className="mr-[1.5rem] ml-[1.5rem] flex items-center border border-gray-700 hover:border-[#FFC245] p-2 pl-4 pr-2 rounded-3xl">
        <FaSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Search for dishes..."
          className="w-full pl-2 py-1 mx-4 focus:outline-none"
          value={searchInput}
          onChange={handleInputChange}
        />
        </div>

        

        <div className="mb-10 p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>

          <div className="flex flex-col">
            {menu && menu.length > 0 ? (
              menu.map((dish) => (
                <button className="addToCartBTN" color="primary" onClick={() => {
                  setDishID(dish._id);
                  setShowPopup(true);
                }}>
                  <div className="flex flex-row items-center cursor-pointer overflow-hidden p-2 my-2 border-1 border-gray-200 rounded-3xl shadow-xl">
                    <img src={dish.image} alt={dish.title} className="w-[150px] h-auto object-cover rounded-3xl" />
                    <div className="flex-col justify-start items-left text-left pr-[4rem] pt-4 pl-4 pb-4">
                      <p className="text-xl font-bold text-black">{dish.title}</p>
                      <div className="pt-5 text-lg font-semibold text-balck"><p>{dish.price} JOD</p></div>
                    </div>
                  </div>
                </button>
              ))
            ) : <div className="text-center w-full">No dishes available</div>}
          </div>
        </div>
      </div>
      <div className="ml-[10rem] mr-[10rem] mt-[5rem] mb-[1.5rem] pb-8 border-t flex flex-col justify-left items-left">
        <div className="mr-[1.5rem] w-[100px] mt-4 text-xl font-bold py-1 pl-1 bg-[#FDF3DC] rounded-md">Orders</div> 
        <div className="flex flex-row tabs space-between space-x-[2rem] font-md mb-5">
          <button onClick={() => setActiveTab('current')} className={activeTab === 'current' ? 'shown' : 'unShown'}>Current</button>
          <button onClick={() => setActiveTab('past')} className={activeTab === 'past' ? 'shown' : 'unShown'}>Past</button>
        </div>
        <div className="order-content">
          {activeTab === 'current' ? (
            orders.current.map(order => (
              <OrderDetail key={order._id} order={order} />
            ))
          ) : (
            orders.past.map(order => (
              <OrderDetail key={order._id} order={order} />
            ))
          )}
        </div>
      </div>

      {showForm && <Form restaurantId={restaurantId} closeForm={() => setShowForm(false)} />}
      {showPopup && <ModifyDish dishId={dishID} close={() => setShowPopup(false)} />}
      <Footer />
    </div>
  );
};

export default RestaurantProfile;
