import React, { Component } from "react";
import Cookies from "universal-cookie";
import TopicService from "../../services/TopicService";
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from "axios";


const cookies = new Cookies();
class AddQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
      file: "",
      hashtag: [],
      status: false
    }
  }
  onClose = () => {
    this.setState({content: ""});
    this.setState({file:''})
    this.setState({hashtag: []})
    window.$('#addQuestion').modal('hide');
}
onHandleChange = (e) => {
  var target = e.target;
  var name = target.name;
  var value = target.value;
  this.setState({
    [name]: value,
  });
};
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
onChangeHashtag = (hashtag) => {
  this.setState({ hashtag })
}
componentDidMount(){
  if (this.props.list_hashtag.length === 0) {
    this.props.fetchListHashtag();
}
}
onSubmit = (e) => {
  e.preventDefault();
  const content = this.state.content;
  const createdBy = cookies.get('id_user');
  const status = this.state.status;
  const {file, hashtag} = this.state
  console.log(hashtag)
  if(content){
    TopicService.createTopic(content, status, createdBy, file, hashtag).then((res) => {
      this.onClose();
      window.location.reload();
  })
}else{
  window.$('#addQuestion').modal('show');
}
}
  render() {
     let ref = React.createRef();
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="addQuestion"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addQuestion"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title h4">Add Question</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
                <label>Question</label>
                <textarea
                  className="form-control mt-2"
                  rows="5"
                  cols="63"
                  placeholder="Please ask your question..."
                  id="content"
                  name="content"
                  value={this.state.content}
                  onChange={this.onHandleChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Symptom</label>
                  <Typeahead
                      id="public-methods-example"
                      name="hashtag1"
                      className="mt-2"
                      labelKey="name"
                      multiple
                      options={this.props.list_hashtag}
                      placeholder="Please enter symptom"
                      ref={ref}
                      onChange={this.onChangeHashtag}
                      //onBlur={this.onBlurHashtag}
                      selected={this.state.hashtag}
                  />
              </div>
              <div>
                <label>Upload Image </label> &ensp;
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
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={this.onSubmit}
              >
               Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    list_hashtag : state.list_hashtag,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeHashtag: (hashtag) => {
      dispatch(actions.changeHashtag(hashtag))
    },
    fetchListHashtag : () => {
      dispatch(actions.fetchListHashtag())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
