import React from "react";
import { useState, useEffect } from "react";

const useGeoloc = (a) => {
  let pos = {};
  // useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    return pos;
  } else {
    console.log("Geolocation not supported");
  }
  // }, []);
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(
    //   `dal custom hook Latitude: ${latitude}, Longitude: ${longitude}`
    // );
    pos.latitude = latitude;
    pos.longitude = longitude;
  }
  function error() {
    console.log("Unable to retrieve your location");
  }

  //return pos;
};

export default useGeoloc;
