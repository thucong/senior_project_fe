import React,{ Component } from "react";
import NewsService from "../services/NewsService";
import Moment from 'moment';
class DetailNews extends Component{
    constructor(props){
        super(props);
        this.state={
            "news": {}
        }
    }
    componentDidMount(){
        NewsService.getNewsById(this.props.match.params.id).then((res) => {
            if(res.status === 200){
                return res.data
            }
        }).then(data1 => data1[0])
        .then(data => {
            this.setState({news:data})
        })
    }
    render(){
        return(
           <div className=" col-lg-8 center mt-5 mb-5 detail-news">
               <div className=" p-5 ">
                   <h5 className=" mb-3 text news-subject">{this.state.news.subject}</h5>
                   <h5 className="text mt-2">Post at: {Moment(this.state.news.createdAt).format('DD-MM-yyyy')}</h5>
                   <div className="clearfix mt-3">
                     <img src={this.state.news.image} className=" logo img-detail mr-3 mb-3" height="300px" />
                     <p className="content ">{this.state.news.content}</p>
                   </div>
                   <h5 className="text-truncate mt-3"> Written by {this.state.news.writer}</h5>
               </div>
           </div>
          
         

        )
    }
}
export default DetailNews; 