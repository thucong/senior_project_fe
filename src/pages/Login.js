import React, { Component } from "react";
import logo from "../../src/images/logo1.png";
import "../style.css";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { Link, withRouter } from "react-router-dom";
import loading_gif from "../../src/images/loader.gif";
import LoginService from "../services/LoginService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      notif: "",
      checkSaveAccount: true,
      loading: false,
    };
    this.cookies = new Cookies();
  }
  onChangeEmail = (e) => {
    const email = e.target.value;
    const { user } = this.state;
    user.email = email;
    this.setState({ user });
  };
  onChangePassword = (e) => {
    const password = e.target.value;
    const { user } = this.state;
    user.password = password;
    this.setState({ user });
  };
  onBlurEmail = () => {
    if (this.state.user.email.length === 0)
      this.setState({ notif: "(*) Email cannot be blank!" });
    else this.setState({ notif: "" });
  };
  onBlurPassword = () => {
    if (this.state.user.password.length === 0)
      this.setState({ notif: "(*) Password cannot be blank!" });
    else this.setState({ notif: "" });
  };
  onCheckSaveAccount = (e) => {
    this.setState({ checkSaveAccount: !this.state.checkSaveAccount });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    LoginService.fetchLoginAPI(this.state.user.email, this.state.user.password)
      .then((res) => {
        if (res.status === 200) {
          this.setState({ loading: false });
          
          this.cookies.set("id_user", res.data.data.userInfo.id_user, {
            expires: this.state.checkSaveAccount
              ? new Date(Date.now() + 604800000)
              : 0,
          });
          this.cookies.set("role", res.data.data.userInfo.role, {
            expires: this.state.checkSaveAccount
              ? new Date(Date.now() + 604800000)
              : 0,
          });
          this.cookies.set("token", res.data.data.token, { expires: 0 });
          this.setState({ notif: "" });
          return;
        }
      })
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({ loading: false });
        if (err.response.status === 401) {
          this.setState({ notif: "(*) Incorrect email or password!" });
        }
      });
  };
  render() {
    document.body.style.backgroundColor = "#86BAEB";
    return (
      <div className="login">
        <div className="header center col col-5 container">
          <Link to="/">
            <img
              className="center logo"
              src={logo}
              height="200px"
              width="500px"
              alt=""
            />
          </Link>
        </div>
        <div className="container">
          <div className="login-form">
            <div className="main">
              <div className="form">
                <form>
                  <div className="info">
                    <input
                      placeholder="E-mail"
                      name="email"
                      className="user"
                      type="text"
                      required=""
                      onChange={this.onChangeEmail}
                      onBlur={this.onBlurEmail}
                    />
                    <span className="icon1">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="info">
                    <input
                      placeholder="Password"
                      name="password"
                      className="pass"
                      type="password"
                      required=""
                      onChange={this.onChangePassword}
                      onBlur={this.onBlurPassword}
                    />
                    <span className="icon2">
                      <i className="fa fa-unlock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="form-check mt-2 ml-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={this.state.checkSaveAccount}
                      onChange={this.onCheckSaveAccount}
                    />
                    <label className="form-check-label text-muted mt-1">
                      Remember login
                    </label>
                  </div>
                  {this.state.notif.length > 0 ? (
                    <p className="text-danger mt-1">{this.state.notif}</p>
                  ) : (
                    ""
                  )}
                  <div className="forget">
                    <h6>
                      <a className="text-muted" href="/forgot-password">Forgot password?</a>
                    </h6>

                    {this.state.loading ? (
                      <div className="submit">
                        <button
                          type="submit"
                          className="btn btn-success center"
                          disabled
                        >
                          Login
                        </button>
                        <img
                          className="center"
                          src={loading_gif}
                          alt=""
                          width="50px"
                        ></img>
                      </div>
                    ) : (
                      <div className="submit">
                        <button
                          type="submit"
                          className="btn btn-success center"
                          onClick={this.onSubmit}
                        >
                          Login
                        </button>
                      </div>
                    )}

                    <div className="register center-text">
                      <h5 className="text-muted">
                        Do not have an account?{" "}
                        <a className="text-muted" href="/register">Register</a>
                      </h5>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    setRole: (role) => {
      dispatch(actions.setRole(role));
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
