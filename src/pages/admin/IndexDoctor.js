import React,{ Component } from "react";
import DoctorContent from "../../components/admin/doctor/DoctorContent";
import SideBar from "../../components/admin/SideBar";

class IndexDoctor extends Component{
    render(){
        document.body.style.backgroundColor = "white";
        return(
            <div className="row mx-0">
                <SideBar />
                <DoctorContent/>
            </div>
        )
    }
}
export default IndexDoctor