import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/loadingAnimation'; // Adjust the path as necessary

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default LoadingAnimation;
