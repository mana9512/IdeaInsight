import React, { Fragment } from 'react'
import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <Fragment>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link to="/" style={{color: "white"}} className="nav-link">
        IdeaOverflow
      </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
      <li className="nav-item">
      <Link to="/login" style={{color: "white"}} className="nav-link">
        Login
      </Link>
      </li>
      <Link to="/register" style={{color: "white"}} className="nav-link">
        Sign Up
      </Link>
      
      
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
            
        </Fragment>
    )
}
