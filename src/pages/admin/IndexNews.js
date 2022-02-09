import React,{ Component } from "react";
import NewsContent from "../../components/admin/news/NewsContent";
import SideBar from "../../components/admin/SideBar";

class IndexNews extends Component{
    render(){
        return(
            <div className="row mx-0">
                <SideBar />
                <NewsContent />
            </div>
        )
    }
}
export default IndexNews