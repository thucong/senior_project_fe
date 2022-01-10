import React, { Component } from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import loading_gif from "../../images/loader.gif";
import NewsItem from "./NewsItem";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";


class NewsList extends Component{
    constructor(props) {
        super(props);
        Aos.init({duration: 1000});
        this.state = {
            loading: false,
            newsList: [],
            page: 1,
            count: 0,
        }
    }
    setListNews = (page) => {
        if (page > 0) {
            this.setState({ loading: true });
            axios.get(API_URL + "news?page=" + page).then((res) => {
                this.setState({newsList: res.data});
                this.setState({loading: false})
            })
        }
    }
    setPage = (page) => {
        this.setState({ page: page });
        this.setState({ newsList: [] });
        this.setListNews(page);
      };
      setCountPage = () => {
        axios
          .get(
            API_URL +
              "count_news"
          )
          .then((rs) => {
            this.setState({ count: rs.data });
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
        this.setListNews(this.state.page);
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
    render() {
        const newsList = this.state.newsList;
        return (
            <div className="col-lg-8 mt-3">
                <div className="news-item">
                    {newsList.length > 0 ? ( newsList.map((news, index) => (
                        <NewsItem key={index} news={news} />
                    )) ): ""}
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
                </div>
                <ul className="pagination justify-content-center mb-5 mt-3">
              <li className="page-item">
                <button className="page-link" onClick={() => this.setPage(1)}>
                  Head
                </button>
              </li>
              {this.showPage(this.state.count, this.state.page)}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => this.setPage(this.state.count)}
                >
                  Last
                </button>
              </li>
            </ul>
            </div>
        );
    }
}

export default NewsList;