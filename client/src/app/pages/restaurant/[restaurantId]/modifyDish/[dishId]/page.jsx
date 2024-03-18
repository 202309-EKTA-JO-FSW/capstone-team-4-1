"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingAnimation from '../../../../../components/loadingAnimation';
import LoginSuccessAnimation from '@/app/components/loginSuccessAnimation';

export default function ModifyDish({ dishId, close }) {
  const [dish, setDish] = useState(null);
  const [updatedDish, setUpdatedDish] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    const fetchDish = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3001/restaurant/dish/${dishId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDish(response.data);
        setUpdatedDish(response.data);
      } catch (error) {
        console.error("Error fetching dish details:", error);
      }
    };
    fetchDish();
  }, [dishId]);

  const handleChange = (e) => {
    setUpdatedDish({ ...updatedDish, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:3001/restaurant/dish/${dishId}`, updatedDish, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Dish updated successfully');
      close();
    } catch (error) {
      console.error('Failed to update dish:', error);
    }
  };

  if (!dish) {
    return <LoadingAnimation />;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-lg p-10 w-[950px]">
        <div className="flex flex-row space-x-4 items-center">
          <div className="w-1/3">
            <img src={dish.image} alt="Dish" className="rounded-3xl mb-[3rem] w-full" />
          </div>
          <div className="flex flex-col space-y-4 w-2/3">
            <input className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
             type="text" name="title" value={updatedDish.title} onChange={handleChange} placeholder="Title" />

            <textarea className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
             name="description" value={updatedDish.description} onChange={handleChange} placeholder="Description"></textarea>

            <input className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
             type="url" name="image" value={updatedDish.image} onChange={handleChange} placeholder="Image URL" />

            <input className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
             type="number" name="price" value={updatedDish.price} onChange={handleChange} placeholder="Price" />

            <input className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
             type="text" name="category" value={updatedDish.category} onChange={handleChange} placeholder="Category" />

            <div className="flex justify-center space-x-8">
              <button className="bg-[#FFC254] text-[#101B0B] hover:bg-[#916204] px-[4rem] py-2 rounded-3xl" onClick={() => close()}>Cancel</button>
              <button className="bg-[#101B0B] text-white hover:bg-[#246307] px-[4rem] py-2 rounded-3xl" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
