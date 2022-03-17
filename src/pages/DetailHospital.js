import axios from "axios";
import React,{ Component } from "react";
import { API_URL } from "../constants/ApiUrl";

class DetailHospital extends Component{
    constructor(props){
        super(props);
        this.state = {
            info_hospital: ''
        }
    }

    componentDidMount(){
        axios.get(API_URL + "hospital/" + this.props.match.params.id).then((res) => {
            this.setState({info_hospital: res.data[0]})
        })
    }
    render(){
        const {info_hospital} = this.state;
        return(
            <div className="col col-md-10 center">
                <div className="row mt-5">
                    <div className="col col-1 mr-5">
                        <img
                        className=" "
                        src={info_hospital.image}
                        height="150"
                        width="150"
                        alt=""
                        />
                    </div>
                    <div className="col col-10 mt-2">
                        <h3 className="h4">
                        {info_hospital.name}
                        </h3>
                        <p className="department mb-2">
                        Số điện thoại: <span className="info-item">{info_hospital.phone}</span>
                        </p>
                        <p className="department mb-2">
                        Email: <span className="info-item">{info_hospital.email}</span>
                        </p>
                        <p className="department mb-2">
                        Địa chỉ: <span className="info-item">{info_hospital.address}, {info_hospital.provinceOrCity}</span>
                        </p>
                    </div>
                </div>
                <hr />
                <div className="row mt-3">
                    <div className="col col-lg-8">
                        {/* <div className="info-doctor p-3">
                            {info_hospital.description}
                        </div> */}
                        <div className="editor info-doctor p-3 lh-24" dangerouslySetInnerHTML={{__html:info_hospital.description}}/>
                    </div>
                    {/* <div className="col col-md-4">
                         <div className="schedule p-3">
                             <p className="title-schedule p-2 mb-3">GOOGLE MAP</p>
              
                         </div>
                     </div> */}
                </div>
            </div>
        )
    }
}
export default DetailHospital