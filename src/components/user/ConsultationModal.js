import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import Moment from "moment";
import Cookies from "universal-cookie";
import ConsultationService from "../../services/ConsultationService";
import {withRouter } from "react-router-dom";

const cookies = new Cookies();
class ConsultationModal extends Component {
  constructor(props) {
    super(props);
    this.state ={
      start: '',
      end: '',
      content: '',
      file: '',
      status: 'waiting',
      notif_time: false,
      notif_content: false,
    }
  }
  onClose = () => {
    window.$("#consultation").modal("hide");
    this.setState({start: ''});
    this.setState({end: ''});
    this.setState({content:''});
    this.setState({file : ''})
  };
  onChangeTime = (e) => {
    this.setState({start: e.target.value});
    this.setState({end: Moment(new Date(Date.parse(e.target.value) + 3600000)).format('YYYY-MM-DD hh:mm a')})
}
onChangeContent = (e) => {
  this.setState({content: e.target.value})
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
onSubmit = (e) => {
  e.preventDefault();
  let {start, end, content, file, status} = this.state;
  let {doctorId} = this.props;
  let patientId = cookies.get('id_user');
  let date = this.props.date;
  if(start && content){
    ConsultationService.createConsultation(start, end, content, file, status, doctorId, patientId, date).then((res) => {
      if(res.status === 200){
        this.props.history.push('/consultation')
      }
    })
  }else if(!start){
    this.setState({notif_time: true});
    window.$("#consultation").modal("show");
  }else if(!content){
    this.setState({notif_content: true})
    window.$("#consultation").modal("show");
  }
}
  render() {
    //console.log(Moment(this.state.start).format("dd-mm-yyyy"))
   let a = new Date(Date.parse(this.state.start) + 3600000);
    
   console.log(a)
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="consultation"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="consultation"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Book a consultation</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {this.props.list_schedule.length > 0 ? (
            <div className="modal-body ">
                 <div className="form-group">
                 <label>Start time:</label> &ensp;
                 <select onChange={this.onChangeTime} value={this.state.start} name="start">
                 <option value="">Choose time</option> 
                {this.props.list_schedule.map((time, index) => (
                   <option value={time} key={index}>{Moment(time).format('YYYY-MM-DD hh:mm a')}</option>
                 ))}
                  </select>
               </div>
               {this.state.start ? (
                 <div className="form-group">
                 <label>End time:</label> &ensp;
                 {/* <select>
                   <option>{new Date(Date.parse(this.state.start) + 10080)}</option>
                 </select> */}
                 {/* <input type="text" value={Moment(new Date(Date.parse(this.state.start) + 3600000)).format('DD-MM-YYYY hh:mm a')} disabled/> */}
                 <input type="text" value={this.state.end} disabled name="end"/>
               </div>
              ) : ""}
              <div className="form-group">
               <label>Reason for consultation:</label>
               <textarea
                 className="form-control mt-2"
                 rows="5"
                 cols="63"
                 name="content"
                 value={this.state.content}
                 onChange={this.onChangeContent}
               ></textarea>
             </div>
             <p className="mb-2">There are prior examinations:</p>
             <div>
               <label>Upload images:</label>&ensp;
               <input type="file" name="file" onChange={this.uploadImage}></input> <br />
               <img src={this.state.file} style={{ width: "200px" }} className="mb-2"/>
             </div>
             <p className="text-danger">The above times are available. The duration of a consultation is 60 minutes.</p>
             </div>
              ) : <p className="p-4">The calendar has expired to book a consultation. Please choose another date!</p>}
            {this.state.notif_time === true ? <p className="text-danger ">(*) Please choose the time!</p> : ""}
            {this.state.notif_content === true ? <p className="text-danger ">(*) Please write your reason!</p> : ""}
            {this.props.list_schedule.length > 0 ? (
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
            ) : (
              <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onClose}
              >
                OK
              </button>
             
            </div>
            )}
            
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ConsultationModal);