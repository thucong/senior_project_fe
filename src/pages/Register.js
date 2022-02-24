import React, { Component } from "react";
import loading_gif from "../images/loader.gif";
import { withRouter } from "react-router-dom";
import RegisterService from "../services/RegisterService";
import { connect } from "react-redux";
import * as actions from "../actions/index";
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
        address: false,
        provinceOrCity: false,
        repassword: false,
        validate: false,
      },
      notifmess: "",
      loading: false,
      avatar: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
      address: "",
      provinceOrCity:''
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
  onChangeCity = e => {
    this.setState({provinceOrCity: e.target.value})
  }
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
  onBlurAddress = () => {
    const { address } = this.state;
    if (!address) {
      const notif = this.state.notif;
      notif.address = true;
      this.setState({ notif });
    } else {
      const notif = this.state.notif;
      notif.address = false;
      this.setState({ notif });
    }
  }
  onBlurCity = () => {
    const { provinceOrCity } = this.state;
    if (!provinceOrCity) {
      const notif = this.state.notif;
      notif.provinceOrCity = true;
      this.setState({ notif });
    } else {
      const notif = this.state.notif;
      notif.provinceOrCity = false;
      this.setState({ notif });
    }
  }
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
  componentDidMount(){
    if (this.props.list_place.length === 0) {
      this.props.fetchListPlace();
    }
  }
  showListPlace = (list_place) => {
    let result = null;
    if (list_place.length > 0) {
      result = list_place.map((place, index) => {
        return (
          <option key={index} value={place}>
            {place}
          </option>
        );
      });
      return result;
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { name, email, gender, dob, password, repassword, role, avatar, address, provinceOrCity } = this.state;
    if (
      password === repassword &&
      name &&
      email &&
      password &&
      this.validateEmail() &&
      role && address && provinceOrCity
    ) {
      RegisterService.fetchRegisterAPI(
        name,
        email,
        gender,
        new Date(dob),
        password,
        role, avatar, provinceOrCity, address
      )
        .then((res) => {
          this.setState({ loading: false });
          if (res.status === 200) {
            this.props.history.push("/login");
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
    } else if (!name && !email && !password && !address && !provinceOrCity) {
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
    }else if(!address){
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.address = true;
      this.setState({ notif });
    }else if(!provinceOrCity){
      this.setState({ loading: false });
      const notif = this.state.notif;
      notif.provinceOrCity = true;
      this.setState({ notif });
    }
  };
  render() {
    document.body.style.backgroundColor = "#eceff1";
    return (
      <div className="col-lg-4 col-md-6 content jumbotron center mt-3">
        <h1 className="center h1">Register an account</h1>
        <form>
          <div className="info mb-2">
            <label>
              Fullname <span className="span">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="form-control mt-2"
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
          <div className="info mb-2">
            <label>
              E-mail <span className="span">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="form-control mt-2"
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
          <div className="info mb-2">
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
          <div className="info mb-2">
            <label>Date of birth </label>
            <div>
              <input
                type="date"
                value={this.state.dob}
                className="form-control mt-2"
                onChange={this.onChangeDob}
              />
            </div>
          </div>
          <div className="info mb-2">
            <label>Address <span className="span">*</span></label>
            <input
              type="text"
              name="address"
              className="form-control mt-2"
              placeholder="Address"
              onChange={this.onHandleChange}
              onBlur={this.onBlurAddress}
            />
            </div>
            {this.state.notif.address === true ? (
            <p className="text-danger mt-1">(*) Address can not be blank!</p>
          ) : (
            ""
          )}
            <div className="info mb-2">
              <label>Province/City <span className="span">*</span></label>
             <select className="form-control mt-2" onChange={this.onChangeCity} onBlur={this.onBlurCity}>
                <option>--Select Province/City--</option>
                {this.showListPlace(this.props.list_place)}
              </select>
            </div>
            {this.state.notif.provinceOrCity === true ? (
            <p className="text-danger mt-1">(*) Province or City can not be blank!</p>
          ) : (
            ""
          )}
            {/* <div className="address mt-2">
              
            </div>

            */}
         
          <div className="info mb-2">
            <label>
              Password <span className="span">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control mt-2"
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
          <div className="info mb-2">
            <label>
              Confirm password <span className="span">*</span>
            </label>
            <input
              type="password"
              name="repassword"
              className="form-control mt-2"
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
const mapStateToProps = (state) => {
  return {
    list_place: state.list_place,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchListPlace: () => {
      dispatch(actions.fetchListPlace());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
