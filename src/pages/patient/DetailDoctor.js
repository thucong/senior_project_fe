import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ConsultationModal from "../../components/user/ConsultationModal";
import Moment from "moment";
import InfoModal from "../../components/user/InfoModal";
import NoticeModal from "../../components/user/NoticeModal";
import OffModal from "../../components/user/OffModal";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: {},
      date: "",
      start: "",
      list_schedule: "",
      list_consultation: "",
      data_consultation:'',
      data_schedule:'',
      time_present:'',
      patient:'',
      list_consultation_user:''
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "user/" + this.props.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data1) => data1[0])
      .then((data) => {
        this.setState({ information: data });
      });
    axios.get(API_URL + "consultation/doctor/" + this.props.match.params.id).then((res) => {
      this.setState({data_consultation: res.data})
    })
    axios.get(API_URL + "schedule/doctor/" + this.props.match.params.id).then((res) => {
      this.setState({data_schedule: res.data})
    })
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let time = new Date(`${year}-${month + 1}-${day}`).getTime();
    this.setState({time_present: time})
   
  }
  handleSelect = (info) => {
    this.setState({ date: info.startStr });
    let time_choose = new Date(info.startStr).getTime();
    let time_day = new Date(info.startStr).getDay();
    console.log(time_day)
    if(time_choose >= this.state.time_present){
      if(time_day === 0 || time_day === 6){
        window.$('#off').modal('show');
      }else{
        let list_consultation = [];
      const {data_consultation, data_schedule} = this.state;
      let consultation= data_consultation.filter((item) => item.date === info.startStr);
      consultation.map((startTime, index) => {
        list_consultation.push(startTime.start);
      })
      this.setState({ list_consultation: consultation });
      let schedule = data_schedule.filter((item) =>  item.date === info.startStr);
      if(schedule[0]){
        this.setState({ start: schedule[0].schedule });
      let arr = list_consultation.concat(schedule[0].schedule);
      const sorted_arr = arr.sort((a, b) => ("" + a).localeCompare(b));
  
            let result = [];
            for (let i = 0; i < arr.length; i++) {
              if (
                sorted_arr[i] !== sorted_arr[i - 1] &&
                sorted_arr[i] !== sorted_arr[i + 1]
              ) {
                result.push(sorted_arr[i]);
              }
            }
            console.log(result)
            let result1 = result.filter((item) => (new Date(item).getTime()) > (new Date().getTime()))
            console.log(result1)
            this.setState({list_schedule: result1})
            window.$("#consultation").modal("show");
      }else{
        window.$('#information').modal('show')
      }
      }
      
    }else{
        window.$('#notice').modal('show');
    }
    
  }

 
  // handleSelect = (info) => {
  //   console.log(info)
  //   let list_consultation = [];

  //   this.setState({ date: info.startStr });
  //   let now = new Date().getTime();
  //   let time = new Date(info.startStr).getTime();
  //   // if(now){
  //   //   //window.$('#notice').modal('show')
  //   // }else{
  //     axios
  //     .get(API_URL + "consultation/doctor/" + this.props.match.params.id)
  //     .then((res) => {
  //        console.log(res.data)
  //       let consultation = res.data.filter(
  //         (item) => item.date === info.startStr
  //       );
  //       //     console.log(consultation);
      
  //       consultation.map((startTime, index) => {
  //         list_consultation.push(startTime.start);
  //       });
  //       console.log(list_consultation);
  //       this.setState({ list_consultation: consultation });
  //     });
  //   axios
  //     .get(API_URL + "schedule/doctor/" + this.props.match.params.id)
  //     .then((res) => {
  //       //console.log(res.data[0].date)
  //       //console.log(Moment(res.data[0].date).format("dd-mm-yyyy"))
  //       let schedule = res.data.filter((item) => item.date === info.startStr);
  //       //console.log(schedule)
  //      // if (schedule[0]) {
         
  //         console.log(schedule[0].schedule);
  //         this.setState({ start: schedule[0].schedule });
  //         let arr = list_consultation.concat(schedule[0].schedule);
  //       const sorted_arr = arr.sort((a, b) => ("" + a).localeCompare(b));

  //       let result = [];
  //       for (let i = 0; i < arr.length; i++) {
  //         if (
  //           sorted_arr[i] !== sorted_arr[i - 1] &&
  //           sorted_arr[i] !== sorted_arr[i + 1]
  //         ) {
  //           result.push(sorted_arr[i]);
  //         }
  //       }
  //       console.log(result)
  //       let result1 = result.filter((item) => (new Date(item).getTime()) > (new Date().getTime()))
  //       console.log(result1)
  //       this.setState({list_schedule: result1})
  //       window.$("#consultation").modal("show");
  //       // } else {
  //       //     window.$('#information').modal('show')
  //       // }  
  //     });
  // // }
  //   // console.log(this.state.date)
   
  // };
 
  render() {
    const { information } = this.state;
    const {data_consultation} = this.state;
    console.log(data_consultation)
    //let list_user = data_consultation.filter((item) => item.status === 'done');
    // let user = list_user.filter((item) => item.patientId === cookies.get('id_user'));
    // this.setState({patient: user[0].patientId})
    // console.log(this.state.patient)
    return (
      <div className="col col-md-10 center">
        <div className="row mt-5">
          <div className="col col-1 mr-5">
            <img
              className="rounded-circle "
              src={information.avatar}
              height="150"
              width="150"
            />
          </div>
          <div className="col col-10 mt-2">
            <h3 className="h4">
              {information.qualification}&nbsp;{information.fullname}
            </h3>
            <p className="department mb-2">
              Phone: <span className="info-item">{information.phone}</span>
            </p>
            <p className="department mb-2">
              Email: <span className="info-item">{information.email}</span>
            </p>
            <p className="department mb-2">
              Department:{" "}
              <span className="info-item">{information.department}</span>
            </p>
            <p className="department">
              Workplace:{" "}
              <span className="info-item">{information.workplace}</span>
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <div className="col col-lg-8">
            <div className="info-doctor p-3">
              <h2>
                 Doctor Nguyen A
              </h2>
              <ul>
                <li>
                  -  Doctor of Dermatology
                </li>
                <li>- Graduated from Hanoi Medical University (1977)</li>
                <li>
                  - Doctor who used to work at the Central Hospital of
                  Dermatology
                </li>
                <li>- Lecturer in Dermatology at Hanoi </li>
                <li>
                  - Medical UniversityFormer Head of Directing Department at
                  Central Dermatology Hospital
                </li>
                <li>
                  - Associate Professor, Doctor, Senior Doctor of Dermatology
                </li>
                <li>- Graduated from Hanoi Medical University (1977)</li>
                <li>
                  - Doctor who used to work at the Central Hospital of
                  Dermatology
                </li>
                <li>- Lecturer in Dermatology at Hanoi </li>
                <li>
                  - Medical UniversityFormer Head of Directing Department at
                  Central Dermatology Hospital
                </li>
              </ul>
              <h2>Associate Professor of examination and treatment</h2>
              <ul>
                <li>- Psoriasis treatment</li>
                <li>- Curing hair loss</li>
                <li>- Cure atopic dermatitis</li>
                <li>- Psoriasis treatment</li>
                <li>- Curing hair loss</li>
                <li>- Cure atopic dermatitis</li>
              </ul>
              <hr />
              <h2>Patient feedback after consultation</h2>
              <div className="feedback p-2 mt-2">
                
                <div className="info-feedback">
                  <h5>Nguyen Thi A </h5>
                  <span className="date-feed">
                    <i className="fas fa-check-circle"></i> Checked on 2021-11-29
                  </span>
                </div>
                <p>Everything is Good and attentive</p>
              </div>
              <div className="feedback p-2 mt-2">
                <div className="info-feedback">
                  <h5>Nguyen Thi A </h5>
                  <span className="date-feed">
                    <i className="fas fa-check-circle"></i> Checked on 2021-11-29
                  </span>
                </div>
                <p>Everything is Good and attentive</p>
              </div>
            </div>
          </div>
          <div className="col col-md-4">
            <div className="schedule p-3">
              <p className="title-schedule p-2 mb-3">SCHEDULE </p>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                selectable={true}
                select={this.handleSelect}
                events={[]}
              />
              <p className="mt-3 text-danger">Working time from Monday to Friday: 08:00 am - 11:00 am and 02:00 pm - 05:00 pm </p>
              <p className="mt-3 h5">
                Choose date and book a consultation
              </p>
            </div>
            <ConsultationModal
              date={this.state.date}
              list_schedule={this.state.list_schedule}
              doctorId= {this.props.match.params.id}
            />
            <InfoModal />
            <NoticeModal />
            <OffModal />
          </div>
        </div>
      </div>
    );
  }
}
export default DetailDoctor;
