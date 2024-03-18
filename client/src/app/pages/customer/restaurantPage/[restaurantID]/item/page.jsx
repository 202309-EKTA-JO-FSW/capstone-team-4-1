"use client";
import React, { useState, useEffect } from "react";
import EmptyOrderAnimation from "@/app/components/emptyOrderAnim";
import Link from "next/link";
export default function Item() {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  
  const updateCart = () => {
    const userID = localStorage.getItem('userID');
    const cartData = localStorage.getItem(`cart_${userID}`);
    const fee = localStorage.getItem('deliveryFee');
  if (fee) {
    setDeliveryFee(parseFloat(fee));
  }
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  const handleCountChange = (dishId, newCount) => {
    const userID = localStorage.getItem('userID');
    const updatedCartItems = cartItems.map(item => {
      if (item.dishId === dishId) {
        return { ...item, count: newCount, totalPrice: (item.price * newCount).toFixed(2) };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userID}`, JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (dishId) => {
    const userID = localStorage.getItem('userID');
    const updatedCartItems = cartItems.filter(item => item.dishId !== dishId);
    
    setCartItems(updatedCartItems);
    localStorage.setItem(`cart_${userID}`, JSON.stringify(updatedCartItems));
  };
  // const totalQuantity = cartItems.reduce((total, item) => total + item.count, 0);
  const totalPrice = (cartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0)).toFixed(2);
  const totalPriceWithDelivery = (cartItems.reduce((total, item) => total + parseFloat(item.totalPrice), 0) + deliveryFee).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white justify-center items-center border shadow-3xl rounded-2xl">
        <h1 className="font-bold text-2xl text-gray-700 mb-5 mt-8 border-b">Your Order</h1>
        <EmptyOrderAnimation />
        <p className="font-sm text-sm mt-5 mb-5 text-center px-10">
          You've not added any products yet. When you do, you'll see them here!
        </p>
      </div>
    );
  }
  console.log(cartItems)
  return (
    <div className="flex flex-col bg-white justify-center rounded-2xl items-center border px-2">
      <h1 className="font-bold text-2xl w-full text-center pb-2 text-gray-700 mt-5 border-b">Your Order</h1>
      <div style={{ maxHeight: cartItems.length >= 3 ? '274px' : 'auto', overflowY: cartItems.length > 3 ? 'scroll' : 'visible' }} className="w-full border-b pb-4">
      {cartItems.map((item) => (
        <div key={item.dishId} className="flex flex-col w-full py-3">
          <div className="flex flex-row justify-left items-top ml-5">
            <img
              className="itemImage w-[60px] h-[60px] rounded-3xl"
              src={item.image ? item.image : "/placeholder.png"}
              alt={item.title}
            />
            <div className="text-left flex-grow pl-3">
              <h2 className="text-md font-md">{item.title}</h2>
              <span className="mr-3 text-md font-bold pr-10 pt-10">{parseFloat(item.totalPrice).toFixed(2)}<span className="text-xs">JOD</span></span>
            </div>
          </div>
          
          <div className="flex flex-row justify-end items-right -mt-[1.5rem]">
            <div className="justify-right ml-4">
              <button 
                onClick={() => item.count > 1 ? handleCountChange(item.dishId, item.count - 1) : handleRemoveItem(item.dishId)}
                className="px-1 py-1/2 text-xs font-bold text-[#FFC245] bg-gray-600 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none"
              >
                -
              </button>
              
            </div>
            <div className="justify-right">
              <span className="mx-1 text-md text-center font-sm">{item.count}</span>
            </div>
            <div className="justify-right mr-4">
            
              <button 
                onClick={() => handleCountChange(item.dishId, item.count + 1)}
                className="px-1 py-1/2 text-xs font-bold text-[#101B0B] bg-[#FFC245] rounded-full hover:bg-[#101B0B] hover:text-[#FFC245] focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
      <div className="w-full text-left pl-7">
          <h1 className="text-sm mt-2 text-left pt-2 text-gray-700">Sub Total: {totalPrice} <span className="text-xs">JOD</span></h1>
          <h1 className="text-sm mt-2 text-left text-gray-700">Delivery Fee: {deliveryFee} <span className="text-xs">JOD</span></h1>
          <h1 className="text-sm mt-2 text-left pt-2 font-bold text-gray-700">Total amount: {totalPriceWithDelivery} <span className="text-xs">JOD</span></h1>
      </div>
      <div className="flex items-center justify-center">
          <Link href="/pages/order"><button className="w-full text-md mt-4 mb-5 px-[4rem] py-1 rounded-2xl bg-[#FFC245] text-black hover:bg-[#101B0B] hover:text-[#FFC245]">Proceed To Checkout</button></Link>
      </div>
    </div>
  );
}