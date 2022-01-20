import React,{ Component } from "react";
import EditQuestion from "../user/EditQuestion";
import DeleteQuestion from "../user/DeleteQuestion";
import TopicItem from "./TopicItem";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Aos from "aos";
import "aos/dist/aos.css";

class TopicSearch extends Component{
    constructor(props) {
        super(props);
        this.state = {
          topics: [],
          choice_delete: '',
          info_topic:'',
          page: 1 ,
          loading: false,
          count_topic: 0,
          
        };
        Aos.init({ duration: 1000 });
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
      const topics = this.props.topic_search;
        return (
            <div className="col-lg-8 mt-3">
              {topics.length > 0
                ? topics.map((topic, index) => (
                    <TopicItem key={index} topic={topic} update={(e) => this.onUpdate(topic._id)} delete={(e) => this.onDelete(topic._id)}/>
                  ))
                : <p className="text-danger h3 mt-3">Sorry, we couldn't find any results for your search!</p>}
              <EditQuestion info_topic={this.state.info_topic}/>
              <DeleteQuestion choice_delete={this.state.choice_delete} />
           </div>
        )
    }
}
export default TopicSearch