import React from "react";
import L from "leaflet";
import { MapContainer, Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import useGeoloc from "../../hooks/Geoloc";
import { useState, useEffect } from "react";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Maps = () => {
  const [position, setPosition] = useState(null);
  const RisultatoGeoloc = useGeoloc();
  console.log(RisultatoGeoloc);
  useEffect(() => {
    if (!RisultatoGeoloc) {
      setPosition(RisultatoGeoloc);
    }
  }, []);

  return (
    <div id="map" style={{ height: "30rem" }}>
      <MapContainer
        style={{ height: "100%" }}
        center={[position.longitude, position.latitude]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.longitude, position.latitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
