// counter.jsx
import React, { useState } from 'react';

const Counter = ({ count, onCountChange }) => {
  const incrementCount = () => {
    onCountChange(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      onCountChange(count - 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={decrementCount}
        disabled={count === 1}
        className="px-6 py-4 text-lg font-bold text-[#FFC245] bg-gray-200 rounded-full hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
      >
        -
      </button>
      <span className="mx-2 font-bold text-center w-12 rounded text-xl text-gray-700">
        {count}
      </span>
      <button
        onClick={incrementCount}
        className="px-6 py-4 text-lg font-bold text-[#101B0B] bg-[#FFC245] rounded-full hover:bg-[#101B0B] hover:text-[#FFC245] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
