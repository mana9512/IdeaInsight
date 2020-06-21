import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from './components/Register';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <Router>
    <Fragment>
      <Navbar/>
      <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      </Switch>
    </Fragment>
    </Router>
  )
}

export default App;
