
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
      link_call:'',
      note:''
    };
  }
  onClose = () => {
    window.$("#reply").modal("hide");
    this.setState({reply: ''});
    this.setState({reason: ''});
    this.setState({note:''});
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
  onChangeNote = (e) => {
    this.setState({note: e.target.value})
  }
  onChangeCall = (e) => {
      this.setState({link_call: e.target.value})
  }
  onSubmit =(e) => {
    e.preventDefault();
    let {_id, reply, reason, link_call, note} = this.state;
    if(reply !== '' || reason !== '' || link_call !== '') {
        ConsultationService.updateStatus(_id, reply, reason, link_call, note).then((res) => {
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
              <h5 className="modal-title h4">Xác nhận cuộc tư vấn</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <div className="form-group">
                <label className="label-time">Thời gian bắt đầu:</label> &ensp;
                <input
                  type="text"
                  value={Moment(this.state.start).format("YYYY-MM-DD hh:mm a")}
                  disabled
                  name="start"
                />
              </div>
              <div className="form-group">
                <label className="label-time">Thời gian kết thúc:</label> &ensp;
                <input type="text" value={this.state.end} disabled name="end" />
              </div>
              <p className="text-danger mb-2">
               Thời gian là 60 phút.
              </p>
              <div className="form-group">
                <label>Lý do của cuộc tư vấn:</label>
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
                  <p className="mb-2">Kết quả kiểm tra trước:</p>
                  <img
                    src={this.state.file}
                    style={{ width: "300px" }}
                    className="mb-2" alt=""
                  />
                </div>
              ) : (
                ""
              )}

              <div className="mb-2">
                <label className="reply">Xác nhận: </label>&ensp;
                <select onChange={this.onChangeReply} value={this.state.reply} name="reply">
                    <option >Lựa chọn</option>
                  <option value="confirmed">Đồng ý</option>
                  <option value="reject">Từ chối</option>
                </select>
              </div>
              {this.state.reply === 'reject' ? (
                  <div className="form-group">
                      <label>Lý do từ chối: </label>&ensp;
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
                <div>
                  <div className="form-group">
                      <label>Link cuộc gọi: </label>&ensp;
                      <input type='text' value={this.state.link_call} name="link_call" onChange={this.onChangeCall} className="form-control mt-2"/>
                  </div>
                  <div className="form-group">
                      <label>Ghi chú: </label>&ensp;
                      <input type='text' value={this.state.note} name="note" onChange={this.onChangeNote} className="form-control mt-2"/>
                  </div>
                </div>
                  
                  
              ) : ""}
              
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
                onClick={this.onSubmit}
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
export default ReplyModal;
