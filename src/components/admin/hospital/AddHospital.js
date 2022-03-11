import React,{ Component } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { API_URL } from "../../../constants/ApiUrl";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
class AddHospital extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            name: '',
            phone: '',
            email: '',
            address:'',
            city:'',
            description:''
        };
    }
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "https://kit.fontawesome.com/a076d05399.js";
        script.async = true;

        document.body.appendChild(script);
    }
    onHandleChange = e => {
        let { name, value } = e.target

        this.setState({
            [name]: value
        })
    }
    onCashange  = data => { 
        console.log( "Called" );
        this.setState({
            description : data.getData()
        })
     }
     onChangeCity = e => {
       this.setState({city: e.target.value})
     }
     uploadImage = (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "w7vswxuz");
        axios
          .post("https://api.cloudinary.com/v1_1/doe5namc3/image/upload", data)
          .then((response) => {
            this.setState({file:response.data.url});
          });
      };
      onClose = () => {
          window.$('#addHospital').modal('hide');
          this.setState({file: ''});
          this.setState({name:''});
          this.setState({phone: ''});
          this.setState({email: ''});
          this.setState({address: ''});
          this.setState({description:''})
      }
      postData = (e) => {
        e.preventDefault();
        let {name,phone,email,address, description} = this.state;
        let image = this.state.file;
        let provinceOrCity = this.state.city;
        axios.post(API_URL + "hospital", {name,phone,email,address, provinceOrCity, description, image}).then((res) => {
            if (res.status === 200) {
                //document.querySelector('.success-create-post').style.display = 'block';
                //res.json().then(data => {
                window.location.reload()
                //})
            }
            else {
               // document.querySelector('.fail-create-post').style.display = 'block';
            }
        })
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
      componentDidMount(){
        if (this.props.list_place.length === 0) {
          this.props.fetchListPlace();
        }
      }
    render(){
        return(
            <div
        className="modal fade bd-example-modal-lg"
        id="addHospital"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addHospital"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title h4">Thêm bệnh viện</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
                <label>Tên</label>
                <textarea
                  className="form-control mt-2"
                  rows="2"
                  cols="63"
                  id="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <textarea
                  className="form-control mt-2"
                  rows="1"
                  cols="63"
                  id="phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Email</label>
                <textarea
                  className="form-control mt-2"
                  rows="1"
                  cols="63"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <textarea
                  className="form-control mt-2"
                  rows="2"
                  cols="63"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Tỉnh/Thành phố</label>
                <select className="form-control mt-2" onChange={this.onChangeCity} value={this.state.city}>
                  <option value="">Chọn địa điểm</option>
                    {this.showListPlace(this.props.list_place)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1" className="mb-2">Mô tả</label>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p></p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }                                
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.onCashange( editor );
                        console.log( { event, editor, data } );

                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
              </div>
              <div>
                <label>Hình ảnh</label> &ensp;
                <input type="file" name="file" onChange={this.uploadImage}></input> <br />
                <img src={this.state.file} style={{ width: "200px" }} className="mb-2 mt-2" alt="" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.onClose}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={this.postData}
              >
               Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(AddHospital)