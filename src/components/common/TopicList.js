import axios from "axios";
import React, { Component } from "react";
import TopicItem from "./TopicItem";
import { API_URL } from "../../constants/ApiUrl";
import Aos from "aos";
import "aos/dist/aos.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    Aos.init({ duration: 1000 });
  }
  componentWillMount() {
    axios({ method: "GET", url: API_URL + "topic" }).then((res) => {
      if (res) {
        this.setState({ topics: res.data });
      }
    });
  }
  render() {
    const topics = this.state.topics;
    return (
      <div className="col-lg-8 mt-3">
        {topics.length > 0
          ? topics.map((topic, index) => (
              <TopicItem key={index} topic={topic} />
            ))
          : ""}
      </div>
    );
  }
}
export default TopicList;
