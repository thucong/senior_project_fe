import React,{ Component } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import Cookies from "universal-cookie";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import { withRouter } from "react-router-dom";
const cookies = new Cookies();
class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: [],
            list_schedule:'',
            name:''
        }
    }
    componentDidMount(){
        axios.get(API_URL + "user/" + cookies.get("id_user"),{  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
            this.setState({
                name: res.data[0].fullname,
              });
        })
        // axios.get(API_URL + "schedule/doctor/" +cookies.get("id_user") ).then((res) => {
        //         let schedule = res.data.find((item) => item.date = this.props.choice_date);
        //         console.log(schedule)
        //         if(schedule) {
        //           this.setState({time: res.data[0].schedule})
        //         }
        //     })
       
    }
    onChangeTime = (time) => {
        this.setState({time})
    }
    onSubmit = (e) => {
      e.preventDefault();
      let schedule = this.props.choice_date + " " +this.state.time;
      let date = this.props.choice_date;
      let doctorId = cookies.get("id_user");
      axios.post(API_URL + "schedule", {date,schedule,doctorId}).then(res => {
        if(res.status === 200){
          this.props.history.push("/profile")
        }
      })
    }
    onCancel = () => {
      this.props.history.push("/profile")
    }
    render(){
        let ref = React.createRef();
        console.log(this.state.time)
        console.log(this.props.choice_date)
        console.log(this.props.list_time)
        console.log(this.state.list_schedule)
        return(
            <div className="col-5 p-4 mb-5 profile mt-3 center">
                 <form className="mt-2" onSubmit={this.onSubmit}>
                     <h1 className="h1 mb-3">Create Schedule</h1>
                    <div className="form-group">
                       Doctor's name:
                        <input type="text" className="form-control mt-3" value={this.state.name} readOnly></input>
                    </div>
                    <div className="form-group">
                        Date
                        <input type="text" className="form-control mt-3" value={this.props.choice_date} readOnly></input>
                    </div>
                    <div className="form-group">
                        Choose time
                        <Typeahead
                      id="public-methods-example"
                      name="time"
                      className="mt-2"
                      labelKey="name"
                      multiple
                      options={this.props.list_time}
                      placeholder="Please choose time"
                      ref={ref}
                      onChange={this.onChangeTime}
                      selected={this.state.time}
                  />
                    </div>
                    <div className="create-schedule">
                    <button type="submit" className="btn btn-secondary  mt-4" onClick={this.onCancel}>Cancel</button>&emsp;
                    <button type="submit" className="btn btn-success  mt-4" onClick={this.onSubmit}>Save</button>
                    </div>
                     
                   
                   
                </form>
                {/* <h1>Create Schedule</h1>
                <h2>Doctor's name: </h2>
                <h2>Date: </h2>
                <h2>Choose schedule</h2>
                <Typeahead
                      id="public-methods-example"
                      name="schedule"
                      className="mt-2"
                      labelKey="name"
                      multiple
                      options={this.props.list_time}
                      placeholder="Please choose schedule"
                      ref={ref}
                      onChange={this.onChangeTime}
                      selected={this.state.time}
                  /> */}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      list_time : state.list_time,
      choice_date: state.choice_date,
    }
  }
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onChangeTime: (time) => {
        dispatch(actions.changeTime(time))
      },
      fetchListTime : () => {
        dispatch(actions.fetchListTime())
      },
      choiceDate: (date) => {
        return dispatch(actions.choiceDate(date));
      },
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create));