"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import '@reach/combobox/styles.css';
import { setDefaults, setKey, setLanguage, setRegion, fromLatLng } from "react-geocode";

setKey("AIzaSyDEGmmofoNnuXXtkx6CxIIMgzk1Tkq5kKk");
setDefaults({
  language: "en",
  region: "JO",
});
setLanguage("en");
setRegion("JO");

const libraries = ['places'];

const GoogleMapComponent = ({ onLocationSet, onAddressChange }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDEGmmofoNnuXXtkx6CxIIMgzk1Tkq5kKk",
    libraries,
  });

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [hasFetchedInitialLocation, setHasFetchedInitialLocation] = useState(false);
  const mapRef = useRef();
  const autocompleteInputRef = useRef();
  const autocomplete = useRef(null);

  useEffect(() => {
    const fetchInitialLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
            onLocationSet({ lat: latitude, lng: longitude });

            fromLatLng(latitude, longitude).then(
              response => {
                const initialAddress = response.results[0]?.formatted_address;
                onAddressChange(initialAddress);
              },
              error => {
                console.error("Error fetching address:", error);
                onAddressChange('Unable to retrieve your address');
              }
            );

            setHasFetchedInitialLocation(true);
          },
          (error) => {
            console.error("Geolocation error:", error);
            onAddressChange('Geolocation permission denied');
            setHasFetchedInitialLocation(true);
          }
        );
      } else {
        onAddressChange('Geolocation is not supported by this browser.');
        setHasFetchedInitialLocation(true);
      }
    };

    if (!hasFetchedInitialLocation) {
      fetchInitialLocation();
    }

    if (isLoaded && !autocomplete.current) {
      autocomplete.current = new window.google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        { types: ['geocode'],
        fields: ['place_id', 'geometry', 'formatted_address', 'name'],
        componentRestrictions: { country: "JO" }
      }
      );

      autocomplete.current.addListener("place_changed", () => {
        const place = autocomplete.current.getPlace();
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        setLocation(newLocation);
        onLocationSet(newLocation);

        const address = place.formatted_address;
        onAddressChange(address);
      });
    }
  }, [isLoaded, hasFetchedInitialLocation, onLocationSet, onAddressChange]);

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setLocation({ lat, lng });
    onLocationSet({ lat, lng });

    fromLatLng(lat, lng).then(
      response => {
        const newAddress = response.results[0]?.formatted_address;
        onAddressChange(newAddress);
      },
      error => {
        console.error("Error fetching address:", error);
        onAddressChange('Unable to retrieve address for this location.');
      }
    );
  }, [onLocationSet, onAddressChange]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <>
    <div className="flex w-full mt-4">
      <input 
        ref={autocompleteInputRef}
        type="text" 
        placeholder="Enter a location"
        className="w-full px-3 py-2 bg-gray-50 border-b border-gray-300 focus:border-b-2 focus:border-[#FFC245] focus:outline-none"
      />
      </div>
      <div className="flex w-full flex-col">
        <div className="mt-6 mb-6">
          <GoogleMap
            zoom={15}
            center={location.lat ? location : { lat: -34.397, lng: 150.644 }}
            mapContainerClassName="map-container"
            mapId="5ea48e7f895e8dad"
            onLoad={map => mapRef.current = map}
            onClick={handleMapClick}
          >
            {location.lat && <Marker position={location} />}
          </GoogleMap>
        </div>
      </div>
    </>
  );
}

export default GoogleMapComponent;