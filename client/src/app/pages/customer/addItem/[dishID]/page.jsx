"use client"
import React, { useState, useEffect } from 'react';
import LoadingAnimation from '../../../../components/loadingAnimation';

export default function AddItem({ dishId }) {
  const dishID  = dishId;
  const [item, setItem] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    fetch(`http://localhost:3001/customer/dishes/${dishID}`,{
        headers: headers
    })
      .then(res => res.json())
      .then(data => setItem(data))
  }, [dishID]);


  if (!item) { 
    return <LoadingAnimation />; 
  }

  
  return (
    <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative mx-auto my-0 top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 border w-[650px] shadow-lg rounded-3xl bg-white xl:p-5 xl:w-[650px] xl:h-auto xl:rounded-3xl xl:shadow-lg md:p-3 md:w-[400px] md:h-auto md:rounded-2xl md:shadow-sm 2xs:p-1 2xs:w-[250px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs">
        <div className="space-y-4 pt-10">
          <div className="text-center p-2 bg-green-100 text-green-700 rounded-md">Dish Information</div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Title: {item.title}</h5>
          </div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Description: {item.description}</h5>
          </div>
          <div>
            <img src={item.image} alt="Dish" className="w-full h-auto rounded" />
          </div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Price: {item.price}</h5>
          </div>
          <div>
            <h5 className="block text-gray-700 text-sm font-bold mb-2">Category: {item.category}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
