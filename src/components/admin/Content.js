import React, { Component } from "react";
import loading_gif from "../../images/loader.gif";
import Cookies from "universal-cookie";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";

const cookies = new Cookies();
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      news: '',
      doctor:'',
      hospital:'',
    };
  }
  logOut = () => {
    cookies.remove("id_user");
    cookies.remove("role");
    cookies.remove("token");
    window.location.href = "/login";
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios.get(API_URL + "news").then((res) => {
      this.setState({ news: res.data.length})
      this.setState({ loading: false });
    })
    axios.get(API_URL + "doctor").then((res) => {
      this.setState({doctor: res.data.length})
      this.setState({ loading: false });
    })
    axios.get(API_URL + "hospital").then((res) => {
      this.setState({hospital: res.data.length})
      this.setState({ loading: false });
    })
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
            <div className="col-4 p-2">
              <div className="card border-secondary px-0">
                <div className="card-header bg-white border-0 bold">
                  Number of news
                </div>
                <div className="card-body text-secondary">
                  <h2 className="h2 card-title text-center">
                    {this.state.news}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card border-secondary px-0">
                <div className="card-header bg-white border-0 bold">
                  Number of doctors
                </div>
                <div className="card-body text-secondary">
                  <h2 className="h2 card-title text-center">
                    {this.state.doctor}
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-4 p-2">
              <div className="card border-secondary px-0">
                <div className="card-header bg-white border-0 bold">
                  Number of hospitals
                </div>
                <div className="card-body text-secondary">
                  <h2 className="h2 card-title text-center">
                    {this.state.hospital}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Content;
