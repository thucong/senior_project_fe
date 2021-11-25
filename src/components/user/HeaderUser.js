import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo_img from "../../images/Logo2.png";
import avatar from "../../images/avatar1.jpg";
import Notification from "../common/Notification";
class HeaderUser extends Component {
  render() {
    return (
      <header className="navbar navbar-expand-md d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 scrolling-navbar dark navbar-light">
        <Link
          className="navbar-brand d-flex align-items-center col-3 mb-md-0 text-dark text-decoration-none"
          to="/"
        >
          <img src={logo_img} alt="" height="40px" width="50px" className="logo" />
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
              <NavLink activeClassName="active" exact className="nav-link px-3" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/q&a" className="nav-link px-3">
                Question and answer
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="" className="nav-link px-3">
                Consultation
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="" className="nav-link px-3">
                Medical center
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to=""  className="nav-link px-3">
                Doctors
              </NavLink>
            </li>
          </ul>
          <div className="navbar-nav ml-auto">
            <Notification />
            <li className="nav-item dropdown ml-lg-3 mr-lg-2">
              <div
                className="nav-link dropdown-toggle p-0"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle"
                  src={avatar}
                  width="38px"
                  height="38px"
                  alt=""
                ></img>
              </div>
              <div className="dropdown-menu dropdown-menu-right drop">
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
                <Link className="dropdown-item" to="">
                  Logout
                </Link>
              </div>
            </li>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderUser;
