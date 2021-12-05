import React, { Component } from "react";
import Cookies from "universal-cookie";
import ListHospital from "../components/common/ListHospital";
import TopicList from "../components/common/TopicList";
import AddQuestion from "../components/user/AddQuestion";

const cookies = new Cookies();
class Topic extends Component {
  onAdd = (e) => {
    if (cookies.get("role") === "patient") {
      window.$("#addQuestion").modal("show");
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <div className="col col-md-10 center mt-5">
        {cookies.get("role") === "doctor" ? (
          ""
        ) : (
          <div className="">
            <button className="btn btn-success" onClick={this.onAdd}>
              Add your question
            </button>
          </div>
        )}
        <div className="row">
          <TopicList />
          <ListHospital />
        </div>
        <AddQuestion />
      </div>
    );
  }
}
export default Topic;
