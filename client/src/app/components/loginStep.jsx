import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/loginStepAnimation';

const LoginStep = () => {
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
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default LoginStep;
