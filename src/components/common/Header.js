import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo_img from "../../images/Logo2.png";
class Header extends Component {
 
  render() {
    return (
      <header className="navbar navbar-expand-md d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 scrolling-navbar dark navbar-light">
        <Link
          className="navbar-brand d-flex align-items-center col-3 mb-md-0 text-dark text-decoration-none"
          to="/"
        >
          <img src={logo_img} alt="" height="40px" width="50px" className="logo"/>
        </Link>
        <button
          className="ml-auto navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="col-sm-9 collapse navbar-collapse row"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav mx-auto justify-content-center mb-md-0">
            <li>
              <NavLink activeClassName="active" exact className="nav-link px-3"  to="/">
               Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/q&a" className="nav-link px-3">
                Q&A
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/hospital" className="nav-link px-3">
                Medical center
              </NavLink>
            </li>
          </ul>
          <div className="navbar-nav ml-auto">
            <Link
              className="btn btn-outline-success text-success mr-1 text-truncate"
              to="/login"
            >
              Login
            </Link>
            <Link className="btn btn-success text-truncate mt-1 mt-md-0" to="/register">
              Register
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
