import React from "react";

function Logout({ onLoginClick }) {
  return (
    <button onClick={onLoginClick}>Logout</button>
  );
}

export default Logout;