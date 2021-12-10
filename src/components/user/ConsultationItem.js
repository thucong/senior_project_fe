import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { API_URL } from "../../constants/ApiUrl";
import Moment from "moment";

const cookies = new Cookies();
class ConsultationItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      consultation: [],
      time_consultation: ""
    }
  }
  componentDidMount(){
    axios.get(API_URL + "consultation/patient/" + cookies.get('id_user')).then((res) => {
      this.setState({consultation: res.data})
    })
  }
  render() {
    const {consultation} = this.state;
    var now = new Date().getTime();
    console.log(now)

    return (
      <div className="col col-lg-8 mt-5 pr-5 border-right ">
        {consultation.length > 0 ? (consultation.map((item, index) => (
          <div className="row mb-3 consultation p-3" key={index}>
          <div className="col col-2">
            <img className="mx-auto " src={item.doctorId.avatar} height="150" width="150"/>
          </div>
          <div className="col col-10 info-consultation pl-4">
            <p>Doctor's name: <span className="info-item">{item.doctorId.fullname}</span></p>
            {/* <p>Date: <span className="info-item">{item.date}</span></p>
            <p>Time: <span className="info-item">{item.time}</span></p> */}
            <p>Date: <span className="info-item">{item.date}</span></p>
            <p>Time: <span className="info-item">{Moment(item.start).format(' hh:mm a')} - {Moment(item.end).format(' hh:mm a')}</span></p>
            {/* <p>End time: <span className="info-item">{item.end}</span></p> */}
            <p>Reason for examination: <span className="info-item">{item.reason}</span></p>
            <p>Status: <span className="info-status">{item.status.toUpperCase()}</span></p>
            {item.status === "done" ? <Link className="send-comment">Please send comment after consultation</Link> : ""}
            {item.status === "wait" ? (
                 <div className="mt-2">
                 <button className="btn btn-success">Edit</button>&ensp;
                 <button className="btn btn-danger">Delete</button>
               </div>
            ) : ""}
            {item.status === "reject" ? <p>{item.reasonOfReject}</p> : ""}
            {item.status === "confirmed" ? (
              <div></div>
            ) : ""}
          </div>
        </div>
        ))) : ""}
        
        {/* <div className="row consultation p-3 mb-3">
          <div className="col col-2">
            <img className="mx-auto pr-2" src="https://bacsigiadinh.top/wp-content/uploads/2020/05/doctor_female_noavatar.png" height="150" width="150"/>
          </div>
          <div className="col col-10 info-consultation">
            <p>Doctor's name: <span className="info-item">Nguyen Van A</span></p>
            <p>Time: <span className="info-item">December 5, 2021 8:00 - 8:30</span></p>
            <p>Reason for examination: <span className="info-item">Having high blood pressure, despite taking enough medication</span></p>
            <p>Status: <span className="info-status">Wait</span></p>
            <p></p>
            <div className="mt-2">
              <button className="btn btn-success">Edit</button>&ensp;
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default ConsultationItem;
