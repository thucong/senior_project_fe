import React, { Component } from "react";
import ListHospital from "../components/common/ListHospital";
import Covid from "../components/common/Covid";
import NewsList from "../components/common/NewsList";
import BarChart from "../components/common/BarChart";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state={
        showTopButton: false
    };
}
onScrollDown = () => {
    const showTopButton  = window.scrollY >= 500;
    this.setState({showTopButton});
}
goToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
}
componentDidMount() {
    window.addEventListener('scroll', this.onScrollDown);
}
componentWillUnmount() {
    window.removeEventListener('scroll', this.onScrollDown);
}
  render() {
  
    return (
      <div>
          <div className="col col-md-10 center mt-5" >
            <p className="subject mb-2">Epidemic situation of the whole country</p>
            <div className="row">
                <div className="col col-md-6">
                  <Covid />
                </div>
                <div className="col col-md-6">
                  <BarChart />
                </div>
            </div>
          </div>
          {this.state.showTopButton?<button className="floating-btn btn btn-primary fixed-bottom ml-auto rounded-circle mr-4 mb-4 shadow" onClick={this.goToTop}><i className="fa fa-arrow-up fa-w-20"></i></button>:""}
        <div className="col col-md-10 center mt-5">
          <div className="row">
           <NewsList />
           <ListHospital />
          </div>
        </div>
        
      </div>
    );
  }
}
export default Index;
