import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ForgotPasswordService from "../services/ForgotPasswordService";
import loading_gif from "../images/loader.gif";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      repassword: "",
      notif: {
        password: false,
        repassword: false,
      },
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
  onBlurRepassword = () => {
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
    this.onBlurRepassword();
  };
  onSubmit = (e) => {
    e.preventDefault();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const resetLink = params.get("resetLink");
    const { password, repassword } = this.state;
    if (password === repassword) {
      ForgotPasswordService.resetPasswordAPI(resetLink, password)
        .then((res) => {
          this.props.history.push("/login");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              this.setState({
                notifmess: "(*) Khóa xác thực không đúng hoặc hết hạn!",
              });
            } else if (err.response.status === 401) {
              this.setState({
                notifmess: "(*) Người dùng với khóa xác thực này không tồn tại!",
              });
            }
          }
        });
    } else if (password !== repassword) {
      const notif = this.state.notif;
      notif.repassword = true;
      this.setState({ notif });
    } else if (!password) {
      const notif = this.state.notif;
      notif.password = true;
      this.setState({ notif });
    }
  };
  render() {
    document.body.style.backgroundColor = "#eceff1 ";
    return (
      <div className="col-lg-4 col-md-6 content jumbotron center mt-5">
        <h2 className="h2">Tạo mật khẩu mới</h2>
        <form>
          <div className="form-group mt-3 mr-3 w-100 ">
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="form-control w-100"
              value={this.state.password}
              name="password"
              onChange={this.onHandleChange}
              onBlur={this.onBlurPassword}
            />
          </div>
          {this.state.notif.password === true ? (
            <p className="text-danger mt-1">(*) Mật khẩu không được để trống!</p>
          ) : (
            ""
          )}
          <div className="form-group mt-3 mr-3 w-100 ">
            <input
              type="password"
              placeholder="Xác nhận lại mật khẩu"
              className="form-control w-100"
              value={this.state.repassword}
              name="repassword"
              onChange={this.onHandleChange}
              onBlur={this.onBlurRepassword}
            />
          </div>
          {this.state.notif.repassword === true ? (
            <p className="text-danger mt-1">(*) Mật khẩu không trùng khớp!</p>
          ) : (
            ""
          )}
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
                Lưu
              </button>
            </div>
          ) : (
            <div className="submit">
              <button
                type="submit"
                className="btn btn-success btn-email"
                onClick={this.onSubmit}
              >
                Lưu
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default withRouter(ResetPassword);
