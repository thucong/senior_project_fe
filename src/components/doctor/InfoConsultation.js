
import React, { Component } from "react";
import Moment from "moment";


class InfoConsultation extends Component {

  onClose = () => {
    window.$("#info_consultation").modal("hide");
  };
 startCall = (call) => {
     window.open(call, "_blank");
 }
  render() {
      //console.log(this.props.info_consultation)
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="info_consultation"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="info_consultation"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Thông tin của cuộc tư vấn</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body info-consultation">
            <div className="form-group">
                <div className="row mt-2" >          
                    <div className="col col-2">
                        <img className="rounded-circle " src={this.props.info_patient.avatar} height="100" width="100" alt="" />
                    </div>
                    <div className="col col-8 info-consultation pl-2">
                        <p>Tên bệnh nhân: <span className="info-item">{this.props.info_patient.fullname}</span></p>
                        <p>Số điện thoại: <span className="info-item">{this.props.info_patient.phone}</span></p>
                        <p>Ngày sinh: <span className="info-item">{Moment(this.props.info_patient.birthday).format('YYYY-MM-DD')}</span></p>
                        <p>Giới tính: <span className="info-item">{this.props.info_patient.gender === false ? 'Nam' : 'Nữ'}</span></p>
                    </div>
                    </div>
              </div>
              <hr />
              <div className="form-group">
               <p>Ngày: <span className="info-item">{this.props.info_consultation.date}</span></p>
              </div>
              <div className="form-group">
               <p>Thời gian: <span className="info-item">{Moment(this.props.info_consultation.start).format(' hh:mm a')} - {Moment(this.props.info_consultation.end).format(' hh:mm a')}</span></p>
              </div>
              <div className="form-group">
               <p>Lý do của cuộc tư vấn: <span className="info-item">{this.props.info_consultation.content}</span></p>
              </div>
              {this.props.info_consultation.file !== "" ? (
                <div className="mb-2">
                  <p className="mb-2">Kết quả kiểm tra trước:</p>
                  <img
                    src={this.props.info_consultation.file}
                    style={{ width: "300px" }}
                    className="mb-2" alt=""
                  />
                </div>
              ) : (
                ""
              )}
              {this.props.info_consultation.note !== "" ? (
                <div className="form-group">
                <p>Ghi chú: <span className="info-item">{this.props.info_consultation.note}</span></p>
               </div>
              ) : " "}
              
                <div className="form-group">
                    <p>Link: <button className="btn btn-success" onClick={(e) => this.startCall(this.props.info_consultation.linkCall)}>Bắt đầu cuộc gọi</button></p>
                </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClose}
              >
               Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default InfoConsultation;
