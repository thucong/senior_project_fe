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
            <div className="col col-md-3 mt-5 ml-3 overflow-auto doctors">
                {list_doctor.length > 0 ? (list_doctor.map((doctor, index) => (
                     <div className="list-doctor p-3 mb-3" onClick={(e) =>this.chooseDoctor(doctor._id)} key={index}>
                     <img className="rounded-circle mb-2" src={doctor.avatar} height="100" width="100" />
                     <h4 className="name-doctor">{doctor.qualification} {doctor.fullname}</h4>
                     <p className="mt-1">{doctor.department}</p>
                 </div>
                ))) : ""}
               
                {/* <div className="list-doctor p-3">
                    <img className="rounded-circle mb-2" src="https://bacsigiadinh.top/wp-content/uploads/2020/05/doctor_female_noavatar.png" height="100" width="100" />
                    <h4 className="name-doctor">Master, Doctor Truong Thi Minh Huong</h4>
                    <p className="mt-1">Dermatology</p>
                </div> */}
            </div>
        )
    }
}
export default ListDoctor