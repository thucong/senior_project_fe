import React, { Component } from "react";
import loading_gif from "../../images/loader.gif";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  logOut = () => {
    cookies.remove("id_user");
    cookies.remove("role");
    cookies.remove("token");
    window.location.href = "/login";
  };
  componentDidMount() {
    //this.setState({ loading: true });
  }
  render() {
    return (
      <div className="col-lg-9 col-md-6 px-0">
        <div className="dark py-4 text-right pr-3 sticky-top">
          <button
            className="btn btn-success text-truncate"
            onClick={this.logOut}
          >
            Logout
          </button>
        </div>
        {this.state.loading ? (
          <img
            className="center mb-5 mt-5"
            src={loading_gif}
            alt=""
            width="50px"
          ></img>
        ) : (
          <div className="p-5 row m-0">
            aaaaaaaaaaaaaaa
          </div>
        )}
      </div>
    );
  }
}
export default Content;
