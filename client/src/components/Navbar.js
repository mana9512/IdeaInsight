import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../action/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <Link to="/#!" onClick = {logout} style={{ color: "white" }} className="nav-link">
              Logout
            </Link>
  );

  const guestLinks = (
          <Fragment>
            <Link to="/login" style={{ color: "white" }} className="nav-link">
                Login
              </Link>
            <Link
              to="/register"
              style={{ color: "white" }}
              className="nav-link"
            >
              Sign Up
            </Link>
          </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link to="/" style={{ color: "white" }} className="nav-link">
          IdeaOverflow
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
