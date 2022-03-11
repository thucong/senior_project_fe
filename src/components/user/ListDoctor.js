import axios from "axios";
import React,{ Component } from "react";
import { API_URL } from "../../constants/ApiUrl";

class ListDoctor extends Component{
    constructor(props){
        super(props);
        this.state = {
            list_doctor: []
        }
    }
    componentDidMount(){
        axios.get(API_URL + "user").then((res) => {
            let doctors = res.data.filter((item) => item.role === "doctor");
            this.setState({list_doctor: doctors})
        })
    }
    chooseDoctor = (id) => {
        window.open("/doctor/"+id , "_blank");
    }
    render(){
        const {list_doctor} = this.state;
        return(
            <div className="col col-md-3 mt-5 overflow-auto doctors">
                <h3 className="h3 border-bottom mb-3 left-text">Danh sách bác sĩ</h3>
                {list_doctor.length > 0 ? (list_doctor.map((doctor, index) => (
                     <div className=" row list-doctor p-3 mb-3" onClick={(e) =>this.chooseDoctor(doctor._id)} key={index}>
                     {/* <img className="rounded-circle mb-2" src={doctor.avatar} height="100" width="100" />
                     <h4 className="name-doctor">{doctor.qualification} {doctor.fullname}</h4>
                     <p className="mt-1">{doctor.department}</p> */}
                     <div className="col col-2">
            <img className="rounded-circle " src={doctor.avatar} height="80" width="80" alt="" />
          </div>
          <div className="col col-10 info-consultation pl-5">
            <h4 className="name-doctor">{doctor.fullname}</h4>
            <p className="mt-1">Khoa: {doctor.department}</p>
          </div>
                 </div>
                ))) : ""}
            </div>
        )
    }
}
export default ListDoctor