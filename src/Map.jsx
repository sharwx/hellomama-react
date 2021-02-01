import React from 'react';
import './Map.scss';
import {useState, useEffect } from 'react';
import {render} from 'react-dom';
import MapGL, { Marker } from 'react-map-gl';

import { getLocations } from './API';

// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN


function Map() {
    const [locations, setLocations] = useState([])
    const [viewport, setViewport] = useState({
      latitude: 1.364917,
      longitude: 103.822872,
      zoom: 10.75,
      bearing: 0,
      pitch: 0
    });

    useEffect(() => {
      (async () => {
        const locations = await getLocations()
        setLocations(locations)
        // console.log(locations)
      })()
    }, [])
  
    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {/* {
          locations.map(entry => (
            <Marker 
            key={entry.id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-20} 
            offsetTop={-10}
            >
              <div>{entry.location_name}</div>
            </Marker>
          ))
        } */}
      </MapGL>
    );
}
  
document.body.style.margin = 0;
render(<Map />, document.body.appendChild(document.createElement('div')));

export default Map;
