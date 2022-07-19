import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup";

const VenueMarkers = (props) => {
  const { venues } = props;
  //console.log(venues)
  const markers = venues.map((venue, i) =>(
    //console.log(venue.direccion.latitud)
    <Marker key={i} position={[venue.direccion.latitud, venue.direccion.longitud]} icon={VenueLocationIcon}>
      <MarkerPopup data={venue} />
      <Tooltip>{venue.telefono}</Tooltip>
    </Marker>
  ))
  /* const markers = venues.map((venue, i) => (
    <Marker key={i} position={venue.geometry} icon={VenueLocationIcon}>
      <MarkerPopup data={venue} />
      <Tooltip>{venue.description}</Tooltip>
    </Marker>
  ));*/
  return <>{markers}</>;
};

export default VenueMarkers;
