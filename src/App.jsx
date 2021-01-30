import React from 'react'
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Login from './components/pages/Login'
import Register from './components/pages/Register'



class App extends React.Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>

          <GuestRoute path="/users/login" component={Login} />
          <GuestRoute path="/users/register" component={Register} />

        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
