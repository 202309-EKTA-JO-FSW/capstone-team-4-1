"use client"
import React, { useState, useEffect } from 'react';
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromLatLng,
} from "react-geocode";

setDefaults({
  key: "AIzaSyDEGmmofoNnuXXtkx6CxIIMgzk1Tkq5kKk",
  language: "en",
  region: "es",
});

setKey("AIzaSyDEGmmofoNnuXXtkx6CxIIMgzk1Tkq5kKk");
setLanguage("en");
setRegion("es");

const LocationDisplay = () => {
  const [location, setLocation] = useState([0,0]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fromLatLng(latitude, longitude).then(
          response => {
            const address = response.results[0].formatted_address;
            setLocation(address);
          },
          error => {
            console.error(error);
          }
        );
      });
    }
  }, []);

  return (
    <div className="location-input-container">
      <label htmlFor="location" className="block text-left">Your Location<span className="text-red-900"> *</span>:</label>
      <input 
        type="text" 
        id="location" 
        name="location" 
        value={location}
        readOnly 
        className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
      />
    </div>
  );
};

export default LocationDisplay;
