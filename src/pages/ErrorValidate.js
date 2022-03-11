import React, { Component } from "react";
import errorvalidate from "../images/email-error.png";
class ErrorValidate extends Component {
  render() {
    document.body.style.backgroundColor = "#eceff1";
    return (
      <div>
        <div className="col col-lg-5 col-md-8 mt-4 mx-auto mt30">
          <img
            src={errorvalidate}
            className="mt-sm-md-3 verify center mt-3"
            alt=""
          ></img>{" "}
          <br />
          <h1 className="ct mb-3 mt-4">
          Không thể xác nhận email. Vui lòng thử lại!
          </h1>
        </div>
      </div>
    );
  }
}
export default ErrorValidate;
