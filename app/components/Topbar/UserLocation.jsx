"use client";

import React, { useEffect, useRef, useState } from "react";
import { MdLocationPin, MdMyLocation } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { fetchEventDetails } from "../../store/slice/eventDetails/eventDetailsSlice ";
import { eventNearBy, getEventFilterData } from "../../store/slice/eventFilter/eventFilterSlice";

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    } else {
      reject(new Error("Geolocation is not supported."));
    }
  });
};

export const getAddressFromCoords = async (coords) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const address = data.results[0];
      const cityComponent = address.address_components.find(
        (comp) =>
          comp.types.includes("locality") ||
          comp.types.includes("administrative_area_level_2") ||
          comp.types.includes("postal_town") ||
          comp.types.includes("sublocality")
      );
      const city = cityComponent?.long_name || "Unknown City";

      const locationData = {
        coords: {
          latitude: coords.lat,
          longitude: coords.lng,
        },
        address: address.address_components,
        city,
      };

      localStorage.setItem("userLocation", JSON.stringify(locationData));
      return locationData;
    }
    throw new Error("Geocoding failed");
  } catch (error) {
    throw error;
  }
};

export const getAddressFromGoogle = async () => {
  try {
    const coords = await getUserLocation();
    return await getAddressFromCoords(coords);
  } catch (error) {
    throw error;
  }
};

const Input = ({ className = "", placeholder = "", value, onChange, icon, inputRef }) => (
  <div className="relative w-full">
    <input
      ref={inputRef}
      type="text"
      className={`w-full py-3 px-4 rounded-md bg-gray-800 text-white ${icon ? "pl-10" : ""} ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {icon && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    )}
  </div>
);

const Modal = ({ isOpen, handleClick, children }) => (
  <div
    onClick={handleClick}
    className={`fixed inset-0 ${isOpen ? "z-[900] opacity-100 visible" : "z-[-999] opacity-0 invisible"} flex items-center justify-center backdrop-blur-md bg-black/70 transition-all`}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-black/80 backdrop-blur-lg rounded-2xl shadow-lg w-[95%] md:max-w-2xl p-6 relative"
    >
      <button
        onClick={handleClick}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-300 text-2xl"
        aria-label="Close Modal"
      >
        <FaXmark />
      </button>
      <div>{children}</div>
    </div>
  </div>
);

const UserLocation = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    setHasMounted(true);
    const data = localStorage.getItem("userLocation");
    if (data) {
      try {
        setUserAddress(JSON.parse(data));
      } catch {
        setUserAddress(null);
      }
    }
  }, []);

  const initializeLocation = async () => {
    try {
      if (!userAddress) {
        const locationData = await getAddressFromGoogle();
        setUserAddress(locationData);
        if (locationData.coords?.latitude && locationData.coords?.longitude) {
          dispatch(eventNearBy(locationData.coords.latitude, locationData.coords.longitude));
          dispatch(getEventFilterData());
          if (slug) dispatch(fetchEventDetails(slug));
        }
      } else if (userAddress.coords?.latitude && userAddress.coords?.longitude) {
        dispatch(eventNearBy(userAddress.coords.latitude, userAddress.coords.longitude));
        dispatch(getEventFilterData());
        if (slug) dispatch(fetchEventDetails(slug));
      }
    } catch (error) {
      console.error("Failed to initialize location:", error);
    }
  };

  useEffect(() => {
    if (hasMounted) initializeLocation();
  }, [hasMounted]);

  useEffect(() => {
    if (userAddress?.coords?.latitude && userAddress?.coords?.longitude) {
      dispatch(eventNearBy(userAddress.coords.latitude, userAddress.coords.longitude));
    }
  }, [userAddress, dispatch]);

  const initAutocomplete = () => {
    if (window.google?.maps?.places && inputRef.current) {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["(cities)"],
      });
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        const cityName =
          place.address_components?.find((c) => c.types.includes("locality"))?.long_name ||
          place.formatted_address?.split(",")[0].trim() ||
          "Unknown City";

        const locationData = {
          city: cityName,
          fullDescription: place.formatted_address || cityName,
          placeId: place.place_id || "unknown",
          coords: place.geometry?.location
            ? {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
              }
            : null,
        };
        localStorage.setItem("userLocation", JSON.stringify(locationData));
        setUserAddress(locationData);
        setSearchQuery("");
        setErrorMessage(null);
        setIsOpen(false);
      });
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "ArrowDown" }));
        }
      }, 200);
    } else {
      console.warn("Google Autocomplete not initialized", {
        google: !!window.google,
        maps: !!window.google?.maps,
        places: !!window.google?.maps?.places,
        inputPresent: !!inputRef.current,
      });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
    if (existingScript?.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    if (window.google) delete window.google;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initAutocomplete;
    script.onerror = () => setErrorMessage("Failed to load Google Maps API.");
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [isOpen]);

  const onDetectLocation = async () => {
    setDetecting(true);
    setErrorMessage(null);
    try {
      const location = await getAddressFromGoogle();
      setUserAddress(location);
      localStorage.setItem("userLocation", JSON.stringify(location));
      setIsOpen(false);
    } catch {
      setErrorMessage("User denied Geolocation access");
    }
    setDetecting(false);
  };

  return (
    <div className="relative flex items-center gap-2 rounded-full px-2 py-0.5 text-[16px] text-white cursor-pointer select-none hover:border-primary transition-all duration-500">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
      >
        <MdLocationPin size={24} />
        <span>
          Your Location: {hasMounted && userAddress?.city ? userAddress.city : "My Location"}
        </span>
      </div>

      <Modal isOpen={isOpen} handleClick={() => setIsOpen(false)}>
        <div>
          <h2 className="text-xl mb-4">Change Your Location</h2>
          <Input
            placeholder="Search for your city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<MdLocationPin size={25} />}
            inputRef={inputRef}
          />
          <button
            onClick={onDetectLocation}
            className="text-white hover:text-[#22F106] flex items-center gap-2 cursor-pointer py-4 transition-colors"
            disabled={detecting}
          >
            {detecting ? <AiOutlineLoading3Quarters className="animate-spin" /> : <MdMyLocation />}
            Detect my location
          </button>
          {errorMessage && <p className="text-red-500 italic">{errorMessage}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default UserLocation;