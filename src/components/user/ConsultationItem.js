import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { API_URL } from "../../constants/ApiUrl";
import Moment from "moment";
import EditConsultation from "./EditConsultation";
import DeleteConsultation from "./DeleteConsultation";
import ConsultationService from "../../services/ConsultationService";


const cookies = new Cookies();
class ConsultationItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      consultation: [],
      time_consultation: "",
      info_consultation: '',
      list_consultation: "",
      list_schedule: "",
      choice_delete: '',
      hours:'',
      minutes:'',
      seconds:''
    }
  }
  componentDidMount(){
    axios.get(API_URL + "consultation/patient/" + cookies.get('id_user'),{  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
      this.setState({consultation: res.data})
    })

  }
  onChoose = (id) => {
    axios.get(API_URL + "consultation/" + id, {  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
        this.setState({info_consultation: res.data[0]});
    })
    window.$('#editConsultation').modal('show');
  }
  onChooseDelete = (id) => {
      window.$('#deleteConsultation').modal('show');
      this.setState({choice_delete: id})
  }
  countdown = (time) => {
  
    var time_consultation = new Date(time).getTime();
      setInterval(() => {
        var now = new Date().getTime();
        var D = time_consultation - now
        if( D < 0){
          clearInterval()
        }else{
          var hours = Math.floor(D/(1000*60*60))
          var minutes = Math.floor(D/(1000*60))
          var seconds = Math.floor(D/1000)
          hours %=24
        minutes %=60
        seconds %=60
        this.setState({hours: hours})
        this.setState({minutes: minutes})
        this.setState({seconds: seconds})
        }
       
   
      
    },1000)
   
    
    
  }
  call = (link) => {
    window.open(link,"_blank")
  }
  changeStatus = (id_consultation) => {
    let id = id_consultation;
    let status = 'done';
    ConsultationService.updateStatus(id, status).then((res) => {
      window.location.reload();
    })
  }

  render() {
    const {consultation} = this.state;
   // var now = new Date().getTime();
    //console.log(now)

    return (
      <div className="col col-lg-8 mt-5 pr-5 ">
        <h3 className="h3 border-bottom mb-3 left-text">Các cuộc tư vấn</h3>
        {consultation.length > 0 ? (consultation.map((item, index) => (
          <div className="row mb-3 consultation p-3" key={index} >
          <div className="col col-2">
            <img className="mx-auto " src={item.doctorId.avatar} height="150" width="150" alt="" />
          </div>
          <div className="col col-10 info-consultation pl-4">
            <p>Tên bác sĩ: <span className="info-item">{item.doctorId.fullname}</span></p>
            <p>Ngày: <span className="info-item">{item.date}</span></p>
            <p>Thời gian: <span className="info-item">{Moment(item.start).format(' hh:mm a')} - {Moment(item.end).format(' hh:mm a')}</span></p>
            <p>Lý do của cuộc tư vấn: <span className="info-item">{item.content}</span></p>
            <p>Trạng thái: <span className={item.status === 'waiting' ? 'wait' : '' || item.status === 'reject' ? 'reject' : '' || item.status === 'confirm'||'done' ? 'confirm': ''}>{item.status.toUpperCase()}</span></p>
            {item.status === "done" ? <Link className="send-comment" to={"/doctor/" + item.doctorId._id}>Gửi phản hồi cho bác sĩ</Link> : ""}
            {item.status === "waiting" ? (
                 <div className="mt-2">
                 <button className="btn btn-success" onClick={(e) => this.onChoose(item._id)}>Sửa</button>&ensp;
                 <button className="btn btn-danger" onClick={(e) => this.onChooseDelete(item._id)}>Xóa</button>
               </div>
            ) : ""}
               
            {item.status === "confirmed" ? (
              <div>
                <div>
                  <p>Ghi chú: <span className="info-item">{item.note}</span></p>
                </div>
                {(new Date().getTime() < new Date(item.start).getTime()) ? this.countdown(item.start) : ''}
                {(new Date().getTime() > new Date(item.end).getTime()) ? this.changeStatus(item._id) : ''}
               {(this.state.hours > 0) || (this.state.minutes > 0) || (this.state.seconds > 0) ? (
                  <p>Thời gian còn lại cho đến cuộc tư vấn: <span  className="info-item">{this.state.hours}:{this.state.minutes}:{this.state.seconds} </span></p>
                ) :  <button className="btn btn-success mt-1" onClick={(e) => this.call(item.linkCall)}>Bắt đầu cuộc gọi</button>} 
              </div>
            ) : ""}
            {item.status === 'reject' ? (<p>Lý do từ chối: <span className="info-item">{item.reasonOfReject}</span></p>) : ''}
          </div>
        </div>
        ))) : ""}
        <EditConsultation info_consultation={this.state.info_consultation} list_schedule={this.state.list_schedule}/>
        <DeleteConsultation choice_delete={this.state.choice_delete}/>
      </div>
    );
  }
}
export default ConsultationItem;
