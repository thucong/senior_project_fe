import React, { Component } from "react";
import logo from "../../src/images/login.png";
import "../style.css";
class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    document.body.style.backgroundColor = "#86BAEB";
    return (
      <div className="login">
        <div className="header center col col-5 container">
          <img
            className="center"
            src={logo}
            height="250px"
            width="250px"
            alt=""
          />
        </div>
        <div className="container">
          <div className="login-form">
            <div className="main">
              <div className="form">
                <form>
                  <div className="info">
                    <input
                      placeholder="Username"
                      name="username"
                      className="user"
                      type="text"
                      required=""
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
                    />
                    <span className="icon2">
                      <i className="fa fa-unlock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="form-check mt-2 ml-2">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label text-muted mt-1">
                      Remember login
                    </label>
                  </div>

                  <div className="forget">
                    <h6>
                      <a className="text-muted">
                        Forgot password?
                      </a>
                    </h6>

                    <div className="submit">
                      <button
                        type="submit"
                        className="btn btn-success center"
                      >
                        Login
                      </button>
                    </div>

                    <div className="register center-text">
                      <h5 className="text-muted">
                        Do not have an account?{" "}
                        <a className="text-muted" >
                          Register
                        </a>
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
export default Login;
