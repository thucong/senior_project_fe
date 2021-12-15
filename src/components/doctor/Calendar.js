import FullCalendar from "@fullcalendar/react";
import React,{ Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";
import Moment from "moment";
import ReplyModal from './ReplyModal';
import ListConsultation from './ListConsultation'
const cookies = new Cookies();
class Calendar extends Component{
    constructor(props){
        super(props);
        this.state ={
            list_consultation: '',
            list_wait: '',
            info_consultation:'',
            schedule:''
        }
    }
    
    componentDidMount(){
        axios.get(API_URL + "consultation/doctor/" + cookies.get('id_user')).then((res) => {
            let confirm = res.data.filter((item) => (item.status === 'confirmed' || item.status ==='done'))
            this.setState({list_consultation: confirm});
            let wait = res.data.filter((item) => item.status === 'waiting');
            this.setState({list_wait: wait})
        })
    }
    onReply = (id) => {
       axios.get(API_URL + "consultation/" + id).then((res) => {
            this.setState({info_consultation: res.data[0]})
       })
       console.log(this.state.info_consultation)
        window.$('#reply').modal('show')
    }
    handleSelect = (info) => {
        console.log(info)
        let data = this.state.list_consultation.filter((item) => item.date === info.startStr)
        this.setState({schedule: data});
        window.$('#list_consultation').modal('show');
    }
    render(){
        const {list_consultation, list_wait} = this.state;
        console.log(this.state.list_consultation)
        console.log(list_wait)
        return(
            <div>
                {list_wait.length > 0 ? (
                    <div className="col col-lg-10 center mt-5">
                        <div className="row ">
                         <div className="col col-lg-8 ">
                    <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    selectable={true}
                    select={this.handleSelect}
                    events={
                        list_consultation.length > 0 ? list_consultation.map((consultation, index) => (
                            {'title': `consultation with ${consultation.patientId.fullname}`, 'start': consultation.start, 'end': consultation.end}
                        )) : ""
                    }/>
                </div>
                <div className="col-md-4 pl-5">
                    <h3 className="h3 border-bottom mb-3 center-text">List of consultations to confirm</h3>
                     {list_wait.map((wait, index) => (
                    <div className="row mb-3 consultation_doctor p-3" key={index} onClick={(e) => this.onReply(wait._id)}>          
                        <div className="col col-2">
                            <img className="mx-auto " src={wait.patientId.avatar} height="100" width="100"/>
                        </div>
                        <div className="col col-8 info-consultation pl-5">
                            <p>Patient's name: <span className="info-item">{wait.patientId.fullname}</span></p>
                            <p>Date: <span className="info-item">{wait.date}</span></p>
                            <p>Time: <span className="info-item">{Moment(wait.start).format(' hh:mm a')} - {Moment(wait.end).format(' hh:mm a')}</span></p>
                        </div>
                    </div>
                     ))}
                </div>
                    </div>
                    </div>
                    
                   
                ) : (
                    <div className="col col-lg-10 center mt-5">
                <FullCalendar plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                selectable={true}
                select={this.handleSelect}
                events={
                    list_consultation.length > 0 ? list_consultation.map((consultation, index) => (
                        {'title': `consultation with ${consultation.patientId.fullname}`, 'start': consultation.start, 'end': consultation.end}
                    )) : ""
                }/>
            </div>
                )}
                <ReplyModal info_consultation={this.state.info_consultation}/>
                <ListConsultation schedule={this.state.schedule}/>
            </div>
           
        )
    }
}
export default Calendar;