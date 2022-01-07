import axios from "axios";
import React, { Component } from "react";
import TopicItem from "./TopicItem";
import { API_URL } from "../../constants/ApiUrl";
import Aos from "aos";
import "aos/dist/aos.css";
import Cookies from "universal-cookie";
import EditQuestion from "../user/EditQuestion";
import DeleteQuestion from "../user/DeleteQuestion";

const cookies = new Cookies();
class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      choice_delete: '',
      info_topic:''
      
    };
    Aos.init({ duration: 1000 });
  }
  componentDidMount() {
    axios({ method: "GET", url: API_URL + "topic" }).then((res) => {
      if (res) {
        this.setState({ topics: res.data });
      }
    });
  }
  // all = () => {
  //   this.setState({choose_all: true})
  //   this.setState({choose_my:false})
  //   axios({ method: "GET", url: API_URL + "topic" }).then((res) => {
  //     if (res) {
  //       this.setState({ topics: res.data });
  //     }
  //   });
  //   window.location.reload();
  // }
  // my = () => {
  //   this.setState({choose_all: false})
  //   this.setState({choose_my: true})
  //   axios.get(API_URL + "topic/my/" +  cookies.get('id_user')).then((res) => {
  //     this.setState({topics:res.data})
  // })
  // window.location.reload();
  // }
  onUpdate = async (id) => {
    await axios.get(API_URL + "topic/" + id).then((res) => {
      this.setState({info_topic: res.data[0]})
    })
    //console.log(this.state.info_topic)
    window.$('#editQuestion').modal('show')
  }
  onDelete = (id) => {
    this.setState({choice_delete:id});
    window.$('#deleteQuestion').modal('show');
    
    //console.log(this.state.choice_delete)
  }
  render() {
    const topics = this.state.topics;
    return (
      <div className="col-lg-8 mt-3">
        
        
        {topics.length > 0
          ? topics.map((topic, index) => (
              <TopicItem key={index} topic={topic} update={(e) => this.onUpdate(topic._id)} delete={(e) => this.onDelete(topic._id)}/>
            ))
          : ""}
         <EditQuestion info_topic={this.state.info_topic}/>
         <DeleteQuestion choice_delete={this.state.choice_delete} />
      </div>
    );
  }
}
export default TopicList;
