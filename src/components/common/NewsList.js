import React, { Component } from "react";
import Aos from "aos";
import "aos/dist/aos.css"
import NewsService from "../../services/NewsService";
import NewsItem from "./NewsItem";
import loading_gif from '../../images/loader.gif';

class NewsList extends Component{
    constructor(props) {
        super(props);
        Aos.init({duration: 1000});
        this.state = {
            loading: true,
            newsList: []
        }
    }
    componentWillMount(){
        NewsService.fetchNewsAPI(). then((res) => {
            if(res.status === 200){
                this.setState({newsList: res.data});
                this.setState({loading: false})
            }
        })
    }
  
    render() {
        const newsList = this.state.newsList;
        return (
            <div className="col-lg-8 mt-3">
                <div className="news-item">
                    {newsList.length > 0 ? ( newsList.map((news, index) => (
                        <NewsItem key={index} news={news} />
                    )) ): ""}

                    {/* {this.state.loading ? <img className="center" src={loading_gif} alt="" width="50px"></img>:""} */}
                </div>
            </div>
        );
    }
}

export default NewsList;