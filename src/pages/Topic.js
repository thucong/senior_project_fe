import React, { Component } from "react";
import Cookies from "universal-cookie";
import AddQuestion from "../components/user/AddQuestion";
import { Typeahead } from "react-bootstrap-typeahead";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import EditQuestion from "../components/user/EditQuestion";
import DeleteQuestion from "../components/user/DeleteQuestion";
import loading_gif from "../images/loader.gif";
import TopicItem from "../components/common/TopicItem";
import Aos from "aos";
import "aos/dist/aos.css";

const cookies = new Cookies();
class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: [],
      name: "",
      count_topic: 0,
      topics: [],
      loading: false,
      choice_delete: "",
      info_topic: "",
      page: 1,
    };
    Aos.init({ duration: 1000 });
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
  setListTopic = (page) => {
    if (page > 0) {
      this.setState({ loading: true });
      axios({
        method: "GET",
        url:
          API_URL +
          "list_topic?name=" +
          this.state.name +
          "&query=" +
          this.state.hashtag +
          "&page=" +
          page,
      }).then((res) => {
        this.setState({ topics: res.data });
        this.setState({ loading: false });
      });
    }
  };
  setPage = (page) => {
    this.setState({ page: page });
    this.setState({ topics: [] });
    this.setListTopic(page);
  };
  setCountPage = () => {
    axios
      .get(
        API_URL +
          "count?name=" +
          this.state.name +
          "&query=" +
          this.state.hashtag
      )
      .then((rs) => {
        this.setState({ count_topic: rs.data });
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
  onSubmitSearch = (e) => {
    e.preventDefault();
    // axios.get(API_URL + `topics?name=${this.state.name}&query=${this.state.hashtag}`).then((res) => {
    //   this.setState({topic_search: res.data})
    //   console.log(this.state.topic_search)
    // }).catch((err) => {
    //   if(err.response.status === 404){
    //     console.log(err)
    //   }
    // })
    // this.setListTopic(this.state.page);
    // this.setCountPage();
    //this.setState({topic_search:true})
    this.setListTopic(this.state.page);
    this.setCountPage();
  };
  onUpdate = async (id) => {
    await axios.get(API_URL + "topic/" + id).then((res) => {
      this.setState({ info_topic: res.data[0] });
    });
    window.$("#editQuestion").modal("show");
  };
  onDelete = (id) => {
    this.setState({ choice_delete: id });
    window.$("#deleteQuestion").modal("show");
  };
  render() {
    const ref = React.createRef();
    const topics = this.state.topics;
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
          {/* {this.state.topic_search === false ? <TopicList /> : <TopicSearch name={this.state.name} query={this.state.hashtag}/>} */}
          {/* <TopicList name={this.state.name} query={this.state.hashtag} onSearch={this.onSubmitSearch}/> */}
          <div className="col-lg-8 mt-3">
            {topics.length > 0 ? (
              topics.map((topic, index) => (
                <TopicItem
                  key={index}
                  topic={topic}
                  update={(e) => this.onUpdate(topic._id)}
                  delete={(e) => this.onDelete(topic._id)}
                />
              ))
            ) : (""
              // <p className="text-danger h3 mt-3">
              //   Sorry, we couldn't find any results for your search!
              // </p>
            )}
            <EditQuestion info_topic={this.state.info_topic} />
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
                  Head
                </button>
              </li>
              {this.showPage(this.state.count_topic, this.state.page)}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => this.setPage(this.state.count_topic)}
                >
                  Last
                </button>
              </li>
            </ul>
          </div>
          <div className="col-md-4  mt-3 form-search">
            <div className="container sticky-top ">
              <form className="">
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={this.onSubmitSearch}
                  >
                    Search
                  </button>
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
const mapStateToProps = (state) => {
  return {
    list_hashtag: state.list_hashtag,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onChangeHashtag: (hashtag) => {
      dispatch(actions.changeHashtag(hashtag));
    },
    fetchListHashtag: () => {
      dispatch(actions.fetchListHashtag());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topic);
