import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";

class ListHospital extends Component {
    constructor(props){
        super(props);
        this.state ={
            hospital : []
        }
    }
    componentDidMount(){
        axios.get(API_URL + "hospital").then((res) => {
            if(res.status === 200){
                this.setState({hospital: res.data})
            }
        })
    }
  render() {
      const {hospital} = this.state;
    return (
      <div className="col-md-4 d-none d-sm-none d-md-none d-lg-block mt-3 hospital">
        <div className="container sticky-top advertisement">
          <div className="card border-0">
            <div className="card-body">
              <p className="card-title text-center hospital-title">
                List of hospital phone numbers
              </p>
              <div className="table-hospital overflow-auto">
              <table class="table list-hospital ">
                <tbody>
                    {hospital.length > 0 ? (hospital.map((hos, index) => (
                         <tr key={index}>
                         <td className="name">{hos.name}</td>
                         <td className="phone">{hos.phone}</td>
                       </tr>
                    ))) : ""}
                </tbody>
              </table>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ListHospital;
