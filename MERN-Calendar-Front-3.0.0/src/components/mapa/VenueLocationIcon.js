import L from "leaflet";

export const VenueLocationIcon = L.icon({
  iconUrl: require("../../assests/venue_location_icon.svg"),
  iconRetinaUrl: require("../../assests/venue_location_icon.svg"),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
