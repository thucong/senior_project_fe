import React, { Component } from "react";
import Moment from 'moment';
class NewsItem extends Component {
  toNews = (id) => {
    window.open("/news/"+id, "_blank");
  }
  render() {
    return (
      <div
        className="item row h-100 mx-1 mb-4 rounded  news"
        data-aos="fade-right" onClick={(e) =>this.toNews(this.props.news._id)}
      >
        <div className="col col-2 h-100  ">
          <img className="mx-auto pr-2 image" src={this.props.news.image} alt="" />
        </div>
        <div className="col col-10 h-100">
          <h4 className="text-truncate news-subject">{this.props.news.subject}</h4>
          <div className="mt-2  ">
              <h5 className="text-truncate">Post at: {Moment(this.props.news.createdAt).format('YYYY-MM-DD')} </h5>
              <p className="content">{this.props.news.content.substring(0, 250)}</p>
          </div>
          <h5 className="text-truncate mt-2 ">Published by {this.props.news.writer}</h5>
        </div>
      </div>
    );
  }
}
export default NewsItem;
