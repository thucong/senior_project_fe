import React, { Component } from "react";
import NewsService from "../services/NewsService";
import Moment from "moment";

class DetailNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
      newsByCategory: [],
    };
  }
  componentDidMount() {
    NewsService.getNewsById(this.props.match.params.id)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .then((data1) => data1[0])
      .then((data) => {
        this.setState({ news: data });
      });
    NewsService.fetchNewsAPI().then((res) => {
      let data1 = res.data.filter(
        (item) => item.category === this.state.news.category
      );
      let data2 = data1.filter(
        (item) => item._id !== this.props.match.params.id
      );
      this.setState({ newsByCategory: data2 });
    });
  }
  toNews = (id) => {
    window.open("/news/" + id, "_blank");
  };
  render() {
    const newsByCategory = this.state.newsByCategory;
    console.log(this.state.news.category);
    console.log(this.state.newsByCategory);
    return (
      <div className="col col-md-10 center ">
        <div className="row ">
          <div className="col col-lg-8 mb-5 mt-5 detail-news">
            <div className=" p-5 ">
              <h5 className=" mb-3 text news-subject">
                {this.state.news.subject}
              </h5>
              <h5 className="text mt-2">
                Post at:{" "}
                {Moment(this.state.news.createdAt).format("YYYY-MM-DD")}
              </h5>
              <div className="clearfix mt-3">
                <img
                  src={this.state.news.image}
                  className=" logo img-detail mr-3 mb-2"
                  height="300px"
                  alt=""
                />
                <p className="content lh-24">{this.state.news.content}</p>
              </div>
              <h5 className="text-truncate mt-3">
                {" "}
                Written by {this.state.news.writer}
              </h5>
            </div>
          </div>
          <div className="col col-md-3 mt-5 related ml-4">
            <div className="card-body">
              <p className="card-title text-center hospital-title">
                Related news
              </p>
              <div className=" overflow-auto">
                <table className="table list-hospital list-news">
                  <tbody>
                    {newsByCategory.length > 0
                      ? newsByCategory.map((news, index) => (
                          <tr
                            key={index}
                            onClick={(e) => this.toNews(news._id)}
                          >
                            <td className="name">{news.subject}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DetailNews;
