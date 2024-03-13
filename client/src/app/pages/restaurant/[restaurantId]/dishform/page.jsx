import React, { useState } from "react";

export default function Form({ restaurantId, closeForm }) {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(`http://localhost:3001/restaurant/dish/${restaurantId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormSubmitted(true);
        console.log('Form submitted successfully!');
        setFormData({ restaurant: restaurantId, title: '', description: '', image: '', price: 0, category: '', });
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <main className="relative mx-auto my-0 top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 border w-[650px] shadow-lg rounded-3xl bg-white
       xl:p-5 xl:w-[650px] xl:h-auto xl:rounded-3xl xl:shadow-lg
       md:p-3 md:w-[400px] md:h-auto md:rounded-2xl md:shadow-sm
      2xs:p-1 2xs:w-[250px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs">
        <button onClick={closeForm} className="absolute top-5 right-5 p-1 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200
        xl:top-5 xl:right-5 xl:p-1
        md:top-5 md:right-4 md:p-1
        2xs:top-2 2xs:right-2 2xs:p-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-black transform transition-transform duration-200 ease-in-out hover:rotate-45 hover:text-[#FFC245]
          xl:h-6 xl:w-6
          md:h-5 md:w-5
          2xs:h-4 2xs:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4 pt-10">
          {formSubmitted && <div className="text-center p-2 bg-green-100 text-green-700 rounded-md">Form submitted successfully!</div>}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <input type="text" name="description" id="description" value={formData.description} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Image URL
            </label>
            <input type="url" name="image" id="image" value={formData.image} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none" />
          </div>
          <div className="flex justify-center">
            <button type="submit"
                className="bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-black font-medium w-full 
                xl:rounded-md xl:text-lg xl:mx-[50px] xl:px-4 xl:py-2
                md:rounded-md md:text-sm md:mx-[30px] md:px-3 md:py-1
                2xs:rounded-md 2xs:text-[10px] 2xs:mx-[10px] 2xs:px-2 2xs:py-1
                ">
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
