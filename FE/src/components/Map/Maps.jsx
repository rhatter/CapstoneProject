import React from "react";
import L from "leaflet";
import { MapContainer, Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Maps.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useMap } from "react-leaflet";
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
  const coord = useSelector((select) => select);
  const selector = useSelector((select) => select);
  const articles = selector.FilteredArticles.data;
  // console.log(articles);

  const [mappaRenderizzata, setMappaRenderizzata] = useState(null);

  const Recenter = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
  };

  useEffect(() => {
    if (coord.coord.value.latitude) {
      setMappaRenderizzata(mappa(coord.coord));
      // console.log(mappa(coord.coord));
    }
  }, [coord]);
  let markerKey = 0;

  const mappa = (e) => {
    return (
      <div id="map" style={{ height: "30rem" }}>
        <MapContainer
          style={{ height: "100%" }}
          center={[e.value.latitude, e.value.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <Recenter lat={e.value.latitude} lng={e.value.longitude} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[e.value.latitude, e.value.longitude]}>
            <Popup>Torino</Popup>
          </Marker>
          {articles &&
            articles.map((location) => {
              markerKey++;
              return (
                <Marker
                  position={[location.coord.lat, location.coord.lon]}
                  key={`markerKey${markerKey}`}
                >
                  <Popup>{location.title}</Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    );
  };

  return <>{mappaRenderizzata && mappaRenderizzata}</>;
};

export default Maps;
