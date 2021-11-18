import React, { Component } from "react";
import Moment from 'moment';
class NewsItem extends Component {
  toNews = (id) => {
    window.open("/news/"+id, "_blank");
  }
  render() {
    return (
      <div
        className="item row h-100 full-width mx-1 mb-3 rounded bg-white big-hover pr-2 pl-4 pt-4 pb-3"
        data-aos="fade-right" onClick={(e) =>this.toNews(this.props.news._id)}
      >
        <div className="col col-2 logo">
          <img className="mx-auto pr-2" src={this.props.news.image} alt="" />
        </div>
        <div className="col col-10">
          <h4 className="text-truncate">{this.props.news.subject}</h4>
          <div className="row mt-4 mb-1">
            <div className="col-12 detail mb-0 pb-0 ">
              <h5 className="text-truncate">{this.props.news.writer}, {Moment(this.props.news.createdAt).format('yyyy-MM-DD')} </h5>
              <div className="row pl-3 mt-3 mr-2 ">{this.props.news.content.substring(0, 200) + " ..."}</div>
            </div>
            {/* <div className="col-2 ml-auto date h-100">
              <p className="text-truncate text-right mt-1">{Moment(this.props.news.createdAt).format('yyyy-MM-DD')}</p>
              <br />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
export default NewsItem;
