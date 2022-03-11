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
      data_consultation: "",
      data_schedule: "",
      time_present: "",
      patient: "",
      list_consultation_user: "",
      avatar: "",
      content: "",
      list_feedback: "",
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "user/" + this.props.match.params.id, {  headers: { Authorization: `Bearer ${cookies.get("token")}` }})
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data1) => data1[0])
      .then((data) => {
        this.setState({ information: data });
      });
    axios
      .get(API_URL + "consultation/doctor/" + this.props.match.params.id,  {  headers: { Authorization: `Bearer ${cookies.get("token")}` }})
      .then((res) => {
        this.setState({ data_consultation: res.data });
      });
    axios
      .get(API_URL + "schedule/doctor/" + this.props.match.params.id)
      .then((res) => {
        this.setState({ data_schedule: res.data });
      });
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let time = new Date(`${year}-${month + 1}-${day}`).getTime();
    this.setState({ time_present: time });
    axios
      .get(API_URL + "consultation/patient/" + cookies.get("id_user"), {  headers: { Authorization: `Bearer ${cookies.get("token")}` }})
      .then((res) => {
        let consultation_patient = res.data.filter(
          (item) => item.doctorId._id === this.props.match.params.id
        );
        let data = consultation_patient.filter(
          (item) => item.status === "done"
        );
        this.setState({ patient: data });
        //console.log(this.state.patient);
      });
    axios.get(API_URL + "user/" + cookies.get("id_user"), {  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
      if (res.data[0].avatar !== "") {
        this.setState({ avatar: res.data[0].avatar });
      }
    });
    axios
      .get(API_URL + "feedback/doctor/" + this.props.match.params.id)
      .then((res) => {
        this.setState({ list_feedback: res.data });
      });
  }
  handleSelect = (info) => {
    this.setState({ date: info.startStr });
    let time_choose = new Date(info.startStr).getTime();
    let time_day = new Date(info.startStr).getDay();
    console.log(time_day);
    if (time_choose >= this.state.time_present) {
      // if (time_day === 0 || time_day === 6) {
      //   window.$("#off").modal("show");
      // } else {
        let list_consultation = [];
        const { data_consultation, data_schedule } = this.state;
        let consultation = data_consultation.filter(
          (item) => item.date === info.startStr
        );
        consultation.map((startTime, index) => {
          list_consultation.push(startTime.start);
        });
        this.setState({ list_consultation: consultation });
        let schedule = data_schedule.filter(
          (item) => item.date === info.startStr
        );
        if (schedule[0]) {
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
         // console.log(result);
          let result1 = result.filter(
            (item) => new Date(item).getTime() > new Date().getTime()
          );
          //console.log(result1);
          this.setState({ list_schedule: result1 });
          window.$("#consultation").modal("show");
        } else {
          window.$("#information").modal("show");
        }
      //}
    } else {
      window.$("#notice").modal("show");
    }
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    let content = this.state.content;
    let doctorId = this.props.match.params.id;
    let patientId = cookies.get("id_user");
    axios.post(API_URL + "feedback", {
      content: content,
      doctorId: doctorId,
      patientId: patientId,
    }, {headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
      window.location.reload();
    })
  };
  render() {
    const { information } = this.state;
    //const { data_consultation } = this.state;
    //console.log(data_consultation);

    return (
      <div className="col col-md-10 center">
        <div className="row mt-5">
          <div className="col col-1 mr-5">
            <img
              className="rounded-circle "
              src={information.avatar}
              height="150"
              width="150"
              alt=""
            />
          </div>
          <div className="col col-10 mt-2">
            <h3 className="h4">
              {information.qualification}&nbsp;{information.fullname}
            </h3>
            <p className="department mb-2">
              Số điện thoại: <span className="info-item">{information.phone}</span>
            </p>
            <p className="department mb-2">
              Email: <span className="info-item">{information.email}</span>
            </p>
            <p className="department mb-2">
              Khoa:{" "}
              <span className="info-item">{information.department}</span>
            </p>
            <p className="department">
              Nơi làm việc:{" "}
              <span className="info-item">{information.workplace}</span>
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-3">
          <div className="col col-lg-8">
          
            <div className="info-doctor p-3">
            <div className="editor lh-24" dangerouslySetInnerHTML={{__html:information.experience}}/>
              {/* <h2>Doctor Nguyen A</h2>
              <ul>
                <li>- Doctor of Dermatology</li>
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
              </ul> */}
              <hr />
              <h2>Phản hồi của bệnh nhân</h2>
              <div className=" p-2 mt-2">
                {this.state.patient.length > 0 ? (
                  <div className="feedback">
                    <div className="row  pl-2 ">
                      <div className="mt-3">
                        <img
                          className="rounded-circle"
                          src={this.state.avatar}
                          width="40px"
                          height="40px"
                          alt=""
                        ></img>
                      </div>
                      <div className="ml-2 mt-3 send_feed">
                        <input
                          type="text"
                          placeholder="Viết phản hồi"
                          value={this.state.content}
                          className="bg text-reply p-2"
                          name="content"
                          onChange={this.onChange}
                        />
                        <button
                          className="btn btn-success mt-1 ml-3"
                          onClick={this.onSubmit}
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="info-feedback mt-2 feedback">
                  <h5>Nguyen Thi A </h5>
                  <span className="date-feed">
                    <i className="fas fa-check-circle"></i> Checked on 2021-11-29
                  </span>
                </div>
                <p>Everything is Good and attentive</p> */}
              </div>
              {this.state.list_feedback.length > 0
                ? this.state.list_feedback.map((feedback, index) => (
                    <div className="feedback p-2 mt-2" key={index}>
                      <div className="info-feedback">
                        <h5>{feedback.patientId.fullname}</h5>&nbsp;
                        <span className="date-feed">
                          {Moment(feedback.createdAt).format("YYYY-MM-DD")}
                        </span>
                      </div>
                      <p>{feedback.content}</p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="col col-md-4">
            <div className="schedule p-3">
              <p className="title-schedule p-2 mb-3">Lịch trình</p>
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                selectable={true}
                select={this.handleSelect}
                events={[]}
              />
              {/* <p className="mt-3 text-danger">
                Working time from Monday to Friday: 08:00 am - 11:00 am and
                02:00 pm - 05:00 pm{" "}
              </p> */}
              <p className="mt-3 h5">Chọn ngày và đặt cuộc tư vấn</p>
            </div>
            <ConsultationModal
              date={this.state.date}
              list_schedule={this.state.list_schedule}
              doctorId={this.props.match.params.id}
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
