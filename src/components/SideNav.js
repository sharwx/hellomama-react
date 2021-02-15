import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import jwt from 'jwt-decode'
// import { useCookies } from 'react-cookie'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './SideNav.scss'

function SideNav() {

  // const [cookies] = useCookies(["token"])
  const [sidebar,setSidebar] = useState(false)
  const [filter, setFilter] = useState('')

  const showSidebar = () => {
    setSidebar(!sidebar) // reverse boolean
    // console.log("boolean changed")
  }

  const handleSearch = (e) => {
    setFilter(e.target.value)
    console.log(setFilter())
  }

  return(

    <>
      <div className="navbar-sb">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
          </li>
          <div className="search-form">
            <div className="container">

              <h3>Filter</h3>

              <form className="form-input filter-box">
                <input className="form-control mr-sm-2" value={filter} onChange={e => { handleSearch(e) }} type="search" placeholder="Search Location" aria-label="Search" />
              
                <div className="row">

                  <div className="col-12">
                      <div className="form-group form-check" id="first-check">
                          <input type="checkbox" className="form-check-input" name="changing_station" />
                          <label className="form-check-label" htmlFor="changing_station">Changing Station</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="sink" />
                          <label className="form-check-label" htmlFor="sink">Sink</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="hot_water_dispenser" />
                          <label className="form-check-label" htmlFor="hot_water_dispenser">Hot Water Dispenser</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="power_point" />
                          <label className="form-check-label" htmlFor="power_point">Power Point</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="lockable" />
                          <label className="form-check-label" htmlFor="lockable">Lockable</label>
                      </div>
                  </div>

                </div>
  
                {/* <button id="button" className="btn active font-weight-bold" type="submit">Search Filter</button>

                <br />

                { 
                  (cookies && cookies.token && jwt(cookies.token).username) && (
                    <button id="reg-btn" className="btn active font-weight-bold" type="submit">Search User Entry</button>
                  ) 
                } */}

              </form>

            </div>
          </div>
        </ul>
      </nav>
    </>

  )
}

export default SideNav