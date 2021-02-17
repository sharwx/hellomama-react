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
            checkbox_cs: false,
            checkbox_sink: false,
            checkbox_hwd: false,
            checkbox_pp: false,
            checkbox_lock: false
            
        }
    }
  
    getProfileUser() {
      const token = this.props.cookies.get('token')
      const config = {
          headers: {
              auth_token: token
          }
      }
      return axios.get('http://localhost:5000/api/v1/users/profile', config)
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
        return axios.get('http://localhost:5000/api/v1/locations')
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

    handleChange_searchBox(e) {
        // return
    }

    filterCheckBox_cs() {
        this.setState({
            checkbox_cs: !this.state.checkbox_cs
        })
    }

    filterCheckBox_sink() {
        this.setState({
            checkbox_sink: !this.state.checkbox_sink
        })
    }

    filterCheckBox_hwd() {
        this.setState({
            checkbox_hwd: !this.state.checkbox_hwd
        })
    }

    filterCheckBox_pp() {
        this.setState({
            checkbox_pp: !this.state.checkbox_pp
        })
    }

    filterCheckBox_lock() {
        this.setState({
            checkbox_lock: !this.state.checkbox_lock
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
                        checkbox_cs={this.state.checkbox_cs}
                        checkbox_sink={this.state.checkbox_sink}
                        checkbox_hwd={this.state.checkbox_hwd}
                        checkbox_pp={this.state.checkbox_pp}
                        checkbox_lock={this.state.checkbox_lock}
                    
                    /></Route>

                </Switch>
            </Router>
        )
    }
  
}

export default withCookies(MyContainer);