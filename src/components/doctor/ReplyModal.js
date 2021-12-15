
import React, { Component } from "react";
import Moment from "moment";
import ConsultationService from "../../services/ConsultationService";


class ReplyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
      content: "",
      file: "",
      doctorId: "",
      date: "",
      reply:'',
      _id:'',
      reason:'',
      link_call:''
    };
  }
  onClose = () => {
    window.$("#reply").modal("hide");
    this.setState({reply: ''});
    this.setState({reason: ''})
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.info_consultation });
  }
  onChangeReply = (e) => {
      this.setState({reply: e.target.value})
  }
  onChangeReason = (e) => {
    this.setState({reason: e.target.value})
  }
  onChangeCall = (e) => {
      this.setState({link_call: e.target.value})
  }
  onSubmit =(e) => {
    e.preventDefault();
    let {_id, reply, reason, link_call} = this.state;
    if(reply !== '' || reason !== '' || link_call !== '') {
        ConsultationService.updateStatus(_id, reply, reason, link_call).then((res) => {
            window.$("#reply").modal("hide");
            window.location.reload();
        })
    }else{
        window.$("#reply").modal("show");
    }
    
  }
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="reply"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="reply"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Reply a consultation</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <div className="form-group">
                <label>Start time:</label> &ensp;
                <input
                  type="text"
                  value={Moment(this.state.start).format("YYYY-MM-DD hh:mm a")}
                  disabled
                  name="start"
                />
              </div>
              <div className="form-group">
                <label>End time:</label> &ensp;
                <input type="text" value={this.state.end} disabled name="end" />
              </div>
              <div className="form-group">
                <label>Reason for consultation:</label>
                <textarea
                  className="form-control mt-2"
                  rows="5"
                  cols="63"
                  name="content"
                  value={this.state.content}
                  disabled
                ></textarea>
              </div>
              {this.state.file !== "" ? (
                <div className="mb-2">
                  <p className="mb-2">There are prior examinations:</p>
                  <img
                    src={this.state.file}
                    style={{ width: "300px" }}
                    className="mb-2"
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mb-2">
                <label className="reply">Reply: </label>&ensp;
                <select onChange={this.onChangeReply} value={this.state.reply} name="reply">
                    <option >Choose reply</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="reject">Reject</option>
                </select>
              </div>
              {this.state.reply === 'reject' ? (
                  <div className="form-group">
                      <label>Reason for reject: </label>&ensp;
                      <textarea
                  className="form-control mt-2"
                  rows="5"
                  cols="30"
                  name="reason"
                  onChange={this.onChangeReason}
                  value={this.state.reason}
                ></textarea>
                  </div>
              ) : ''}
              {this.state.reply === "confirmed" ? (
                  <div className="form-group">
                      <label>Link call of consultation: </label>&ensp;
                      <input type='text' value={this.state.link_call} name="link_call" onChange={this.onChangeCall} className="form-control mt-2"/>
                  </div>
              ) : ""}
              <p className="text-danger">
                The duration of a consultation is 60 minutes.
              </p>
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
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ReplyModal;