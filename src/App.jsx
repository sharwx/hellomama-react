import React from 'react'
import './App.scss';
import Map from './Map'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import SideNav from './components/SideNav'
// import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import EditLocation from './components/pages/EditLocation';


class App extends React.Component {
  render() {
    return (
    <div className="App">
      <Router>

        <Header />
        <SideNav />

        <Switch>

          <GuestRoute path="/users/login" component={Login} />
          <GuestRoute path="/users/register" component={Register} />

          <Route path="/locations/:slug" component={EditLocation} />

          <Route path="/"><Map/></Route>

        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
