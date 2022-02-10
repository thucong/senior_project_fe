import React,{ Component } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { API_URL } from "../../../constants/ApiUrl";
class AddNews extends Component{
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            subject: '',
            content: '',
            writer: '',
            category:'',
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
            content : data.getData()
        })
     }
     onChangeCategory = e => {
       this.setState({category: e.target.value})
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
          window.$('#addNews').modal('hide');
          this.setState({file: ''});
          this.setState({content:''});
          this.setState({subject: ''});
          this.setState({writer: ''})
      }
      postData = (e) => {
        e.preventDefault();
        let {subject,content,writer,category} = this.state;
        let image = this.state.file;
        axios.post(API_URL + "news", {subject,content,writer,image,category}).then((res) => {
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
        id="addNews"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addNews"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title h4">Add News</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
                <label>Subject</label>
                <textarea
                  className="form-control mt-2"
                  rows="3"
                  cols="63"
                  id="subject"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Published by</label>
                <textarea
                  className="form-control mt-2"
                  rows="2"
                  cols="63"
                  id="writer"
                  name="writer"
                  value={this.state.writer}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1" className="mb-2">Content</label>
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
                <label>Image </label> &ensp;
                <input type="file" name="file" onChange={this.uploadImage}></input> <br />
                <img src={this.state.file} style={{ width: "200px" }} className="mb-2 mt-2" alt="" />
              </div>
              <div className="form-group">
                <label>Category </label>
                <select className="form-control mt-2" onChange={this.onChangeCategory} value={this.state.category}>
                  <option value="covid">Covid</option>
                  <option value="health">Health</option>
                </select>
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
export default AddNews