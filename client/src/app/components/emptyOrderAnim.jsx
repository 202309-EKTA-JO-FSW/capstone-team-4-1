import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/emptyOrderAnimation';

const EmptyOrderAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Lottie options={defaultOptions} height={100} width={100} />
    </div>
  );
};

export default EmptyOrderAnimation;