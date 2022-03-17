import React, { Component } from "react";
import Moment from "moment";
import { connect } from "react-redux";
import * as actions from "./../../actions/index";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      name: "",
      gender: true,
      dob: "1999-01-01",
      place: "",
      address: "",
      phone: "",
      email: "",
      success: false,
      name_blank: false,
    };
  }
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeGender = (e) => {
    this.setState({ gender: e.target.value === "true" ? true : false });
  };
  onChangeDob = (e) => {
    this.setState({ dob: e.target.value });
  };
  onChangePlace = (e) => {
    this.setState({ place: e.target.value });
  };
  onChangeAddress = (e) => {
    this.setState({ address: e.target.value });
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
        gender: rs.data[0].gender,
        avatar: rs.data[0].avatar,
        dob: Moment(rs.data[0].birthday).format("yyyy-MM-DD"),
        phone: rs.data[0].phone,
        email: rs.data[0].email,
        address: rs.data[0].address,
        place: rs.data[0].provinceOrCity,
      });
    });
    if (this.props.list_place.length === 0) {
      this.props.fetchListPlace();
    }
  }
  onSubmitProfile = () => {
    if (this.state.name === "") {
      this.setState({ name_blank: true });
    } else {
      axios
        .put(API_URL + "update-profile/" + cookies.get("id_user"), {
          fullname: this.state.name,
          birthday: new Date(this.state.dob),
          gender: this.state.gender,
          provinceOrCity: this.state.place,
          phone: this.state.phone,
          email: this.state.email,
          address: this.state.address,
          avatar: this.state.avatar,
        },{  headers: { Authorization: `Bearer ${cookies.get("token")}` }} )
        .then((rs) => {
          if(rs){
            this.setState({ success: true });
          }
        });
    }
  };
  // onChangeAvatar = (url) => {
  //    axios.put( API_URL + "avatar/"+ cookies.get('id_user'), {
  //         "avatar": url
  //     }).then(rs => {
  //         this.setState({avatar:url});
  //         //console.log(rs.data)
  //     });
  // }
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
              placeholder="Họ và tên"
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
            Giới tính:
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="gender1"
                value={false}
                onChange={this.onChangeGender}
                checked={this.state.gender === false}
              />
              <label className="form-check-label" htmlFor="gender1">
                Nam
              </label>
            </div>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="gender2"
                value={true}
                onChange={this.onChangeGender}
                checked={this.state.gender === true}
              />
              <label className="form-check-label" htmlFor="gender2">
                Nữ
              </label>
            </div>
          </div>
          <div className="form-group">
            Ngày sinh:
            <div>
              <input
                type="date"
                value={this.state.dob}
                className="form-control mt-3"
                onChange={this.onChangeDob}
              />
            </div>
          </div>
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
          <div className="form-group">
            Địa chỉ:
            <div>
              <input
                type="text"
                value={this.state.address}
                className="form-control mt-3"
                onChange={this.onChangeAddress}
              />
            </div>
          </div>
          <div className="form-group">
            Tỉnh/Thành phố:
            <select
              className="form-control mt-3"
              onChange={this.onChangePlace}
              value={this.state.place}
            >
              <option value="">Place</option>
              {this.showListPlace(this.props.list_place)}
            </select>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
