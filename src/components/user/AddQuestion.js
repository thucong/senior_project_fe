import React, { Component } from "react";
import Cookies from "universal-cookie";
import TopicService from "../../services/TopicService";

const cookies = new Cookies();
class AddQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
      status: false
    }
  }
  onClose = () => {
    this.setState({content: ""});
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
onSubmit = (e) => {
  e.preventDefault();
  const content = this.state.content;
  const createdBy = cookies.get('id_user');
  const status = this.state.status;
  if(content ){
    TopicService.createTopic(content, status, createdBy).then((res) => {
      this.onClose();
      window.location.reload();
  })
}else{
  window.$('#addQuestion').modal('show');
}
}
  render() {
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
              <h5 className="modal-title h4">Add your question</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
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
export default AddQuestion;
