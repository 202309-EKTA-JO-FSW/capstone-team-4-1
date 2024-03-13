"use client";
import "./restaurantList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link from 'next/link'
import RestaurantFilter from "../../../components/restaurantFilter"; // Import RestaurantFilter component
import Footer from "@/app/components/footer/footer";
import LoadingAnimation from "../../../components/loadingAnimation";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants("", "", "", "", "");
  }, []);

  const fetchRestaurants = async (title, rate, deliveryTime, area, cuisine) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    try {
      const response = await axios.get(
        `http://localhost:3001/customer/restaurants?${title ? "title=" + title : ""}${rate ? "&rate=" + rate : ""}${deliveryTime ? "&deliveryTime=" + time : ""}${area ? "&area=" + area : ""}${cuisine ? "&cuisine=" + cuisine : ""}`, {
        headers: headers,
      }
      );
      setRestaurants(response.data);
      setFilteredRestaurants(response.data); // Initially set filtered restaurants to all restaurants
      console.log(response);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };


  const handleFilterChange = (cuisine) => {
    if (cuisine === "") {
      setFilteredRestaurants(restaurants); // If no cuisine selected, show all restaurants
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.cuisine.includes(cuisine)
      );
      setFilteredRestaurants(filtered);
    }
  };

  const getCuisines = () => {
    // Get unique cuisines from all restaurants
    const allCuisines = restaurants.reduce((cuisines, restaurant) => {
      return [...cuisines, ...restaurant.cuisine];
    }, []);

    // Return unique cuisines
    return [...new Set(allCuisines)];
  };

  if (!filteredRestaurants) {
    return <LoadingAnimation />;
  } else {
    console.log(filteredRestaurants);
  }

  return (
    <div>
      <div className="mainPageContainer">
        <div className="restaurantsList">
          <div className="breadcrumbContainer mr-[3.5rem] -ml-[1.5rem]">
            <Link className="breadcrumpTextActive hover:text-[#FFC245]" href="/">
              Home
            </Link>
            <p className="angularbrackets">{">"}</p>
            <span className="breadcrumpTextInactive">Restaurants</span>
          </div>
          {/* Render the RestaurantFilter component */}
          <div className="flex">
            <RestaurantFilter
              cuisines={getCuisines()}
              onFilterChange={handleFilterChange}
              fetchRestaurants={fetchRestaurants}
            />
            <div className="restaurantList ml-[4rem]">
              <h2 className="title">Restaurants</h2>
              <div className="grid grid-cols-3 gap-4">
                {filteredRestaurants.map((restaurant) => (
                  <Link key={restaurant._id} href={`../customer/restaurantPage/${restaurant._id}`} passHref>
                    <div className="cursor-pointer mb-5">
                      {restaurant.image && (
                        <div className="overflow-hidden rounded-3xl">
                          <img
                            className="w-[450px] h-[160px] transition-transform duration-300 ease-in-out transform hover:scale-110 hover:rounded-3xl"
                            src={restaurant.image}
                            alt={restaurant.title}
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <h3 className="restaurantName ml-2 mt-4">{restaurant.title}</h3>
                        <div className="mt-4 mr-2 text-sm px-1 bg-[#FDF3DC] rounded-md">
                          {restaurant.cuisine.length > 0 ? restaurant.cuisine[0] : "No cuisines available"}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantList;
