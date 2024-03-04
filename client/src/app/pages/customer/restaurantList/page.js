'use client'

import './restaurantList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link from 'next/link'
import RestaurantFilter from '../../../components/RestaurantFilter'; // Import RestaurantFilter component

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3001/customer/restaurants');
        setRestaurants(response.data);
        setFilteredRestaurants(response.data); // Initially set filtered restaurants to all restaurants
        console.log(response)
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleFilterChange = (cuisine) => {
    if (cuisine === '') {
      setFilteredRestaurants(restaurants); // If no cuisine selected, show all restaurants
    } else {
      const filtered = restaurants.filter((restaurant) => restaurant.cuisine.includes(cuisine));
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
      <h2>Restaurants</h2>
      {/* Render the RestaurantFilter component */}
      <RestaurantFilter cuisines={getCuisines()} onFilterChange={handleFilterChange} />
      <div className="restaurant-list">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant">
            {/* Wrap the contents of the Link component with the anchor tag */}
            <Link href={`../customer/restaurantPage/${restaurant._id}`}>
              <>
                <h3>{restaurant.title}</h3>
                {restaurant.image && <img src={restaurant.image} alt={restaurant.title} />}
              </>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;