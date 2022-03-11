import axios from "axios";
import React, { Component } from "react";
import TopicItem from "./TopicItem";
import { API_URL } from "../../constants/ApiUrl";
import Aos from "aos";
import "aos/dist/aos.css";
import EditQuestion from "../user/EditQuestion";
import DeleteQuestion from "../user/DeleteQuestion";
import loading_gif from "../../images/loader.gif";

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      choice_delete: '',
      info_topic:'',
      page: 1 ,
      loading: false,
      count_topic: 0,
      name:'',
      query:''
    };
    Aos.init({ duration: 1000 });
  }
  setListTopic = (page) => {
    if(page > 0) {
      this.setState({loading:true});
      axios({ method: "GET", url: API_URL + "topics?name="+this.props.name + "&query="+this.props.query + "&page="+page }).then((res) => {
        
          this.setState({ topics: res.data });
          this.setState({ loading: false });
      });
    }
  }
  setPage = (page) => {
    this.setState({ page: page });
    this.setState({ topics: [] });
    this.setListTopic(page);
  };
  setCountPage = () => {
    axios.get( API_URL + 
      "count?name=" + this.props.name + "&query=" +
      this.props.query 
    ).then((rs) => {
      this.setState({count_topic: rs.data});
    });
  };
  componentDidMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let page = params.get("page");
    if (!page) {
      page = 1;
    }
    this.setState({ page: page });
    this.setListTopic(this.state.page);
    this.setCountPage();
  }
  showPage = (page_count, page_choose) => {
    let result = null;
    if (page_count > 0) {
      const begin_page = +page_choose - 2 > 0 ? +page_choose - 2 : 1;
      const end_page =
        begin_page + 5 < page_count ? begin_page + 5 : page_count;
      const page_array = Array(end_page - begin_page + 1)
        .fill()
        .map((_, idx) => begin_page + idx - 1);
      result = page_array.map((page, index) => {
        return (
          <li
            className={
              page + 1 === +page_choose ? "page-item active" : "page-item"
            }
            key={page}
          >
            <button
              className="page-link"
              onClick={() => this.setPage(page + 1)}
            >
              {page + 1}
            </button>
          </li>
        );
      });
    }
    return result;
  };
  onSearch = (e) => {
    this.props.onSearch();
    this.setListTopic(this.state.page);
    this.setCountPage();
  }
  onUpdate = async (id) => {
    await axios.get(API_URL + "topic/" + id).then((res) => {
      this.setState({info_topic: res.data[0]})
    })
    window.$('#editQuestion').modal('show')
  }
  onDelete = (id) => {
    this.setState({choice_delete:id});
    window.$('#deleteQuestion').modal('show');
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
         {this.state.loading ? (
          <img
            className="center mb-5"
            src={loading_gif}
            alt=""
            width="50px"
          ></img>
        ) : (
          ""
        )}
         <ul className="pagination justify-content-center mb-5 mt-3">
                    <li className="page-item">
                        <button className="page-link" onClick={() => this.setPage(1)}>
                           Đầu
                        </button>
                    </li>
                    {this.showPage(this.state.count_topic, this.state.page)}
                    <li className="page-item">
                        <button className="page-link" onClick={() => this.setPage(this.state.count_topic)}>
                            Cuối
                        </button>
                    </li>
                </ul> 
      </div>
    );
  }
}
export default TopicList;
