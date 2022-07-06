import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Consultorios2.css';

const Home = () => {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div className="wrapper_imagen">
    <div className="wrapper">
      <h1>Consultorios</h1>
      <p>Latitude: {state.latitude}</p>
      <p>longitude: {state.longitude}</p>

      <Link
        to={{
          pathname: "/consultorios2",
          // state: {
          //   hello: 'world'
          // }
          state,
        }}
      >
        <button type="button" class="btn btn-primary">Ver nuestros consultorios</button>
      </Link>
    </div>
    </div>
  );
};

export default Home;
