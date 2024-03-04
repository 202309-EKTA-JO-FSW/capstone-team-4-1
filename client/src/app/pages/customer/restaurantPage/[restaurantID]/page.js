'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleRestaurantPage = ({ params } ) => {
  const { restaurantID } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    console.log("params",params)
    fetchRestaurant();
  }, [restaurantID]);

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/customer/restaurant/${params.restaurantID}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };
  
  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{restaurant.title}</h2>
      <p>Email: {restaurant.email}</p>
      {/* Add other restaurant details here */}
    </div>
  );
};

export default SingleRestaurantPage;