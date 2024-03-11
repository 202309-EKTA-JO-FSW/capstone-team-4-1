"use client"
import React, { useState, useEffect } from 'react';
import LoadingAnimation from '../../../../components/loadingAnimation';
import Counter from './components/counter';

export default function AddItem({ dishId, closeItem }) {
  const dishID  = dishId;
  const [item, setItem] = useState();
  const [count, setCount] = useState(1);


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

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };
  if (!item) { 
    return <LoadingAnimation />; 
  }

  const totalPrice = (item.price * count).toFixed(2);
  
  return (
    <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative mx-auto my-0 top-1/2 -right-1/2 left-0 -translate-y-1/2 border
         w-[650px] shadow-lg rounded-3xl bg-white
           xl:p-5 xl:w-[450px] xl:h-auto xl:rounded-3xl xl:shadow-lg 
             md:p-3 md:w-[400px] md:h-auto md:rounded-2xl md:shadow-sm 
               2xs:p-1 2xs:w-[250px] 2xs:h-auto 2xs:rounded-xl 2xs:shadow-xs">

        <button onClick={closeItem} className="absolute top-5 right-5 p-1 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200
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
        <div className="flex flex-col space-y-4 pt-2 items-left justify-left">
          
          <div className="flex mt-8 justify-center items-center">
            <img src={item.image} alt="Dish" className="w-[200px] h-auto rounded-3xl" />
          </div>

          <div className="flex flex-row mb-2 space-x-4 justify-center items-center mr-[2rem] ml-[2rem]">
            <h1 className="flex text-gray-700 text-2xl text-left font-bold">{item.title}</h1>
            <h5 className="flex text-gray-700 text-2xl text-left font-bold">{item.price}JOD</h5>
          </div>

          <div>
            <h5 className="block text-gray-500 text-xs font-md mb-2 mr-[2rem] ml-[2rem]">{item.description}</h5>
          </div>
          
          <div className="flex justify-center items-center">
          <Counter count={count} onCountChange={handleCountChange} />
          </div>

          <div className="flex justify-center items-center w-full ">
              <input type="text" id="streetName" name="streetName" placeholder="Note: (optional)" className="mr-[2rem] ml-[2rem] w-full px-2 py-[1rem] bg-gray-50 rounded-xl border border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"/>
          </div>
          <div className="flex justify-center items-center w-full ">
          <button onClick={closeItem}
          type="submit"
                className="bg-[#FFC245] hover:bg-[#101B0B] hover:text-[#FFC245] text-gray-700 font-medium w-full mr-[2rem] ml-[2rem]
                xl:rounded-xl xl:text-lg  xl:px-4 xl:py-2
                md:rounded-lg md:text-sm  md:px-3 md:py-1
                2xs:rounded-md 2xs:text-[10px] 2xs:px-2 2xs:py-1
                ">
              Add {count} for {totalPrice} JOD
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
}
