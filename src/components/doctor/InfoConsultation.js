
import React, { Component } from "react";
import Moment from "moment";
import { Link } from "react-router-dom";

class InfoConsultation extends Component {

  onClose = () => {
    window.$("#info_consultation").modal("hide");
  };
 startCall = (call) => {
     window.open(call, "_blank");
 }
  render() {
      console.log(this.props.info_consultation)
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
              <h5 className="modal-title h4">Information about consultation</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body info-consultation">
            <div className="form-group">
                <div className="row mt-2" >          
                    <div className="col col-2">
                        <img className="rounded-circle " src={this.props.info_patient.avatar} height="100" width="100"/>
                    </div>
                    <div className="col col-8 info-consultation pl-2">
                        <p>Patient's name: <span className="info-item">{this.props.info_patient.fullname}</span></p>
                        <p>Phone: <span className="info-item">{this.props.info_patient.phone}</span></p>
                        <p>Birthday: <span className="info-item">{Moment(this.props.info_patient.birthday).format('YYYY-MM-DD')}</span></p>
                        <p>Gender: <span className="info-item">{this.props.info_patient.gender === false ? 'Male' : 'Female'}</span></p>
                    </div>
                    </div>
              </div>
              <hr />
              <div className="form-group">
               <p>Date: <span className="info-item">{this.props.info_consultation.date}</span></p>
              </div>
              <div className="form-group">
               <p>Time: <span className="info-item">{Moment(this.props.info_consultation.start).format(' hh:mm a')} - {Moment(this.props.info_consultation.end).format(' hh:mm a')}</span></p>
              </div>
              <div className="form-group">
               <p>Reason for consultation: <span className="info-item">{this.props.info_consultation.content}</span></p>
              </div>
              {this.props.info_consultation.file !== "" ? (
                <div className="mb-2">
                  <p className="mb-2">There are prior examinations:</p>
                  <img
                    src={this.props.info_consultation.file}
                    style={{ width: "300px" }}
                    className="mb-2"
                  />
                </div>
              ) : (
                ""
              )}
                <div className="form-group">
                    <p>Link call: <button className="btn btn-success" onClick={(e) => this.startCall(this.props.info_consultation.linkCall)}>Start call</button></p>
                </div>
              <p className="text-danger">
                The duration of a consultation is 60 minutes.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClose}
              >
               Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default InfoConsultation;
