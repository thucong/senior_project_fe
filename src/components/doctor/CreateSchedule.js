import FullCalendar from "@fullcalendar/react";
import React,{ Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import { withRouter } from "react-router-dom";
import Moment from "moment";
const cookies = new Cookies();
class CreateSchedule extends Component{
    constructor(props){
        super(props);
        this.state = {
            list_schedule: "",
            noti : false
        }
    }
    handleSelect = (info) => {
        //console.log(info.startStr)
        this.props.choiceDate(info.startStr);
        let day = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let time = new Date(`${year}-${month + 1}-${day}`).getTime();
        let time_choose = new Date(info.startStr).getTime();
        if(time_choose > time) {
            this.props.history.push("/create")
        }else{
            this.setState({noti: true})
        }
        
    }
    componentDidMount() {
        axios.get(API_URL + "schedule/doctor/" + cookies.get('id_user'),  {  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
            this.setState({list_schedule: res.data});
        //    res.data.map((list, index) => {
        //        this.setState({list_schedule: list})
        //    })
        })
    }
    render(){
        const {list_schedule} = this.state;
        console.log(list_schedule)
        return(
            <div>
                 {this.state.noti === true ? (
            <p className="text-danger h4 mt-1 mb-2">Lịch đã quá hạn!</p>
          ) : (
            ""
          )}
                <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                selectable={true}
                select={this.handleSelect}
                events={
                   list_schedule.length > 0 ? list_schedule.map((schedule, index) => (
                        { start : `${schedule.schedule}`}
                   )) : ""
                }/>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
      choiceDate: (date) => {
        return dispatch(actions.choiceDate(date));
      },
    };
  };
export default connect(null, mapDispatchToProps)(withRouter(CreateSchedule));