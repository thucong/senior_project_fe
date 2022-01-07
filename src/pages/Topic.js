import React, { Component } from "react";
import Cookies from "universal-cookie";
import TopicList from "../components/common/TopicList";
import AddQuestion from "../components/user/AddQuestion";
import MyTopic from "../components/user/MyTopic";
import { Typeahead } from 'react-bootstrap-typeahead';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import TopicSearch from "../components/common/TopicSearch";

const cookies = new Cookies();
class Topic extends Component {
  constructor(props){
    super(props);
    this.state ={
      choose_all: true,
      choose_my: false,
      hashtag: [],
      name: '',
      list_topic:'',
      topic_search:''
    }
  }
  onAdd = (e) => {
    if (cookies.get("role") === "patient") {
      window.$("#addQuestion").modal("show");
    } else {
      this.props.history.push("/login");
    }
  };
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeHashtag = (e) => {
    this.setState({ hashtag: e });
  };
  // all = () => {
  //   this.setState({choose_all: true})
  //   this.setState({choose_my: false})
  // }
  // my = () => {
  //   this.setState({choose_my: true})
  //   this.setState({choose_all: false})
  // }
  componentDidMount(){
    axios.get(API_URL + "topic").then((res) => {
      this.setState({list_topic:res.data})
    })
  }
  onSubmitSearch = (e) => {
    e.preventDefault();
    axios.get(API_URL + `topics?name=${this.state.name}&query=${this.state.hashtag}`).then((res) => {
      this.setState({topic_search: res.data})
      console.log(this.state.topic_search)
    }).catch((err) => {
      if(err.response.status === 404){
        console.log(err)
      }
    })
    
  }
  render() {
    const ref = React.createRef();
    return (
      <div className="col col-md-10 center mt-5">
        {cookies.get("role") === "doctor" ? (
          ""
        ) : (
       
             <div className="">
            <button className="btn btn-success" onClick={this.onAdd}>
              Add Question
            </button>
          </div>
        
        )}
        {/* {cookies.get("role") === "patient" ? (
           <div className="mt-3 mb-2 choose_question">
           <span className={this.state.choose_all === true ? 'color_question' : ''} onClick={this.all}>All question</span> | <span className={this.state.choose_my === true ? 'color_question' : ''} onClick={this.my}>My question</span>
           </div>
        ) : ''}
          */}
        <div className="row">
          {/* {this.state.choose_all === true ? <TopicList /> : ""}
          {this.state.choose_my === true ? <MyTopic /> : ""} */}
          {this.state.topic_search === '' ? <TopicList /> : <TopicSearch topic_search={this.state.topic_search}/>}
          <div className="col-md-4  mt-3 form-search">
            <div className="container sticky-top ">
              <form  className="">
                <div className="mt-3 search_text">
                <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by keyword..."
              onChange={this.onChangeName}
              name="name"
            />
                </div>
                <div className="mt-3 search_text">
                {/* <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by symptom..."
              onChange={this.onChangeHashtag}
              name="hashtag"
            /> */}
                <Typeahead
                            id="public-methods-example"
                            labelKey="name"
                            multiple
                            options={this.props.list_hashtag}
                            placeholder="Search by symptom..."
                            ref={ref}
                            size="large"
                            onChange={this.onChangeHashtag}
                            selected={this.state.hashtag}
                            
                        />
                        
                </div>
                <div className=" mt-3 ">
                        <button type="submit" className="btn btn-success" onClick={this.onSubmitSearch}>Search</button>
                    </div>
              </form>
            </div>
          </div>
        </div>
        <AddQuestion />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    list_hashtag : state.list_hashtag,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeHashtag: (hashtag) => {
      dispatch(actions.changeHashtag(hashtag))
    },
    fetchListHashtag : () => {
      dispatch(actions.fetchListHashtag())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic);
