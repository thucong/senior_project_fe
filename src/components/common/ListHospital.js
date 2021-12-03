import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ListHospital extends Component {
    constructor(props){
        super(props);
        this.state ={
            hospital : [],
            user: {}
        }
    }
    componentDidMount(){
        axios.get(API_URL + "hospital").then((res) => {
            if(res.status === 200){
                this.setState({hospital: res.data})
            }
        });
      let id_user = cookies.get('id_user');
      axios.get(API_URL + "user/" + id_user).then((res) => {
        if(res.status === 200){
          this.setState({user: res.data})
        }
      })
    }
  render() {
      const {hospital} = this.state;
      const {user} = this.state;
      console.log(user)
    return (
      <div className="col-md-4 d-none d-sm-none d-md-none d-lg-block mt-3 hospital">
        <div className="container sticky-top advertisement">
          <div className="card border-0">
            <div className="card-body">
              <p className="card-title text-center hospital-title">
                Hopital
              </p>
              <div className="table-hospital overflow-auto">
              <table className="table list-hospital ">
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
