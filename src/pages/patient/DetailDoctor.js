import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import ConsultationModal from "../../components/user/ConsultationModal";
import Moment from "moment";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: {},
      date: "",
      start: "",
      list_schedule: "",
      list_consultation: "",
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
  }
  // handleDateClick = (arg) => { // bind with an arrow function
  //     alert(arg.dateStr)
  //   }
  handleSelect = (info) => {
    let list_consultation = [];

    this.setState({ date: info.startStr });
    // console.log(this.state.date)
    axios
      .get(API_URL + "consultation/doctor/" + this.props.match.params.id)
      .then((res) => {
         console.log(res.data)
        let consultation = res.data.filter(
          (item) => item.date === info.startStr
        );
        //     console.log(consultation);

        consultation.map((startTime, index) => {
          list_consultation.push(startTime.start);
        });
        console.log(list_consultation);
        this.setState({ list_consultation: consultation });
      });
    axios
      .get(API_URL + "schedule/doctor/" + this.props.match.params.id)
      .then((res) => {
        //console.log(res.data[0].date)
        //console.log(Moment(res.data[0].date).format("dd-mm-yyyy"))
        let schedule = res.data.filter((item) => item.date === info.startStr);
        //console.log(schedule)
        if (schedule[0]) {
          window.$("#consultation").modal("show");
          console.log(schedule[0].schedule);
          this.setState({ start: schedule[0].schedule });
          let arr = list_consultation.concat(schedule[0].schedule);
        const sorted_arr = arr.sort((a, b) => ("" + a).localeCompare(b));

        let result = [];
        for (let i = 1; i < arr.length; i++) {
          if (
            sorted_arr[i] !== sorted_arr[i - 1] &&
            sorted_arr[i] !== sorted_arr[i + 1]
          ) {
            result.push(sorted_arr[i]);
          }
        }
        this.setState({list_schedule: result})
        } else {

        }  
      });
  };
  render() {
    const { information } = this.state;
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
                Associate Professor, Doctor, Senior Doctor Nguyen Duy Hung
              </h2>
              <ul>
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
                  <h5>Nguyen Thi A </h5>{" "}
                  <span className="date-feed">
                    <i class="fas fa-check-circle"></i> Checked on October 29,
                    2021
                  </span>
                </div>
                <p>Everything is Good and attentive</p>
              </div>
              <div className="feedback p-2 mt-2">
                <div className="info-feedback">
                  <h5>Nguyen Thi A </h5>{" "}
                  <span className="date-feed">
                    <i class="fas fa-check-circle"></i> Checked on October 29,
                    2021
                  </span>
                </div>
                <p>Everything is Good and attentive</p>
              </div>
            </div>
          </div>
          <div className="col col-md-4">
            <div className="schedule p-3">
              <p className="title-schedule p-2 mb-3">SCHEDULE EXAMINATION</p>
              {/* <select className="select-choose">
                            <option>Monday - 06-Dec-2021</option>
                        </select>
                        <div className="mt-3">
                        <button className="time-schedule m-3">8:00 - 8:30</button>
                        <button className="time-schedule m-3">8:30 - 9:00</button>
                        <button className="time-schedule m-3">9:00 - 9:30</button>
                        <button className="time-schedule m-3">9:30 - 10:00</button>
                        </div> */}
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                selectable={true}
                select={this.handleSelect}
                //  dateClick={this.handleDateClick}
                events={[
                  {
                    title: "event 1",
                    start: "2021-12-08 18:00",
                    end: "2021-12-08 19:00",
                  },
                  //   { title: 'event 2', date: '2021-12-08 07:00' },
                  //   { title: 'event 3', date: '2021-12-08 23:00' }
                ]}
              />
              <p className="mt-3 h5">
                Choose <i class="far fa-hand-point-up"></i> and book a
                consultation
              </p>
            </div>
            <ConsultationModal
              date={this.state.date}
              list_schedule={this.state.list_schedule}
              doctorId= {this.props.match.params.id}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default DetailDoctor;
