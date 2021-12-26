import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo_img from "../../images/Logo2.png";
import Notification from "../common/Notification";
import Cookies from "universal-cookie";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";

const cookies = new Cookies();
class HeaderUser extends Component {
  constructor(props){
    super(props);
    this.state ={
      avatar: "https://freetuts.net/upload/product_series/images/2021/06/24/1350/avatar-de-thuong-kute-2021-2.jpg"
    }
  }
  componentDidMount(){
      axios.get(API_URL + "user/" + cookies.get("id_user")).then((res) => {
        if(res.data[0].avatar !== ''){
          this.setState({avatar: res.data[0].avatar})
        }
      })
  }
  Logout = () => {

  }
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
            <li className="nav-item dropdown ml-lg-3 mr-lg-2">
              <NavLink activeClassName="active" exact to="#" className="nav-link px-3 dropdown-toggle" data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                Q&A
                
              </NavLink>
              <div className="dropdown-menu dropdown-menu-right drop">
                <Link className="dropdown-item" to="/q&a/my">
                  My Question
                </Link>
                <Link className="dropdown-item" to="/q&a">
                  All Question
                </Link>
              </div>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/consultation" className="nav-link px-3" >
                Appointment
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="" className="nav-link px-3">
                Medical Center
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
                  src={this.state.avatar}
                  width="38px"
                  height="38px"
                  alt=""
                ></img>
              </div>
              <div className="dropdown-menu dropdown-menu-right drop">
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
                <Link className="dropdown-item" to="" onClick={this.Logout()}>
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
