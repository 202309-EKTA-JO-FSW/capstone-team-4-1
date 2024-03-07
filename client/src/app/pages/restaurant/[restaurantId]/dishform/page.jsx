"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Form() {
    const params = useParams();
    const restaurantId = params.restaurantId;
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
      restaurant: restaurantId,
      title: '',
      description: '',
      image: '',
      price: 0,
      category: '',
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    useEffect(() => {
      const inputFields = document.querySelectorAll("input");
      inputFields.forEach((input) => {
        input.addEventListener("input", () => {
          setFormSubmitted(false);
        });
      });
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);

      try {
        const response = await fetch(`http://localhost:3001/restaurant/dish/${restaurantId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        
        if (response.ok) {
          setFormSubmitted(true);
          console.log('Form submitted successfully!');
          setFormData({
            restaurant: restaurantId,
            title: '',
            description: '',
            image: '',
            price: 0,
            category: '',
          });
        } else {
          console.error('Failed to submit form');
        }

      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
      }
    };

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
          <h1 className="font-bold text-6xl text-[#FFC245] text-center pt-5 mt-3">Dish Form</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-lg flex flex-col">
      <div className="flex justify-center">{formSubmitted && <p className="text-[#FFC245] text-lg">Form submitted successfully!</p>}</div>
        <label className="block text-gray-700 font-bold mb-2">
          Title:
          <input type="text" name="title" value={formData.title} required className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FFC245]" onChange={handleChange} />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Description:
          <input type="text" name="description" value={formData.description} required className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FFC245]" onChange={handleChange} />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Image:
          <input type="url" name="image" value={formData.image} required className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FFC245]" onChange={handleChange} />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Price:
          <input type="number" name="price" value={formData.price} required className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FFC245]" onChange={handleChange} />
        </label>
        <label className="block text-gray-700 font-bold mb-2">
          Category:
          <input type="text" name="category" value={formData.category} required className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#FFC245]" onChange={handleChange} />
        </label>
        <button type="submit" className="mt-4 bg-[#FFC245] hover:bg-[#e9b03c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
      </main>
    );
}