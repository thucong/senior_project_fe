import React, { Component } from "react";
import loading_gif from "../images/loader.gif";
import { withRouter } from "react-router-dom";
import RegisterService from "../services/RegisterService";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      gender: false,
      dob: "1999-01-01",
      password: "",
      repassword: "",
      role: "patient",
      notif: {
        password: false,
        name: false,
        email: false,
        repassword: false,
        validate: false,
      },
      notifmess: "",
      loading: false,
    };
  }
  onHandleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    if (name === "gender") value = value === "true";
    this.setState({
      [name]: value,
    });
  };
  onBlurRePassword = () => {
    const { password, repassword } = this.state;
    if (password !== repassword) {
      const notif = this.state.notif;
      notif.repassword = true;
      this.setState({ notif });
    } else {
      const notif = this.state.notif;
      notif.repassword = false;
      this.setState({ notif });
    }
  };
  onBlurPassword = () => {
    const { password } = this.state;
    if (!password) {
      const notif = this.state.notif;
      notif.password = true;
      this.setState({ notif });
    } else {
      const notif = this.state.notif;
      notif.password = false;
      this.setState({ notif });
    }
    this.onBlurRePassword();
  };
  onBlurEmail = () => {
    const { email } = this.state;
    if (!email) {
      const notif = this.state.notif;
      notif.email = true;
      notif.validate = false;
      this.setState({ notif });
    } else if (!this.validateEmail()) {
      const notif = this.state.notif;
      notif.validate = true;
      notif.email = false;
      this.setState({ notif });
    } else {
      const notif = this.state.notif;
      notif.email = false;
      notif.validate = false;
      this.setState({ notif });
    }
  };
  onBlurName = () => {
    const { name } = this.state;
    if (!name) {
      const notif = this.state.notif;
      notif.name = true;
      this.setState({ notif });
    } else {
      const notif = this.state.notif;
      notif.name = false;
      this.setState({ notif });
    }
  };
  onChangeDob = (e) => {
    this.setState({ dob: e.target.value });
  };
  onHandleBlur = (e) => {
    const repassword = e.target.value;
    if (!repassword) {
      this.setState({ notif: "(*) Password can not be blank!" });
    }
  };
  validateEmail = () => {
    const email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.test(this.state.email);
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { name, email, gender, dob, password, repassword, role } = this.state;
    if (
      password === repassword &&
      name &&
      email &&
      password &&
      this.validateEmail() &&
      role
    ) {
      RegisterService.fetchRegisterAPI(
        name,
        email,
        gender,
        new Date(dob),
        password,
        role
      )
        .then((res) => {
          this.setState({ loading: false });
          if (res.status === 200) {
            this.props.history.push("/register/email-activate");
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          if (err.response.status === 400) {
            this.setState({
              notifmess: "(*) User with this email already exists!",
            });
          }
        });
    } else if (!name && !email && !password) {
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.password = true;
      notif.email = true;
      notif.name = true;
      this.setState({ notif });
    } else if (password !== repassword) {
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.repassword = true;
      this.setState({ notif });
    } else if (!name) {
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.name = true;
      this.setState({ notif });
    } else if (!email) {
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.email = true;
      this.setState({ notif });
    } else if (!password) {
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.password = true;
      this.setState({ notif });
    } else if (!this.validateEmail()) {
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.validate = true;
      this.setState({ notif });
    }
  };
  render() {
    document.body.style.backgroundColor = "#eceff1";
    return (
      <div className="col-lg-4 col-md-6 content jumbotron center mt-3">
        <h1 className="center h1">Register an account</h1>
        <form>
          <div className="info">
            <label>
              Fullname <span className="span">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder=""
              onChange={this.onHandleChange}
              onBlur={this.onBlurName}
            />
          </div>
          {this.state.notif.name === true ? (
            <p className="text-danger mt-1">(*) Fullname can not be blank!</p>
          ) : (
            ""
          )}
          <div className="info">
            <label>
              E-mail <span className="span">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder=""
              onChange={this.onHandleChange}
              onBlur={this.onBlurEmail}
            />
          </div>
          {this.state.notif.email === true ? (
            <p className="text-danger mt-1">(*) Email can not be blank!</p>
          ) : (
            ""
          )}
          {this.state.notif.validate === true ? (
            <p className="text-danger mt-1">(*) Email invalidate!</p>
          ) : (
            ""
          )}
          <div className="info">
            <label>Gender </label> &#12644;
            <input
              type="radio"
              name="gender"
              value={false}
              onChange={this.onHandleChange}
              checked={this.state.gender === false}
            />
            &nbsp;Male &#12644;
            <input
              type="radio"
              name="gender"
              value={true}
              onChange={this.onHandleChange}
              checked={this.state.gender === true}
            />
            &nbsp;Female
          </div>
          <div className="info">
            <label>Date of birth </label>
            <div>
              <input
                type="date"
                value={this.state.dob}
                className="form-control"
                onChange={this.onChangeDob}
              />
            </div>
          </div>
          {/* <div className="info">
            <label>Address <span className="span">*</span></label>

            <div className="address">
              <select className="form-control">
                <option>--Select Province/City--</option>
              </select>

              <select className="form-control">
                <option>--Select District--</option>
              </select>
              <select className="form-control">
                <option>-Select Ward/Commune--</option>
              </select>
            </div>

            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Number of houses, streets, locality/ village/ team"
            />
          </div> */}
          <div className="info">
            <label>
              Password <span className="span">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder=""
              onChange={this.onHandleChange}
              onBlur={this.onBlurPassword}
            />
          </div>
          {this.state.notif.password === true ? (
            <p className="text-danger mt-1">(*) Password can not be blank!</p>
          ) : (
            ""
          )}
          <div className="info">
            <label>
              Confirm password <span className="span">*</span>
            </label>
            <input
              type="password"
              name="repassword"
              className="form-control"
              placeholder=""
              onChange={this.onHandleChange}
              onBlur={this.onBlurRePassword}
            />
          </div>
          {this.state.notif.repassword === true ? (
            <p className="text-danger mt-1">(*) Password does not match!</p>
          ) : (
            ""
          )}
          {this.state.notifmess.length > 0 ? (
            <p className="text-danger mt-1">{this.state.notifmess}</p>
          ) : (
            ""
          )}
          {this.state.loading ? (
            <div className="right-w3l">
              <button
                type="button"
                className="btn btn-success center mt30"
                disabled
              >
                Register
              </button>
              <img
                className="center"
                src={loading_gif}
                alt=""
                width="50px"
              ></img>
            </div>
          ) : (
            <div className="right-w3l">
              <button
                type="button"
                className="btn btn-success center mt30"
                onClick={this.onSubmit}
              >
                Register
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default withRouter(Register);
