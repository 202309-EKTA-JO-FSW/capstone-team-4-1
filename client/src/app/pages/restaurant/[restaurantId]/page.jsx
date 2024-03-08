"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";
import Lottie from 'react-lottie';
import Stars from "./components/stars";
import animationData from '../../../lotties/loadingAnimation';
import Form from "./dishform/page"; // Ensure this path matches where your Form component is located

const RestaurantProfile = () => {
  const params = useParams();
  const restaurantId = params.restaurantId;
  const [restaurant, setRestaurant] = useState();
  const [menu, setMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3001/restaurant/profile/${restaurantId}`)
        .then(res => res.json())
        .then(data => setRestaurant(data))
  }, [restaurantId]);

  useEffect(() => {
    fetch(`http://localhost:3001/restaurant/menu/${restaurantId}`)
        .then(res => res.json())
        .then(data => setMenu(data))
  }, [restaurantId]);


  if (!restaurant || !menu) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    );    
  }

  return (
    <div>
      <Navbar />
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
        <div className="flex justify-center items-center">
          <button className=" bg-[#FFC245] text-black text-center w-3/4 my-5 py-2 px-8 rounded-xl font-bold hover:bg-[#e69b05]" onClick={() => setShowForm(true)}>Add Dish</button>
        </div>
        <div className="my-10 p-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
          <div className="flex flex-col">
            {menu && menu.length > 0 ? (
              menu.map((dish) => (
                <Link key={dish._id} href={`/dish/${dish._id}`} passHref>
                  <div className="flex items-center cursor-pointer overflow-hidden p-2 my-2 border-1 border-2 border-gray-200 rounded-3xl shadow-xl">
                    <img src={dish.image} alt={dish.title} className="w-[150px] h-auto object-cover rounded-3xl" />
                    <div className="flex-1 p-4">
                      <p className="text-xl font-bold text-black">{dish.title}</p>
                      <div className="pt-5 text-lg font-semibold text-balck"><p>{dish.price} JOD</p></div>
                    </div>
                  </div>
                </Link>
              ))
            ) : <div className="text-center w-full">No dishes available</div>}
          </div>
        </div>
      </div>
      {showForm && <Form restaurantId={restaurantId} closeForm={() => setShowForm(false)} />}
      <Footer />
    </div>
  );
};

export default RestaurantProfile;
