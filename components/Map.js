import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
// import Marker from "../components/Marker";

useState;
function Map({ searchResult }) {
  const coords = searchResult.map((item) => ({
    latitude: item.lat,
    longitude: item.long,
  }));

  const [setlectedLocation, setSetlectedLocation] = useState({});

  const center = getCenter(coords);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={
        "pk.eyJ1Ijoibm90cGFua2FqIiwiYSI6ImNrcng1YjVzdzA0bDgybm85eTRzN3k0YjUifQ.n7zfDfaoRJidPJRZ7qAnww"
      }
      mapboxStyle="mapbox://styles/notpankaj/cks38xq0z4sf118t3lhacnwbi"
      {...viewport}
      onViewportChange={(nextViewport) => {
        console.log(nextViewport);
        setViewport(nextViewport);
      }}
    >
      {searchResult.map((place) => (
        <div key={place.lat}>
          <Marker
            longitude={place.long}
            latitude={place.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              aria-label="push-pin"
              onClick={() => setSetlectedLocation(place)}
              className="cursor-pointer animate-bounce hover:rotate-45"
            >
              📌
            </p>
          </Marker>
          {setlectedLocation.long === place.long ? (
            <Popup
              onClose={() => setSetlectedLocation({})}
              closeOnClick={true}
              latitude={place.lat}
              longitude={place.long}
            >
              {place.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
