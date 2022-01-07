import React,{ Component } from "react";
import ConsultationItem from "../../components/user/ConsultationItem";
import ListDoctor from "../../components/user/ListDoctor";

class Consultation extends Component{
    render(){
    return(
        <div className="col col-md-10 center">
            <div className="row">
            <ConsultationItem />
            <ListDoctor />
            </div>
        </div>
    )
    }
}
export default Consultation