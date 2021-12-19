import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import Moment from "moment";
import InfoConsultation from "./InfoConsultation";

class ListConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        info_consultation:'',
        info_patient:''
    };
  }
  onClose = () => {
    window.$("#list_consultation").modal("hide");
  };
  onRead =(id) => {
    axios.get(API_URL + "consultation/" + id).then((res) => {
        this.setState({info_consultation: res.data[0]});
        this.setState({info_patient: res.data[0].patientId})
   })
   window.$('#info_consultation').modal('show');
  }
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="list_consultation"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="list_consultation"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">List of consultation</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
                {this.props.schedule.length > 0 ? (this.props.schedule.map((schedule, index) => (
                    <div className="row consultation_doctor p-3 m-3" key={index} onClick={(e) => this.onRead(schedule._id)}>          
                    <div className="col col-2">
                        <img className="mx-auto " src={schedule.patientId.avatar} height="100" width="100" alt=""/>
                    </div>
                    <div className="col col-8 info-consultation pl-5">
                        <p>Patient's name: <span className="info-item">{schedule.patientId.fullname}</span></p>
                        <p>Date: <span className="info-item">{schedule.date}</span></p>
                        <p>Time: <span className="info-item">{Moment(schedule.start).format(' hh:mm a')} - {Moment(schedule.end).format(' hh:mm a')}</span></p>
                    </div>
                    </div>
                ))
                   
                ) : <h3 className="h3 text-center text-muted">No consultation!</h3>}
            
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
        <InfoConsultation info_consultation={this.state.info_consultation} info_patient={this.state.info_patient}/>
      </div>
    );
  }
}
export default ListConsultation;
