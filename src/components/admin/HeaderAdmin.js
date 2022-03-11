import React,{ Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class HeaderAdmin extends Component {
    logOut = () => {
        cookies.remove("id_user");
        cookies.remove("role");
        cookies.remove("token");
        window.location.href = "/login";
    };
    render() {
        return (
            <header className= "navbar navbar-expand-md d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 scrolling-navbar dark navbar-dark sticky-top">
                {/* <Link className="navbar-brand d-flex align-items-center col-3 mb-md-0 text-dark text-decoration-none" to="/"><img src={logo_img} alt="" height="50px" width="60px" className="logo"/></Link>
                <button className="ml-auto navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="col-sm-9 collapse navbar-collapse row">
                    <div className="navbar-nav ml-auto">
                        <button className="btn btn-success text-truncate mt-1 mt-md-0" onClick={this.logOut}>Logout</button>
                    </div>
                </div> */}
            </header>
        )
    }
}
export default HeaderAdmin;