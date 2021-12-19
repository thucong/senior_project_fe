import React, { Component } from "react";
import Cookies from "universal-cookie";
import ListHospital from "../components/common/ListHospital";
import TopicList from "../components/common/TopicList";
import AddQuestion from "../components/user/AddQuestion";
import MyTopic from "../components/user/MyTopic";

const cookies = new Cookies();
class Topic extends Component {
  constructor(props){
    super(props);
    this.state ={
      choose_all: true,
      choose_my: false
    }
  }
  onAdd = (e) => {
    if (cookies.get("role") === "patient") {
      window.$("#addQuestion").modal("show");
    } else {
      this.props.history.push("/login");
    }
  };
  all = () => {
    this.setState({choose_all: true})
    this.setState({choose_my: false})
  }
  my = () => {
    this.setState({choose_my: true})
    this.setState({choose_all: false})
  }
  render() {
    return (
      <div className="col col-md-10 center mt-5">
        {cookies.get("role") === "doctor" ? (
          ""
        ) : (
       
             <div className="">
            <button className="btn btn-success" onClick={this.onAdd}>
              Add question
            </button>
          </div>
        
        )}
        {cookies.get("role") === "patient" ? (
           <div className="mt-3 mb-2 choose_question">
           <span className={this.state.choose_all === true ? 'color_question' : ''} onClick={this.all}>All question</span> | <span className={this.state.choose_my === true ? 'color_question' : ''} onClick={this.my}>My question</span>
           </div>
        ) : ''}
         
        <div className="row">
          {this.state.choose_all === true ? <TopicList /> : ""}
          {this.state.choose_my === true ? <MyTopic /> : ""}
          <ListHospital />
        </div>
        <AddQuestion />
      </div>
    );
  }
}
export default Topic;
