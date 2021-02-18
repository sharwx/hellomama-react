import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import jwt from 'jwt-decode'
// import { useCookies } from 'react-cookie'

import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './SideNav.scss'

function SideNav(props) {

  // const [cookies] = useCookies(["token"])
  const [sidebar,setSidebar] = useState(false)
  // const [checkbox_cs,setCheckbox_cs] = useState(true)
  // const [checkbox_sink,setCheckbox_sink] = useState(true)
  // const [checkbox_hwd,setCheckbox_hwd] = useState(true)
  // const [checkbox_pp,setCheckbox_pp] = useState(true)
  // const [checkbox_lock,setCheckbox_lock] = useState(true)
  // const [seachTerm, setSearchTerm] = useState('')

  const showSidebar = () => {
    setSidebar(!sidebar) // reverse boolean
    // console.log("boolean changed")
  }

  // const onClick_cs = () => {
  //   setCheckbox_cs(!checkbox_cs) // reverse boolean
  //   console.log("checkbox cs boolean change")
  //   console.log(checkbox_cs)
  // }

  // const onClick_sink = () => {
  //   setCheckbox_sink(!checkbox_sink) // reverse boolean
  //   console.log("checkbox sink boolean change")
  //   console.log(checkbox_sink)
  // }

  // const onClick_hwd = () => {
  //   setCheckbox_hwd(!checkbox_hwd) // reverse boolean
  //   console.log("checkbox hwd boolean change")
  //   console.log(checkbox_hwd)
  // }

  // const onClick_pp = () => {
  //   setCheckbox_pp(!checkbox_pp) // reverse boolean
  //   console.log("checkbox pp boolean change")
  //   console.log(checkbox_pp)
  // }

  // const onClick_lock = () => {
  //   setCheckbox_lock(!checkbox_lock) // reverse boolean
  //   console.log("checkbox lock boolean change")
  //   console.log(checkbox_lock)
  // }

  // const searchBox = (e) => {
  //   setSearchTerm(e.target.value)
  //   console.log("search")
  // }
  


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
                {/* <input className="form-control mr-sm-2" type="search" placeholder="Search Location" aria-label="Search" value={seachTerm} onChange={searchBox} /> */}
              
                <div className="row">

                  <div className="col-12">
                      <div className="form-group form-check" id="first-check">
                          <input type="checkbox" className="form-check-input" name="changing_station" onChange={props.filterCheckBox_cs} />
                          <label className="form-check-label" htmlFor="changing_station">Changing Station</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="sink" onChange={props.filterCheckBox_sink} />
                          <label className="form-check-label" htmlFor="sink">Sink</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="hot_water_dispenser" onChange={props.filterCheckBox_hwd} />
                          <label className="form-check-label" htmlFor="hot_water_dispenser">Hot Water Dispenser</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="power_point" onChange={props.filterCheckBox_pp}/>
                          <label className="form-check-label" htmlFor="power_point">Power Point</label>
                      </div>
                  </div>

                  <div className="col-12">
                      <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input" name="lockable" onChange={props.filterCheckBox_lock}/>
                          <label className="form-check-label" htmlFor="lockable">Lockable</label>
                      </div>
                  </div>

                </div>

              </form>

            </div>
          </div>
        </ul>
      </nav>
    </>

  )
}

export default SideNav