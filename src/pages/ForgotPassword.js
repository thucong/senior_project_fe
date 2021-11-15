import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ForgetPasswordService from "../services/ForgotPasswordService";
import loading_gif from "../images/loader.gif";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      notifmess: "",
      loading: false,
    };
  }
  onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.setState({ loading: true });
    ForgetPasswordService.sendMailAPI(email)
      .then((rs) => {
        this.setState({ loading: false });
        this.props.history.push("/forgot-password/email-activate");
      })
      .catch((err) => {
        this.setState({ loading: false });
        if (err.response.status === 401) {
          this.setState({ notifmess: "(*) User with this email does not exists !" });
        } 
      });
  };
  render() {
    document.body.style.backgroundColor = "#eceff1 ";
    return (
      <div className="col-lg-4 col-md-6 content jumbotron center mt-5">
        <h2 className="h2">Please enter your email address !</h2>
        <form>
          <div className="form-group mt-3 mr-3 w-100 ">
            <input
              type="text"
              placeholder="E-mail"
              className="form-control w-100"
              value={this.state.email}
              name="email"
              onChange={this.onHandleChange}
            />
          </div>
          {this.state.notifmess.length > 0 ? (
            <p className="text-danger mt-1">{this.state.notifmess}</p>
          ) : (
            ""
          )}
          {this.state.loading ? (
            <div className="submit">
              <img
                className="center"
                src={loading_gif}
                alt=""
                width="50px"
              ></img>
              <button
                type="submit"
                disabled
                className="btn btn-success btn-email"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="submit">
              <button
                type="submit"
                className="btn btn-success btn-email"
                onClick={this.onSubmit}
              >
                Next
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default withRouter(ForgotPassword);
