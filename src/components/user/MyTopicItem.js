import React,{ Component } from "react";
import Moment from "moment";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";
import CommentService from "../../services/CommentService";
import axios from "axios";


const cookies = new Cookies();
class MyTopicItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
          reply: false,
          "comments": [],
          "content": "",
          avatar:''
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
        axios.get(API_URL + "user/" + cookies.get("id_user"),{  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then((res) => {
            if(res.data[0].avatar !== ''){
              this.setState({avatar: res.data[0].avatar})
            }
          })
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
        showHashtag = (listHashtag) => {
          let result = null;
          if(listHashtag.length > 0){
            result = listHashtag.map((hashtag, index) => {
              return (
                <button key={index} type="button" className="btn btn-light btn-sm mr-1 mt-1">{hashtag}</button>
              )
            })
          }
          return result
        }
    render(){
        const { topic } = this.props;
        const { comments } = this.state;
        return(
            <div
            className="item mx-1 mb-4 rounded topic-item"
            data-aos="fade-right"
          >
            <div className="grid">
        <div className="row pt-3 pl-4">
          <div>
            <img
              className="rounded-circle"
              src={topic.createdBy.avatar}
              width="40px"
              height="40px"
              alt=""
            ></img>
          </div>
          <div className="ml-2">
            <h3 className="mb-1 name">{topic.createdBy.fullname}  </h3>
            <h6 className="date">
              {Moment(topic.createdAt).format("YYYY-MM-DD")}
            </h6>
          </div>
        </div>
        {topic.createdBy._id === cookies.get('id_user') ? (
           <div className="pt-3 pl-1">
           <span className="text" onClick ={this.props.update} >Edit</span>&ensp;
           <span className="text" onClick={this.props.delete} >Delete</span>
         </div>
        ) : " "}
       
        </div>
            <div className="mt-3 pl-4">
              <h5 className="h5">{topic.content}</h5>
            </div>
            <div className="pl-4">
        {this.showHashtag(topic.hashtag)}
        </div>
        <div className="pl-4">
          <img src={topic.file} alt=""  style={{ width: "200px" }}/>
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
                          src={this.state.avatar}
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
                          src={comment.userId.avatar}
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
              ) : (
                ""
              )}
            </div>
          </div>
        )
    }
}

export default MyTopicItem;