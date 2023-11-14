import React from "react";
import Nominatim from "nominatim-geocoder";
import { useState, useEffect } from "react";

const useFromTextToCoord = (e) => {
  const [coord, setCoord] = useState(null);
  useEffect(() => {
    if (e) {
      const geocoder = new Nominatim();
      geocoder
        .search({ q: e })
        .then((response) => {
          //console.log(response);
          setCoord(response);
          return response;
        })
        .catch((error) => {
          //console.log(error);
        });
    }
  }, [e]);
  return coord;
};

export default useFromTextToCoord;
