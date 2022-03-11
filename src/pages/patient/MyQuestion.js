
import React, { Component } from "react";
import Cookies from "universal-cookie";
import AddQuestion from "../../components/user/AddQuestion";
import MyTopic from "../../components/user/MyTopic";
import { Typeahead } from 'react-bootstrap-typeahead';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import TopicSearch from "../../components/common/TopicSearch";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";

const cookies = new Cookies();
class MyQuestion extends Component {
  constructor(props){
    super(props);
    this.state ={
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
    onSubmitSearch = (e) => {
      e.preventDefault();
      axios.get(API_URL + `topics?name=${this.state.name}&query=${this.state.hashtag}`).then((res) => {
        this.setState({topic_search: res.data})
        console.log(this.state.topic_search)
      }).catch((err) => {
            console.log(err)
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
               Đặt câu hỏi
              </button>
            </div>
          
          )}
        
          <div className="row">
            {this.state.topic_search === '' ? <MyTopic /> : <TopicSearch topic_search={this.state.topic_search}/> }
            <div className="col-md-4  mt-3 form-search">
            <div className="container sticky-top ">
              <form  className="">
                <div className="mt-3">
                <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tìm kiếm theo nội dung"
              onChange={this.onChangeName}
              name="name"
            />
                </div>
                <div className="mt-3 search_text">
                <Typeahead
                            id="public-methods-example"
                            labelKey="name"
                            multiple
                            options={this.props.list_hashtag}
                            placeholder="Tìm kiếm theo triệu chứng"
                            ref={ref}
                            size="large"
                            onChange={this.onChangeHashtag}
                            selected={this.state.hashtag}
                            
                        />
                        
                </div>
                <div className=" mt-3 ">
                        <button type="submit" className="btn btn-success" onClick={this.onSubmitSearch}>Tìm kiếm</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyQuestion);
