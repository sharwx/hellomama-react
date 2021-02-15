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
            loggedIn: null
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
              console.log("test profile")
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

    render() {
        return (
            <Router>
                <Header getProfileUser = { () => this.getProfileUser()} />
                <SideNav />

                <Switch>

                    <GuestRoute path="/users/login" component={Login} />
                    <GuestRoute path="/users/register" component={Register} />

                    <Route path="/locations/:slug" component={EditLocation} />

                    <Route path="/"><Map/></Route>

                </Switch>
            </Router>
        )
    }
  
}

export default withCookies(MyContainer);