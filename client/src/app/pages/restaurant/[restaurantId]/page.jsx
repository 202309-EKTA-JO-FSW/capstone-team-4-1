"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/navbar/navbar";
import Footer from "@/app/components/footer/footer";

const RestaurantProfile = () => {
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.restaurantId;
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState(null);

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
    return <div>Loading...</div>
  }

  const handleClick = () => {
    router.push(`${restaurantId}/dishform`)
  };

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
        <div className="flex flex-col items-center justify-between p-24">
          <div className="flex justify-center items-center space-x-10 text-black text-center mt-5 mb-10">     
                <div className="py-2 font-bold mr-20 pr-10"> 
                  <img src={restaurant.image} className="w-50 h-70 pt-10 mb-5 rounded-full mx-auto" alt="logo" />
                  <h1 className="text-xl font-bold mb-3">{restaurant.title}</h1>
                </div>

                <div className="py-2 font-bold ml-20 pl-10"> 
                  <h1 className="text-xl font-bold mb-3">Profile</h1>
                  <p className="text-lg p-1"><b>Email:</b> {restaurant.email}</p>
                  <p className="text-lg p-1"><b>Phone:</b> {restaurant.phone}</p>
                  <p className="text-lg p-1"><b>Area:</b> {restaurant.area}</p>
                  <p className="text-lg p-1"><b>Street:</b> {restaurant.street}</p>
                  <p className="text-lg p-1"><b>Building:</b> {restaurant.buildingNo}</p>
                  <p className="text-lg p-1"><b>Delivery Time:</b> {restaurant.deliveryTime}</p>
                  <p className="text-lg p-1"><b>Delivery Fee:</b> {restaurant.deliveryFee} JOD</p>
                  <p className="text-lg p-1"><b>Rate:</b> {restaurant.rate} stars</p>
                </div>

                <div className="py-2 font-bold ml-20 pl-10">
                  <button className="bg-[#FFC245] text-black text-center mx-auto mt-5 py-2 px-8 rounded-xl font-bold hover:bg-[#e69b05]" onClick={handleClick}>Add Dish</button>
                </div>
          </div>
        </div>
        <div className="grid my-10 justify-items-center items-center lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-3 sm:grid-cols-2 sm:gap-1 xs:grid-cols-1 xs:gap-3">
          {menu && menu.length > 0 ? (
            menu.map((dish) => (
              <Link key={dish._id} href={`/`}>
                <li className="list-none rounded-md group relative mb-5">
                  <img src={dish.image} alt={dish.title} className="w-full h-80 object-cover rounded-3xl" />
                  <div className="absolute top-0 left-0 w-full h-0 flex flex-col font-bold text-center justify-center items-center bg-[#101b0baa] rounded-3xl opacity-0 group-hover:h-full group-hover:opacity-100 duration-500 pt-10 pr-5 pl-5">
                  <p className=" text-center text-2xl text-[#FFC245] mb-8">{dish.title}</p>
                </div>
                </li>
              </Link>
            ))
          ) : <p>No dishes availabe</p>}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RestaurantProfile;