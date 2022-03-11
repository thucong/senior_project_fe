import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { API_URL } from "../../../constants/ApiUrl";
class EditNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      subject: "",
      content: "",
      writer: "",
      category: "",
      _id: "",
    };
  }
  componentWillMount() {
    const script = document.createElement("script");

    script.src = "https://kit.fontawesome.com/a076d05399.js";
    script.async = true;

    document.body.appendChild(script);
  }
  onHandleChange = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };
  handleCkeditorState = (event, editor) => {
    const data = editor.getData({ trim: true });
    // console.log(this.state.content);
    // console.log(data);

    if (this.state.content === data) return;
    this.setState({
      content: data,
    });
  };
  onChangeCategory = (e) => {
    this.setState({ category: e.target.value });
  };
  uploadImage = (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "w7vswxuz");
    axios
      .post("https://api.cloudinary.com/v1_1/doe5namc3/image/upload", data)
      .then((response) => {
        this.setState({ image: response.data.url });
      });
  };
  onClose = () => {
    window.$("#editNews").modal("hide");
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.choice_edit });
  }
  postData = (e) => {
    e.preventDefault();
    let { subject, content, writer, category } = this.state;
    let image = this.state.file;
    axios
      .put(API_URL + "news/" + this.state._id, {
        subject,
        content,
        writer,
        image,
        category,
      })
      .then((res) => {
        if (res.status === 200) {
          //document.querySelector('.success-create-post').style.display = 'block';
          //res.json().then(data => {
          window.location.reload();
          //})
        } else {
          // document.querySelector('.fail-create-post').style.display = 'block';
        }
      });
  };
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="editNews"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editNews"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Chỉnh sửa tin tức</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
                <label>Chủ đề</label>
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
                <label>Người viết</label>
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
                <label htmlFor="exampleFormControlInput1" className="mb-2">
                  Nội dung
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={`${this.state.content}`}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={this.handleCkeditorState}
                />
              </div>
              <div>
                <label>Hình ảnh </label> &ensp;
                <input
                  type="file"
                  name="image"
                  onChange={this.uploadImage}
                ></input>{" "}
                <br />
                <img
                  src={this.state.image}
                  style={{ width: "200px" }}
                  className="mb-2 mt-2"
                  alt=""
                />
              </div>
              <div className="form-group">
                <label>Thể loại</label>
                <select
                  className="form-control mt-2"
                  onChange={this.onChangeCategory}
                  value={this.state.category}
                >
                 <option value="Covid">Covid</option>
                  <option value="Sức khỏe">Sức khỏe</option>
                  <option value="Vaccine">Vaccine</option>
                  <option value="Dinh dưỡng">Dinh dưỡng</option>
                  <option value="Bệnh">Bệnh</option>
                </select>
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
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditNews;
