import React, { Component } from "react";
import ImageUploader from "../user/ImageUploader";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class EditProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      phone: "",
      email: "",
      success: false,
      name_blank: false,
    };
  }
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  onBlurName = () => {
    if (this.state.name === "") {
      this.setState({ name_blank: true });
    } else {
      this.setState({ name_blank: false });
    }
  };
  componentDidMount() {
    axios.get(API_URL + "user/" + cookies.get("id_user"),{  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((rs) => {
      this.setState({
        name: rs.data[0].fullname,
        avatar: rs.data[0].avatar,
        phone: rs.data[0].phone,
        email: rs.data[0].email,
      });
    });
  }
  onSubmitProfile = () => {
    if (this.state.name === "") {
      this.setState({ name_blank: true });
    } else {
      axios
        .put(API_URL + "update-profile/" + cookies.get("id_user"), {
          fullname: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          avatar: this.state.avatar,
        },{  headers: { Authorization: `Bearer ${cookies.get("token")}` }} )
        .then((rs) => {
          if(rs){
            this.setState({ success: true });
          }
        });
    }
  };
  onChangeAvatar = (url) => {
    this.setState({ avatar: url });
  };
  render() {
    return (
      <div>
        <h5 className="h5 mb-4">Avatar</h5>

        <ImageUploader
          imageUrl={this.state.avatar}
          onChange={this.onChangeAvatar}
        ></ImageUploader>

        <h5 className="h5 mt-5 mb-4">Thông tin</h5>
        <div className="mt-2">
          <div className="form-group">
           Họ và tên (*):
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Full name"
              value={this.state.name}
              onChange={this.onChangeName}
              onBlur={this.onBlurName}
            />
          </div>
          {this.state.name_blank === true ? (
            <p className="text-danger mt-1 mb-3">
              (*) Họ và tên không được để trống!
            </p>
          ) : (
            ""
          )}
          <div className="form-group">
            Số điện thoại:
            <div>
              <input
                type="text"
                value={this.state.phone}
                className="form-control mt-3"
                onChange={this.onChangePhone}
              />
            </div>
          </div>
          <div className="form-group">
            Email:
            <div>
              <input
                type="text"
                value={this.state.email}
                className="form-control mt-3"
                onChange={this.onChangeEmail}
              />
            </div>
          </div>
          {this.state.success ? (
            <div className="text-success">Lưu thông tin thành công</div>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="btn btn-success center mt-4"
            onClick={this.onSubmitProfile}
          >
            Lưu
          </button>
        </div>
      </div>
    );
  }
}

export default EditProfileDoctor;
