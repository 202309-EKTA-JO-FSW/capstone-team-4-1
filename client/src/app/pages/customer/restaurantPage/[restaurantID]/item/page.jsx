"use client"
import React, { useState, useEffect } from "react";
import EmptyOrderAnimation from "@/app/components/emptyOrderAnim";

export default function Item() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const updateCartItems = () => {
      const loadedCart = localStorage.getItem('cart');
      if (loadedCart) {
        const parsedCart = JSON.parse(loadedCart);
        setCartItems(parsedCart);
        
        // Log the cart items to the console
        console.log("Cart items loaded:", parsedCart);
      }
    };
  
    updateCartItems();
  
    // Assuming that you have the event listener set up to listen for changes
    window.addEventListener('storage', updateCartItems);
  
    return () => {
      window.removeEventListener('storage', updateCartItems);
    };
  }, []);
  

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white justify-center items-center border shadow-3xl rounded-2xl" 
           style={{ boxShadow: 'rgb(171, 169, 171) 0px 0px 5px 0px' }}>
        <h1 className="font-bold text-2xl text-gray-700 mb-5 mt-8">Your Order</h1>
        <EmptyOrderAnimation />
        <p className="flex justify-center font-sm text-sm mt-5 mb-5 text-center mr-[2rem] ml-[2rem]">
          You've not added any products yet. When you do, you'll see them here!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white justify-center items-center border shadow-3xl rounded-2xl" 
         style={{ boxShadow: 'rgb(171, 169, 171) 0px 0px 5px 0px' }}>
      <h1 className="font-bold text-2xl text-gray-700 mb-5 mt-8">Your Order</h1>
      {/* Map through cartItems to display each item */}
      {cartItems.map((item) => (
  <div key={item.dishId} className="p-4 flex items-center justify-between">
    <div>
      <h2 className="text-lg font-bold">{item.count}x {item.title}</h2>
      <p className="text-sm">{item.description}</p>
    </div>
    <span className="text-lg font-bold">{parseFloat(item.totalPrice).toFixed(2)}€</span>
    {item.image && (
      <img src={item.image} alt={item.title} className="w-full h-auto rounded-xl mt-4" />
    )}
  </div>
))}
    </div>
  );
}
