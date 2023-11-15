import React from "react";
import { useState, useEffect } from "react";

const useGeoloc = (a) => {
  const [coord, setCoord] = useState({ latitude: null, longitude: null });

  const result = async () =>
    await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          resolve({ latitude: latitude, longitude: longitude });
        },
        (error) => {
          console.error("Unable to retrieve your location", error);
          reject(error);
        }
      );
    });
  useEffect(() => {
    if (a) {
      try {
        result().then((resolve) =>
          setCoord({ latitude: resolve.latitude, longitude: resolve.longitude })
        );
      } catch (error) {
        console.error(
          "Errore durante l'aggiornamento delle coordinate:",
          error
        );
      } finally {
      }
    } else {
      setCoord({ latitude: null, longitude: null });
    }
  }, [a]);

  return coord;

  // let pos = { latitude: null, longitude: null };
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(success, error);
  //   return pos;
  // } else {
  //   console.log("Geolocation not supported");
  // }
  // // }, []);
  // function success(position) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   pos.latitude = latitude;
  //   pos.longitude = longitude;
  // }
  // function error() {
  //   console.log("Unable to retrieve your location");
  // }
  // return pos;
};

export default useGeoloc;
