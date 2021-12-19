import React,{ Component } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Cookies from "universal-cookie";
import { API_URL } from "../../constants/ApiUrl";
import axios from "axios";
import MyTopicItem from "./MyTopicItem";
import EditQuestion from "../user/EditQuestion";
import DeleteQuestion from "../user/DeleteQuestion";

const cookies = new Cookies();
class MyTopic extends Component{
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
        axios({ method: "GET", url: API_URL + "topic/my/" +  cookies.get('id_user') }).then((res) => {
          if (res) {
            this.setState({ topics: res.data });
          }
        });
      }
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
    render(){
        const topics = this.state.topics;
        return(
            <div className="col-lg-8 mt-3">
            {topics.length > 0
              ? topics.map((topic, index) => (
                  <MyTopicItem key={index} topic={topic} update={(e) => this.onUpdate(topic._id)} delete={(e) => this.onDelete(topic._id)} />
                ))
              : ""}
              <EditQuestion info_topic={this.state.info_topic}/>
              <DeleteQuestion choice_delete={this.state.choice_delete} />    
          </div>
        )
    }
}
export default MyTopic