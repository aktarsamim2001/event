"use client";

import React, { useState, useRef, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaDirections, FaTimes } from 'react-icons/fa';
import Button from '../ui/Button';

function EventMap({ aboutEvent }) {
  const eventAddress = useSelector((state) => 
    state.eventDetails?.data?.event?.formated_addresss
  );

  // Define the position for the map center and marker based on event location
  const position = {
    lat: aboutEvent?.location?.lat || 37.7749,
    lng: aboutEvent?.location?.lng || -122.4194
  };

  // State to control the custom popup visibility - set to true by default
  const [popupOpen, setPopupOpen] = useState(true);
  const popupRef = useRef(null);

  // Check if valid coordinates are available
  const hasValidCoordinates = 
    aboutEvent?.location?.lat != null && 
    aboutEvent?.location?.lng != null;
    
  // Function to open Google Maps directions in a new tab
  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom Popup Component
  const CustomPopup = () => {
    if (!popupOpen) return null;
    
    return (
      <div 
        ref={popupRef}
        className="absolute z-10 bg-white rounded-lg shadow-lg" 
        style={{
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '280px',
          Width: '100%'
        }}
      >
        <div className="relative p-4">
          <button 
            onClick={() => setPopupOpen(false)}
            className="absolute top-2 cursor-pointer right-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={16} />
          </button>
          
          <div className="flex items-start mb-3">
            <FaMapMarkerAlt size={20} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <h3 className="font-bold text-base __heading">Event Location</h3>
          </div>
          
          <p className="text-gray-700 text-sm mb-3 __text">
            {eventAddress || "Address not available"}
          </p>
          
          <Button 
            onClick={openDirections}
            varient={"fill"}
            className="flex items-center justify-center rounded-2xl w-full cursor-pointer hover:!text-black !py-1.5 !px-4 transition duration-200"
          >
            <span className="flex items-center __text">
              <FaDirections className="mr-2" />
              Get Directions
            </span>
          </Button>
        </div>
      </div>
    );
  };

  const CustomMarker = () => (
    <div onClick={() => setPopupOpen(true)}>
      <div className="relative">
        <FaMapMarkerAlt size={32} className="text-red-500 cursor-pointer" />
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full" />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      <APIProvider apiKey="AIzaSyBC56F9VQxdmgQyCmI5vEUC6PqEl9IPQU4">
        {hasValidCoordinates ? (
          <Map
            mapId="event-venue-map"
            style={{ width: '100%', height: '100%' }}
            defaultCenter={position}
            defaultZoom={15}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapTypeControl={false}
          >
            <AdvancedMarker
              position={position}
              onClick={() => setPopupOpen(true)}
              title="Event Location"
            >
              <CustomMarker />
            </AdvancedMarker>
            
            <CustomPopup />
          </Map>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center p-4">
              <FaMapMarkerAlt className="text-gray-400 text-4xl mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Map location unavailable</p>
              <p className="text-gray-500 text-sm mt-1">Please check back later</p>
            </div>
          </div>
        )}
      </APIProvider>
    </div>
  );
}

export default EventMap;