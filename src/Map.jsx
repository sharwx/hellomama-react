import React from 'react'
import jwt from 'jwt-decode'
import './Map.scss';
import {useState, useEffect } from 'react'
import MapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { getLocations } from './components/API'
import AddLocationForm from './components/AddLocationForm'


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN


function Map(props) {
    const [locations, setLocations] = useState([])
    const [showPopup, setShowPopup] = useState({})
    const [cookies] = useCookies(["token"])
    const [addEntryLocation, setAddEntryLocation] = useState(null)
    const [viewport, setViewport] = useState({
      latitude: 1.364917,
      longitude: 103.82287,
      zoom: 10.5,
      bearing: 0,
      pitch: 0
    });

    const geolocateStyle = {
      float: 'right',
      margin: '10px',
      padding: '10px'
    }

    const _onViewportChange = viewport => setViewport({...viewport})

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

    // console.log(props.checkbox_lock)
    // console.log(locations)

    return (
        <MapGL
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width="100vw"
          height="100vh"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={_onViewportChange}
          onDblClick={showAddMarkerPopup}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
          />

          {
            locations.filter(entry => {
              let arr = []
              // if (props.checkbox_lock) {
              //   return entry.lockable
              // } else {
              //   return true
              // }

              if (props.checkbox_lock === true) {
                arr.push(entry.lockable)
              } else if (props.checkbox_cs === true) {
                arr.push(entry.changing_station)
              } else if (props.checkbox_sink === true) {
                arr.push(entry.sink)
              } else if (props.checkbox_hwd === true) {
                arr.push(entry.hot_water_dispenser)
              } else if (props.checkbox_pp === true) {
                arr.push(entry.power_point)
              }

              if (arr.length === 1) {
                return arr[0]
              } else if (arr.length === 2) {
                return arr[0], arr[1]
              } else if (arr.length === 3) {
                return arr[0], arr[1], arr[2]
              } else if (arr.length === 4) {
                return arr[0], arr[1], arr[2], arr[3]
              } else if (arr.length === 5) {
                return arr[0], arr[1], arr[2], arr[4], arr[5]
              } else {
                return true
              }

            })

              .map(entry => (
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
                    width: `24px`
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
                    anchor="top"
                    className="popup-edit">
                    <div className="popup">
                      <div className="container">

                        <h3>{entry.location_name}</h3>
                        <p><b>Description:</b> {entry.location_description}</p>
                        <p><b>Level:</b> {entry.location_level}</p>
                        <p><b>Address:</b> {entry.address}</p>

                        <div className="row">

                          <div className="col-6">
                            {entry.changing_station === true ? 
                              <p>&#10003; Changing Station</p> : <p>&#10005; Changing Station</p>
                            }
                            {entry.sink === true ? 
                              <p>&#10003; Sink</p> : <p>&#10005; Sink</p>
                            }
                          </div>
                          <div className="col-6">
                            {entry.hot_water_dispenser === true ? 
                              <p>&#10003; Hot Water Dispenser</p> : <p>&#10005; Hot Water Dispenser</p>
                            }
                            {entry.power_point === true ? 
                              <p>&#10003; Power Point</p> : <p>&#10005; Power Point</p>
                            }
                          </div>
                          <div className="col-6">
                            {entry.lockable === true ? 
                              <p>&#10003; Lockable</p> : <p>&#10005; Lockable</p>
                            }
                          </div>

                        </div>
                          <div className="row">
                            <div className="col">
                              {entry.photo ? 
                                <img className="img-upload" src={entry.photo} alt="" /> : null
                              }
                            </div>
                          </div>
                          <small>Updated on: {new Date(entry.updated_at).toLocaleDateString()}</small>
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
                                          <button type="button" id="edit-button" className="btn active font-weight-bold">Edit</button>
                                        </Link>
                                    </div>
                                </div>

                              )
                          }

                      </div>     
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
