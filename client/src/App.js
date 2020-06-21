import React, { Fragment } from 'react';
import './App.css';
import { Register } from './components/Register';
import { Login } from './components/Login';

const App = () => {
  return (
    <Fragment>
      {/* <Register /> */}
      <Login/>
    </Fragment>
  )
}

export default App;
