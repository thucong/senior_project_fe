import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import logo_img from "../../images/Logo2.png";
import admin_img from "../../images/administrator.png";
class SideBar extends Component {
    render() {
        return (
            <div className="col-lg-3 col-md-6 admin-left-bar">
                <div className="sticky-top">
                    <ul className="">
                        <li className="list-group-item text-center py-4 border-0">
                            <Link to="/"><img src={logo_img} height="50px" width="60px" className="logo" /></Link>
                        </li>
                        <li className="list-group-item text-center py-4 border-0">
                            <img src={admin_img} className="" alt="" width="130px" />
                        </li>
                        <li className="list-group-item text-center border-0" >
                            <NavLink className="nav-link h4 text-muted" activeClassName="bg-light rounded" exact to="/">Home</NavLink>
                        </li>
                        <li className="list-group-item text-center border-0">
                            <NavLink className="nav-link h4 text-muted" activeClassName="bg-light rounded" exact to="/admin/news">Manage News</NavLink>
                        </li>
                        <li className="list-group-item text-center border-0">
                            <NavLink className="nav-link h4 text-muted" activeClassName="bg-light rounded" exact to="/admin/doctor">Manage Doctor</NavLink>
                        </li>
                        <li className="list-group-item text-center border-0">
                            <NavLink className="nav-link h4 text-muted" activeClassName="bg-light rounded" exact to="/admin/hospital">Manage Hospital</NavLink>
                        </li>
                        {/* <li className="list-group-item text-center border-0">
                            <NavLink className="nav-link h4 text-muted" activeClassName="bg-light rounded" exact to="/admin/quan-ly-bao-xau">Quản lý báo xấu</NavLink>
                        </li> */}
                    </ul>
                </div>

            </div>
        );
    }
}
export default SideBar;
