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
        document.body.style.backgroundColor = "#eceff1";
        return(
           <div className=" col-lg-8 center mt-5">
               <div className="bg-white rounded p-3 mb-4 ml-3">
                   <h5 className="h5 mb-3 text subject">{this.state.news.subject}</h5>
                   <h5 className="text mt-2">{this.state.news.writer}, {Moment(this.state.news.createdAt).format('yyyy-MM-DD')}</h5>
                   <img src={this.state.news.image} className="mt-3 logo" height="300px" />
                   <div className="text mt-5">
                       <p>{this.state.news.content}</p>
                   </div>
               </div>
           </div>
          
         

        )
    }
}
export default DetailNews; 