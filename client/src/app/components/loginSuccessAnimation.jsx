import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/loginSuccessfullyAnim"; // Adjust the path as necessary

const LoginSuccessAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div style={{ pointerEvents: "none" }}>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    </div>
  );
};

export default LoginSuccessAnimation;
