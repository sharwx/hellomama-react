import React from 'react'
import axios from 'axios'
import { withCookies } from 'react-cookie'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Map from './Map'
import Header from './components/Header'
import SideNav from './components/SideNav'
// import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import EditLocation from './components/pages/EditLocation';

class MyContainer extends React.Component {

    constructor(props) {
      super(props)
  
        this.state = {
            user: '',
            loggedIn: null,
            locations: [],
            changing_station: false,
            sink: false,
            hot_water_dispenser: false,
            power_point: false,
            lockable: false
            
        }
    }
  
    getProfileUser() {
      const token = this.props.cookies.get('token')
      const config = {
          headers: {
              auth_token: token
          }
      }
      return axios.get('https://hellomama-be.herokuapp.com/api/v1/users/profile', config)
          .then(response => {
            //   console.log(response.data)
              this.setState({
                  username: response.data[0].username,
                  loggedIn: true
              })
          })
          .catch(err => {
              console.log(err)
          })
    }

    getLocations() {
        return axios.get('https://hellomama-be.herokuapp.com/api/v1/locations')
            .then(response => {
                this.setState({
                    locations: response.data.locations,
                    filterList: response.data
                })
                console.log(this.state.locations)
            })
            .catch(err => {
                console.log(err)
            })
    }


    filterCheckBox_cs() {
        this.setState({
            changing_station: !this.state.changing_station
        })
    }

    filterCheckBox_sink() {
        this.setState({
            sink: !this.state.sink
        })
    }

    filterCheckBox_hwd() {
        this.setState({
            hot_water_dispenser: !this.state.hot_water_dispenser
        })
    }

    filterCheckBox_pp() {
        this.setState({
            power_point: !this.state.power_point
        })
    }

    filterCheckBox_lock() {
        this.setState({
            lockable: !this.state.lockable
        })
    }


    render() {
        return (
            <Router>
                <Header getProfileUser={ () => this.getProfileUser() } />
                <SideNav 
                    filterCheckBox_cs={ () => this.filterCheckBox_cs() } 
                    filterCheckBox_sink={ () => this.filterCheckBox_sink() } 
                    filterCheckBox_hwd={ () => this.filterCheckBox_hwd() } 
                    filterCheckBox_pp={ () => this.filterCheckBox_pp() } 
                    filterCheckBox_lock={ () => this.filterCheckBox_lock() } 
                />

                <Switch>

                    <GuestRoute path="/users/login" component={Login} />
                    <GuestRoute path="/users/register" component={Register} />

                    <Route path="/locations/:slug" component={EditLocation} />

                    <Route path="/"><Map 
                        changing_station={this.state.changing_station}
                        sink={this.state.sink}
                        hot_water_dispenser={this.state.hot_water_dispenser}
                        power_point={this.state.power_point}
                        lockable={this.state.lockable}
                    
                    /></Route>

                </Switch>
            </Router>
        )
    }
  
}

export default withCookies(MyContainer);