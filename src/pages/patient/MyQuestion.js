import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";
import Moment from "moment";
import avatar from "../../images/avatar1.jpg";
import CommentService from "../../services/CommentService";
const cookies = new Cookies();
class MyQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            my_question : '',
            reply: false,
            comments:''
        }
    }
    componentDidMount(){
        axios.get(API_URL + "topic/my/" +  cookies.get('id_user')).then((res) => {
            this.setState({my_question:res.data})
        })
    }
    onReply = (id) => {
        this.setState({ reply: !this.state.reply });
        axios({ method: "GET", url: API_URL + "comment/"+ id  }).then((res) => {
            if (res) {
              this.setState({ comments: res.data });
            }
          });
      };
      onChange = (e) => {
        let target = e.target;
            let name = target.name;
            let value = target.value;
            this.setState({
                [name]: value
            });
      }
      onSubmit = (e) => {
        e.preventDefault();
        let content = this.state.content;
        let topicId = this.props.topic._id;
        let userId = cookies.get('id_user');
        if(content){
          CommentService.fetchCommentAPI(content,topicId,userId).then((res) => {
            if(res.status === 200){
              window.location.reload();
            }
          })
        }
        }
  render() {
      const {my_question, comments} = this.state;
    return (
        <div className="row">
          <div className="col-lg-8 mt-3">
            {my_question.length > 0 ? my_question.map((qa, index) => (
                <div className="item mx-1 mb-4 rounded topic-item" data-aos="fade-right" key={index}>
                <div className="row pt-3 pl-4">
                  <div>
                    <img
                      className="rounded-circle"
                      src={qa.createdBy.avatar}
                      width="40px"
                      height="40px"
                      alt=""
                    ></img>
                  </div>
                  <div className="ml-2">
                    <h3 className="mb-1 name">{qa.createdBy.fullname}</h3>
                    <h6 className="date">{Moment(qa.createdAt).format("YYYY-MM-DD")}</h6>
                  </div>
                </div>
                <div className="mt-3 pl-4">
                  <h5 className="h5">{qa.content}</h5>
                </div>
                
                <div className="mt-3 pl-4 pb-3">
                  <a className="" onClick={(e) => this.onReply(qa._id)}>a reply</a>
                  {this.state.reply ? (
                    <div className="mt-3 border-top ">
                        { cookies.get("role")  ? (
                            <div className="row  pl-2 ">
                                <div className="mt-3">
                                    <img
                                    className="rounded-circle"
                                    src={avatar}
                                    width="40px"
                                    height="40px"
                                    alt=""
                                    ></img>
                                </div>
                                <div className="ml-2 mt-3  ">
                                    <input
                                    type="text"
                                    placeholder="Write your reply"
                                    value={this.state.content}
                                    className="bg text-reply p-2"
                                    name="content"
                                    onChange={this.onChange}
                                    />
                                    <button className="btn btn-success mt-1" onClick={this.onSubmit}>Send</button>
                                </div>
                            </div>
                        ) : ( "")}   
                        {comments.length > 0 ? (comments.map((comment, index) => (
                            <div className="row pt-2 pl-2 mb-2" key={index}>
                                <div className="">
                                    <img
                                    className="rounded-circle"
                                    src={avatar}
                                    width="40px"
                                    height="40px"
                                    alt=""
                                    ></img>
                                </div>
                                <div className="ml-2 ">
                                    <div className="rounded bg w-auto p-2">
                                    <h3 className="mb-1 name">{comment.userId.fullname}</h3>
                                    <h6 className="">{comment.content}</h6>
                                    </div>
                                    <div className="mt-1 ">
                                    <span className="date">
                                        {Moment(comment.createdAt).format("YYYY-MM-DD")}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        ))) : "" } 
                    </div>
                     ): ""}
                     </div>
                     </div>
                )): ""}
             </div>
            
          <div className="col-md-4 d-none d-sm-none d-md-none d-lg-block mt-3 hospital">
                ffffffffff
          </div>
        </div>

    );
  }
}
export default MyQuestion;
