import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./VenueMarkers";
import "leaflet/dist/leaflet.css";
import ReactLeafletSearch from "react-leaflet-search";

/*Datos para mostrar los marcadores*/
import data from "../../assests/data.json"; 
import Search from "react-leaflet-search/lib/Search-v1";

import { useLocation, useHistory } from "react-router-dom";
import L from "leaflet";

const searchComponent = (props) => <ReactLeafletSearch position="topleft" provider="OpenStreetMap" providerOptions={{ region: "gb" }} />;






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
    console.log("la ubi del click")
    console.info("Lat:", lat);
    console.info("Lng: ",lng);
  }
  const myIcon = L.icon({
    iconUrl: "/static/media/venue_location_icon.bd6f36a3.svg",
    iconSize: [40, 41],
    iconAnchor: [40, 41],
    popupAnchor: [-30, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
  

  return (
    <div id="map">
    <Map  center={state.currentLocation} zoom={state.zoom} onClick={locate}>
      <TileLayer
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" default map
        url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data.venues} />
      
      <ReactLeafletSearch
        position="topleft"
        markerIcon={myIcon}
        provider="OpenStreetMap"
        search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
        zoom={10} // Default value is 10
        showMarker={true}
        showPopup={false}
        closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
        providerOptions={{searchBounds: []}} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
      />
    </Map >
    </div>
  );
};

export default MapView;
