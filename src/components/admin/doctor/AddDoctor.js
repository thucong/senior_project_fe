import React,{ Component } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { API_URL } from "../../../constants/ApiUrl";
class AddDoctor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            avatar: 'https://bacsigiadinh.top/wp-content/uploads/2020/05/doctor_female_noavatar.png',
            name: '',
            phone: '',
            email: '',
            department:'',
            role:'doctor',
            workplace:'',
            experience: '',
            password: 'ABC',
            qualification:''
        };
    }
    componentWillMount() {
        const script = document.createElement("script");

        script.src = "https://kit.fontawesome.com/a076d05399.js";
        script.async = true;

        document.body.appendChild(script);
    }
    onChangeDepartment = e => {
        this.setState({department: e.target.value})
      }
      onChangeWork = e => {
          this.setState({workplace: e.target.value})
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
            experience : data.getData()
        })
     }
      onClose = () => {
          window.$('#addDoctor').modal('hide');
          this.setState({name:''});
          this.setState({phone: ''});
          this.setState({email: ''});
          this.setState({department: ''});
          this.setState({workplace:''});
          this.setState({experience:''});
          this.setState({qualification:''})
      }
      postData = (e) => {
        e.preventDefault();
        let {phone,email,department, workplace, experience, avatar, role,password, qualification} = this.state;
        let fullname = this.state.name
        axios.post(API_URL + "user", {fullname,phone,email,department, workplace, experience, avatar, role,password, qualification}).then((res) => {
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
    render(){
        return(
            <div
        className="modal fade bd-example-modal-lg"
        id="addDoctor"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addDoctor"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title h4">Add Doctor</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
                <label>Name</label>
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
                <label>Phone</label>
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
                <label>Department</label>
                <select className="form-control mt-2" onChange={this.onChangeDepartment} value={this.state.department}>
                  <option value="Quang Nam">Quang Nam</option>
                  <option value="Ha Noi">Ha Noi</option>
                </select>
              </div>
              <div className="form-group">
                <label>Workplace</label>
                <select className="form-control mt-2" onChange={this.onChangeWork} value={this.state.workplace}>
                  <option value="Quang Nam">Quang Nam</option>
                  <option value="Ha Noi">Ha Noi</option>
                </select>
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <textarea
                  className="form-control mt-2"
                  rows="1"
                  cols="63"
                  id="qualification"
                  name="qualification"
                  value={this.state.qualification}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1" className="mb-2">Experience</label>
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={this.postData}
              >
               Submit
              </button>
            </div>
          </div>
        </div>
      </div>
        )
    }
}
export default AddDoctor