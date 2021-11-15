import React,{ Component } from "react";

class Notification extends Component{
    render() {
        return(
            <li className="nav-item dropdown ml-lg-3">
                <div className="nav-link dropdown-toggle" role="button" >
                    <i className="fa fa-bell size-icon"/>
                </div>
            </li>
        )
    }

}
export default Notification;