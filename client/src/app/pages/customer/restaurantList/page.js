"use client";
import "./restaurantList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Import Link from 'next/link'
import RestaurantFilter from "../../../components/restaurantFilter"; // Import RestaurantFilter component
import Navbar from "../../../components/navbar/navbar";
import Footer from "../../../components/footer/footer";
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/customer/restaurants"
        );
        setRestaurants(response.data);
        setFilteredRestaurants(response.data); // Initially set filtered restaurants to all restaurants
        console.log(response);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

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

  return (
    <div>
      <Navbar />
      <div className="restaurantsList">
        {/* Render the RestaurantFilter component */}
        <RestaurantFilter
          cuisines={getCuisines()}
          onFilterChange={handleFilterChange}
        />
        <div className="restaurantList">
          <h2 className="title">Restaurants</h2>
          <div className="row restaurantListSub">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant._id} className="grid-cols-4 restaurant">
                {/* Wrap the contents of the Link component with the anchor tag */}
                <Link href={`../customer/restaurantPage/${restaurant._id}`}>
                  <>
                    {restaurant.image && (
                      <img
                        className="restaurantImage"
                        src={restaurant.image}
                        alt={restaurant.title}
                      />
                    )}
                    <h3 className="restaurantName">{restaurant.title}</h3>
                  </>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantList;
