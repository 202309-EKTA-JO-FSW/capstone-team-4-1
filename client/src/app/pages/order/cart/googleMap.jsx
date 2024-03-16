"use client"
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';

const libraries = ['places', 'marker'];
export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const defaultCenter = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelected({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error("Error getting the location");
        }
      );
    }
  }, []);

  return (
  <>
    <div className="flex w-full flex-col">
      <div className="mt-6 mb-6">
        <GoogleMap
          zoom={10}
          center={selected || defaultCenter}
          mapContainerClassName="map-container"
          mapId="5ea48e7f895e8dad"
          // onLoad={onMapLoad}
        >
          {selected && (
            <AdvancedMarker position={selected} />
          )}
        </GoogleMap>
      </div>

      <div className="pr-8 flex space-between flex-row">
        <div className="pt-2 pr-2">
        <svg width="30px" height="30px" viewBox="-0.32 -0.32 16.64 16.64" xmlns="http://www.w3.org/2000/svg" fill="#FF" stroke="#FF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 8 0 c -3.3125 0 -6 2.6875 -6 6 c 0.007812 0.710938 0.136719 1.414062 0.386719 2.078125 l -0.015625 -0.003906 c 0.636718 1.988281 3.78125 5.082031 5.625 6.929687 h 0.003906 v -0.003906 c 1.507812 -1.507812 3.878906 -3.925781 5.046875 -5.753906 c 0.261719 -0.414063 0.46875 -0.808594 0.585937 -1.171875 l -0.019531 0.003906 c 0.25 -0.664063 0.382813 -1.367187 0.386719 -2.078125 c 0 -3.3125 -2.683594 -6 -6 -6 z m 0 3.691406 c 1.273438 0 2.308594 1.035156 2.308594 2.308594 s -1.035156 2.308594 -2.308594 2.308594 c -1.273438 -0.003906 -2.304688 -1.035156 -2.304688 -2.308594 c -0.003906 -1.273438 1.03125 -2.304688 2.304688 -2.308594 z m 0 0" fill="#FFC254"></path> </g></svg>
        </div>
        <div className="w-full">
          <PlacesAutocomplete setSelected={setSelected} />
        </div>
      </div>

    </div>
  </>
  );
}

function AdvancedMarker({ position }) {
  const marker = useRef(null);

  useEffect(() => {
    if (position) {
      marker.current = new window.google.maps.marker.AdvancedMarkerElement({
        position,
        title: 'Your Location',
      });
    }
  }, [position]);

  return null;
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      country: ['jo'],
    },
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="py-2 px-4 w-full border-b focus:border-[#FFC245] focus:border-b-2 focus:outline-none bg-gray-50"
        placeholder="Search an address"
      />
    </Combobox>
  );
};
