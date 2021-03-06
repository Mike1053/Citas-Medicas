import React, { useState, useEffect } from "react";
import { Map, TileLayer, SVGOverlay } from "react-leaflet";
import Markers from "./VenueMarkers";
import 'leaflet/dist/leaflet.css';
import './Consultorios2.css';

/*Datos para mostrar los marcadores----------------------------------------------------*/
import data from "../../assests/data.json"; 
/*Datos para mostrar los marcadores----------------------------------------------------*/

import { useLocation, useHistory } from "react-router-dom";

import "leaflet/dist/leaflet.css";

const MapView = (props) => {
  const [state, setState] = useState({
    currentLocation: { lat: 28.6232576, lng: -106.0836492 },
    zoom: 13,
    data,
  });

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.state.latitude && location.state.longitude) {
      const currentLocation = {
        lat: location.state.latitude,
        lng: location.state.longitude,
      };
      console.log(state);
      setState({
        ...state,
        data: {
          venues: state.data.venues.concat({
            name: "new",
            geometry: [currentLocation.lat, currentLocation.lng],
          }),
        },
        currentLocation,
      });
      history.replace({
        pathname: "/consultorios2",
        state: {},
      });
    }
  }, [location]);

  /* Recibes las coordenadas al clickear en el mapa */
  const locate = (e) => {
    let {lat, lng} = e.latlng;
    console.log(e.latlng)
  }

  return (
    <div id="map">
    <Map  center={state.currentLocation} zoom={state.zoom} onClick={locate}>
      <button className="boton">El boton</button>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data.venues} />
    </Map >
    </div>
  );
};

export default MapView;
