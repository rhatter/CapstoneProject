import React from "react";
import Nominatim from "nominatim-geocoder";

const useFromTextToCoord = (e) => {
  const geocoder = new Nominatim();

  geocoder
    .search({ q: "Berlin, Germany" })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default useFromTextToCoord;
