import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import logo_img from "../../images/Logo2.png";
import Cookies from "universal-cookie";
import callApi from "../../utils/apiCaller";

const cookies = new Cookies();
class HeaderUser extends Component {
  constructor(props){
    super(props);
    this.state ={
      avatar: "https://freetuts.net/upload/product_series/images/2021/06/24/1350/avatar-de-thuong-kute-2021-2.jpg"
    }
  }
  componentDidMount(){
    callApi("user/" + cookies.get("id_user"), 'GET').then((res) => {
      if(res.data[0].avatar !== ''){
        this.setState({avatar: res.data[0].avatar})
      }
    })
  }
  Logout = () => {
    cookies.remove("id_user");
    cookies.remove("role");
    cookies.remove("token");
    window.location.href = "/login";
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
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item dropdown ml-lg-3 mr-lg-2">
              <NavLink activeClassName="active" exact to="#" className="nav-link px-3 dropdown-toggle" data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                Hỏi đáp
                
              </NavLink>
              <div className="dropdown-menu dropdown-menu-right drop">
                <Link className="dropdown-item" to="/q&a/my">
                  Câu hỏi của bạn
                </Link>
                <Link className="dropdown-item" to="/q&a">
                  Tất cả các câu hỏi
                </Link>
              </div>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/appointment" className="nav-link px-3" >
                Cuộc tư vấn
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" exact to="/hospital" className="nav-link px-3">
                Bệnh viện
              </NavLink>
            </li>
          </ul>
          <div className="navbar-nav ml-auto">
            {/* <Notification /> */}
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
                <Link className="dropdown-item" to="/profile">
                  Trang cá nhân
                </Link>
                <Link className="dropdown-item" to="" onClick={this.Logout}>
                  Đăng xuất
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
