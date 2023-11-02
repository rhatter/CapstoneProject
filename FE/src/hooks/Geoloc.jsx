import React from "react";
import { useState, useEffect } from "react";

const useGeoloc = (a) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setPosition({ latitude: latitude, longitude: longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }
  function error() {
    console.log("Unable to retrieve your location");
  }

  return position;
};

export default useGeoloc;
