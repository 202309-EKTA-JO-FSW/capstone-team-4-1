import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddItem({ dishId }) {
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/customer/dishes/${dishId}`,{
            headers: {
              "authorization": "Bearer "+ helpers.getCookie("token"),
            },
          }
        );
        if (response.data) {
          setItemData(response.data); // Set the entire dish data object
        }
      } catch (error) {
        console.error('Error fetching dish data:', error);
      }
    }

    if (dishId) {
      fetchData();
    }
  }, [dishId]);

  if (!itemData) { // Show loading state or nothing if itemData is not yet loaded
    return null; // or loading spinner
  }
  return (
    <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative mx-auto my-0 top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 border w-[650px] shadow-lg rounded-3xl bg-white
       xl:p-5 xl:w-[650px] xl:h-auto xl:rounded-3xl xl:shadow-lg
       md:p-3 md:w-[400px] md:h-auto md:rounded-2xl md:shadow-sm
       2xs:p-1 2xs:w-[250px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs">
        <div className="space-y-4 pt-10">
          <div className="text-center p-2 bg-green-100 text-green-700 rounded-md">Dish Information</div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Title: {itemData.title}</h5>
          </div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Description: {itemData.description}</h5>
          </div>
          <div>
            <img src={itemData.image} alt="Dish" className="w-full h-auto rounded" />
          </div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Price: {itemData.price}</h5>
          </div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Category: {itemData.category}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
