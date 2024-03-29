import React,{ Component } from "react";
import HospitalContent from "../../components/admin/hospital/HospitalContent";
import SideBar from "../../components/admin/SideBar";

class IndexHospital extends Component{
    render(){
        document.body.style.backgroundColor = "white";
        return(
            <div className="row mx-0">
                <SideBar />
                <HospitalContent/>
            </div>
        )
    }
}
export default IndexHospital