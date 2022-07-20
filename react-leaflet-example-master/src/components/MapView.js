import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";
import Search from "react-leaflet-search";
import ReactLeafletSearch from "react-leaflet-search";

import { useLocation, useHistory } from "react-router-dom";

import "leaflet/dist/leaflet.css";



const MapView = (props) => {
  const [state, setState] = useState({
    currentLocation: { lat: 52.52437, lng: 13.41053 },
    zoom: 13,
    data,
  });

  const searchComponent = props => (
    <ReactLeafletSearch
              position="topleft"
              provider="BingMap"
              providerOptions={{providerKey:"{ApfWE-1r-SMGlsQqx0X4FjU8S55-GxUNyCJRvUZdGPvPezKBd5OT4OfOr-kC_Q-T}"}} />
  )
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
        pathname: "/map",
        state: {},
      });
    }
  }, [location]);

  return (
    <Map center={state.currentLocation} zoom={state.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Markers venues={state.data.venues} />
      <ReactLeafletSearch
    position="topleft"
    inputPlaceholder="The default text in the search bar"
    search={[]} // Setting this to [lat, lng] gives initial search input to the component and map flies to that coordinates, its like search from props not from user
    zoom={7} // Default value is 10
    showMarker={true}
    showPopup={false}
    openSearchOnLoad={false} // By default there's a search icon which opens the input when clicked. Setting this to true opens the search by default.
    closeResultsOnClick={false} // By default, the search results remain when you click on one, and the map flies to the location of the result. But you might want to save space on your map by closing the results when one is clicked. The results are shown again (without another search) when focus is returned to the search input.
    providerOptions={{searchBounds: []}} // The BingMap and OpenStreetMap providers both accept bounding coordinates in [se,nw] format. Note that in the case of OpenStreetMap, this only weights the results and doesn't exclude things out of bounds.
    customProvider={undefined | {search: (searchString)=> {}}} // see examples to usage details until docs are ready
      />
    </Map>
  );
};

export default MapView;
