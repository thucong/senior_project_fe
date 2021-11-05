import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    document.body.style.backgroundColor = "#86BAEB";
    return (
      <div className="col-lg-4 col-md-6 content jumbotron center mt-5">
        <h1 className="center h1">Register an account</h1>
        <form>
          <div className="info">
            <label>Username <span className="span">*</span></label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder=""
            />
          </div>

          <div className="info">
            <label>Fullname <span className="span">*</span></label>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder=""
            />
          </div>
          <div className="info">
            <label>E-mail <span className="span">*</span></label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder=""
            />
          </div>
          <div className="info">
            <label>Gender <span className="span">*</span></label> &#12644;
            <input type="radio" name="gender" value={false} />
            &nbsp;Male &#12644;
            <input type="radio" name="gender" value={true} />
            &nbsp;Female
          </div>
          <div className="info">
            <label>Date of birth <span className="span">*</span></label>
            <div>
              <input type="date" value="" className="form-control" />
            </div>
          </div>
          <div className="info">
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
              placeholder="Number of houses, streets,locality/village/team"
            />
          </div>
          <div className="info">
            <label>Password <span className="span">*</span></label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder=""
            />
          </div>

          <div className="info">
            <label>Confirm password <span className="span">*</span></label>
            <input
              type="password"
              name="repassword"
              className="form-control"
              placeholder=""
            />
          </div>

          <div className="right-w3l">
            <button type="button" className="btn btn-success center mt30">
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Register;
