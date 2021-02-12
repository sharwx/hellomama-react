import React from 'react'
import jwt from 'jwt-decode'
import axios from 'axios'
import './Map.scss';
import {useState, useEffect } from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { getLocations } from './components/API'
import AddLocationForm from './components/AddLocationForm'


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

function Map() {
    const [locations, setLocations] = useState([])
    const [showPopup, setShowPopup] = useState({})
    const [cookies, setCookies] = useCookies(["token"])
    const [addEntryLocation, setAddEntryLocation] = useState(null)
    const [viewport, setViewport] = useState({
      latitude: 1.364917,
      longitude: 103.82287,
      zoom: 10.5,
      bearing: 0,
      pitch: 0
    });

    const listLocations = async () => {
      const result = await getLocations()
      setLocations(result.locations)
      // console.log(result.locations)
    }

    useEffect(() => {
      listLocations()
    }, [])

    const showAddMarkerPopup = (event) => {
      const [ longitude, latitude ] = event.lngLat
      setAddEntryLocation({
        latitude,
        longitude
      })
    }

    // const { slug } = useParams()
    // const history = useHistory()

    // const handleDelete = (e) => {
    //   e.preventDefault()
    //   console.log(slug)
    //   const config = {
    //     headers: {
    //       auth_token: cookies.token
    //     }
    //   }
    //   axios.delete(`http://localhost:5000/api/v1/locations/${slug}`, config)
    //     .then(response => {
    //       console.log(response.data)
    //       history.push('/')
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })

    // }
  
    return (
      <MapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
      >
        {
          locations.map(entry => (
            <React.Fragment key={entry.id}>
            <Marker 
              latitude={parseFloat(entry.latitude)}
              longitude={parseFloat(entry.longitude)} 
              offsetLeft={-20} 
              offsetTop={-10}
            >
              <div
                onClick = {() => setShowPopup({
                  [entry.id]: true
                })}
              >
              <svg
                className="marker red"
                style={{
                  height: `24px`,
                  width: `24px`,
                }}
                version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                  </g>
                </g>
              </svg>
              </div>
            </Marker>
            {
              showPopup[entry.id] ? (
                <Popup
                  latitude={parseFloat(entry.latitude)}
                  longitude={parseFloat(entry.longitude)} 
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.location_name}</h3>
                    <small>Updated on: {new Date(entry.updated_at).toLocaleDateString()}</small>
                    {entry.photo ? 
                      <img src={entry.photo} alt={entry.location_name} /> : null
                    }
                    {
                      cookies && cookies.token && jwt(cookies.token).username === entry.username && (
                          <div className="buttons">
                              <div className="edit-button">
                                  <Link to={{
                                      // link to new path
                                      pathname: `/locations/${entry.slug}`,
                                      state: {
                                          location: entry.slug
                                      }
                                  }}>
                                    <button type="button" id="edit-button" className="btn">Edit</button>
                                  </Link>
                              </div>
                              {/* <div className="delete-button">
                                <button onClick={e => { handleDelete(e) }} type="button" id="delete-button" className="btn">Delete</button>
                              </div> */}
                          </div>

                        )
                    }       
                  </div>
                </Popup>
              ) : null
            }
            </React.Fragment>
          ))
        }
        {
          addEntryLocation ? (
            <>
            <Marker 
              latitude={parseFloat(addEntryLocation.latitude)}
              longitude={parseFloat(addEntryLocation.longitude)} 
              offsetLeft={-20} 
              offsetTop={-10}
              >
                <div>
                  <svg
                    className="marker yellow"
                    style={{
                      height: `24px`,
                      width: `24px`,
                    }}
                    version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                    <g>
                      <g>
                        <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                          c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                          c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                      </g>
                    </g>
                  </svg>
                </div>
            </Marker>
            <Popup
            latitude={parseFloat(addEntryLocation.latitude)}
            longitude={parseFloat(addEntryLocation.longitude)} 
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top" >
            <div className="popup">
            { 
              !(cookies && cookies.token && jwt(cookies.token).username) ? (
                <h5>Please Login</h5>
            ) : (
              <AddLocationForm onClose={() => {
                setAddEntryLocation(null)
                listLocations()
              }} location={addEntryLocation} />
              )
            }
            </div>
            </Popup>
            </>
          ) : null
        }


      </MapGL>
    );
}

export default Map;