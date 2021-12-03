import { Component } from "react";
import avatar from "../../images/avatar1.jpg";
import Moment from "moment";
import Cookies from "universal-cookie";
import { API_URL } from "../../constants/ApiUrl";
import axios from "axios";
import CommentService from "../../services/CommentService";
import { withRouter } from "react-router-dom";

const cookies = new Cookies();
class TopicItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: false,
      "comments": [],
      "content": ""
    };
  }
  onReply = (e) => {
    this.setState({ reply: !this.state.reply });
  };
  componentDidMount() {

    axios({ method: "GET", url: API_URL + "comment/"+ this.props.topic._id  }).then((res) => {
      if (res) {
        this.setState({ comments: res.data });
      }
    });
  }
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
    const { topic } = this.props;
    const { comments } = this.state;
    console.log(comments);
    return (
      <div
        className="item mx-1 mb-4 rounded topic-item"
        data-aos="fade-right"
      >
        <div className="row pt-3 pl-4">
          <div>
            <img
              className="rounded-circle"
              src={avatar}
              width="40px"
              height="40px"
              alt=""
            ></img>
          </div>
          <div className="ml-2">
            <h3 className="mb-1 name">{topic.createdBy.fullname}</h3>
            <h6 className="date">
              {" "}
              {Moment(topic.createdAt).format("DD-MM-yyyy")}
            </h6>
          </div>
        </div>
        <div className="mt-3 pl-4">
          <h5 className="h5">{topic.content}</h5>
        </div>
        <div className="mt-3 pl-4 pb-3">
          <a className="" onClick={this.onReply}>
            {comments.length} reply
          </a>
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
              ) : (
                ""
              )}

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
                        {Moment(comment.createdAt).format("DD-MM-yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              ))) : "" } 

              {/* <div className="row pl-5">
                <div className="mt-3">
                  <img
                    className="rounded-circle"
                    src={avatar}
                    width="40px"
                    height="40px"
                    alt=""
                  ></img>
                </div>
                <div className="ml-2 mt-3 ">
                  <div className="rounded bg w-auto p-2">
                    <h3 className="mb-1 name">Luna</h3>
                    <h6 className="">kkkkkkkkkkkkkkkkkkkkkkk</h6>
                  </div>
                  <div className="mt-1">
                    <a>Reply</a> <span> - </span>
                    <span>date</span>
                  </div>
                </div>
              </div>
              <div className="row pl-5">
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
                    value=""
                    className="bg text-reply p-2"
                  />
                  <button className="btn btn-success mt-1">Send</button>
                </div>
              </div> */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(TopicItem);
