import React, { useState, useEffect } from "react";
import EmptyOrderAnimation from "@/app/components/emptyOrderAnim";

export default function Item() {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = () => {
    const userId = localStorage.getItem('userId');
    const cartData = localStorage.getItem(`cart_${userId}`);
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  const handleCountChange = (dishId, newCount) => {
    const userId = localStorage.getItem('userId');
    const updatedCartItems = cartItems.map(item => {
      if (item.dishId === dishId) {
        return { ...item, count: newCount, totalPrice: (item.price * newCount).toFixed(2) };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (dishId) => {
    const userId = localStorage.getItem('userId');
    const updatedCartItems = cartItems.filter(item => item.dishId !== dishId);

    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCartItems));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white justify-center items-center border shadow-3xl rounded-2xl">
        <h1 className="font-bold text-2xl text-gray-700 mb-5 mt-8">Your Order</h1>
        <EmptyOrderAnimation />
        <p className="font-sm text-sm mt-5 mb-5 text-center">
          You've not added any products yet. When you do, you'll see them here!
        </p>
      </div>
    );
  }
  console.log(cartItems)
  return (
    <div className="flex flex-col bg-white justify-center items-center border shadow-3xl rounded-2xl">
      <h1 className="font-bold text-2xl text-gray-700 mb-5 mt-8">Your Order</h1>
      
      {cartItems.map((item) => (
        <div key={item.dishId} className="flex flex-col w-full items-center justify-between px-2 py-6">
          <div className="flex space-between space-x-[12rem]">
           <span className="mr-3 text-lg font-bold pr-10">{parseFloat(item.totalPrice).toFixed(2)}€</span>
            <span className="mx-3 text-lg font-bold">{item.count}x</span>
          </div>
          <div className="flex flex-row">
            <div className="justify-center ml-4">
              <button 
                onClick={() => item.count > 1 ? handleCountChange(item.dishId, item.count - 1) : handleRemoveItem(item.dishId)}
                className="px-2 py-1 text-sm font-bold text-[#FFC245] bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                -
              </button>
              
            </div>
            <div className="text-center flex-grow mx-4">
              <h2 className="text-md font-medium">{item.title}</h2>
            </div>
            <div className="justify-center mr-4">
            
              <button 
                onClick={() => handleCountChange(item.dishId, item.count + 1)}
                className="px-2 py-1 text-sm font-bold text-[#101B0B] bg-[#FFC245] rounded-full hover:bg-[#101B0B] hover:text-[#FFC245] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
