import axios from "axios";
import React, { Component } from "react";
import Moment from "moment";
import {withRouter } from "react-router-dom";
import { API_URL } from "../../constants/ApiUrl";
import ConsultationService from "../../services/ConsultationService";
class EditConsultation extends Component {
  constructor(props) {
    super(props);
    this.state ={
        start: '',
        end:'',
        content: '',
        file: '',
        doctorId:'',
        date:'',
        list_consultation: "",
        list_schedule: "",
    }
  }
  onClose = () => {
      window.$('#editConsultation').modal('hide')
  }
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.info_consultation})
    // let list_consultation = [];
    // axios
    //   .get(API_URL + "consultation/doctor/" + this.state.doctorId)
    //   .then((res) => {
    //     let consultation = res.data.filter(
    //       (item) => item.date === this.state.date
    //     );
    //     consultation.map((startTime, index) => {
    //       list_consultation.push(startTime.start);
    //     });
    //     this.setState({ list_consultation: consultation });
    //   });
    //   console.log(this.state.list_consultation);
    //   axios
    //   .get(API_URL + "schedule/doctor/" + this.state.doctorId)
    //   .then((res) => {
    //     let schedule = res.data.filter((item) => item.date === this.state.date);
    //     console.log(schedule)
    //       let arr = list_consultation.concat(schedule[0].schedule);
    //     const sorted_arr = arr.sort((a, b) => ("" + a).localeCompare(b));

    //     let result = [];
    //     for (let i = 1; i < arr.length; i++) {
    //       if (
    //         sorted_arr[i] !== sorted_arr[i - 1] &&
    //         sorted_arr[i] !== sorted_arr[i + 1]
    //       ) {
    //         result.push(sorted_arr[i]);
    //       }
    //     }
    //     this.setState({list_schedule: result}) 
    //   });
  }

onChangeContent = (e) => {
  this.setState({content: e.target.value})
}
// onChangeTime = (e) => {
//   this.setState({start: e.target.value});
//   this.setState({end: Moment(new Date(Date.parse(e.target.value) + 3600000)).format('YYYY-MM-DD hh:mm a')})
// }
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
  let {content, file} = this.state;
  let id = this.props.info_consultation._id;
  //console.log(id);
  ConsultationService.updateConsultation(id, content, file).then((res) => {
    window.$('#editConsultation').modal('hide');
    window.location.reload();
  })
}
  render() {
    //console.log(this.props.info_consultation);
    

    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="editConsultation"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editConsultation"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Edit a consultation</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
             <div className="modal-body ">
              <div className="form-group">
              {/* <label>Start time:</label> &ensp;
                 <select onChange={this.onChangeTime} value={this.state.start} name="start">
                 <option value={this.state.start}>{Moment(this.state.start).format('YYYY-MM-DD hh:mm a')}</option> 
                {this.state.list_schedule.length > 0 ? (this.state.list_schedule.map((time, index) => (
                   <option value={time} key={index}>{Moment(time).format('YYYY-MM-DD hh:mm a')}</option>
                 ))): ""}
                  </select> */}
                <label>Start time:</label> &ensp;
                <input type="text" value={Moment(this.state.start).format('YYYY-MM-DD hh:mm a')} disabled name="start"/>
              </div>
              {this.state.start ? (
                 <div className="form-group">
                 <label>End time:</label> &ensp;
               
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
                  onChange={this.onChangeContent}
                  value={this.state.content}
                ></textarea>
              </div>
              <p className="mb-2">There are prior examinations:</p>
              <div>
                <label>Upload images:</label>&ensp;
                <input type="file" name="file" onChange={this.uploadImage} ></input> <br />
                <img src={this.state.file} style={{ width: "200px" }} className="mt-2"/>
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
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(EditConsultation);
