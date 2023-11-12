import React from "react";
import L from "leaflet";
import { MapContainer, Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import useGeoloc from "../../hooks/Geoloc";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CoordUpdate } from "../../reducers/generalCoord";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Maps = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  const coord = useSelector((select) => select);

  const mappa = () => {
    return (
      <div id="map" style={{ height: "30rem" }}>
        <MapContainer
          style={{ height: "100%" }}
          center={[coord.coord.value.latitude, coord.coord.value.longitude]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[coord.coord.value.latitude, coord.coord.value.longitude]}
          >
            <Popup>Torino</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  };

  return <>{coord.coord.value.latitude && mappa()}</>;
};

export default Maps;