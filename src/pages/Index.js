import React, { Component } from "react";
import Advertisement from "../components/common/Advertisement";
import Covid from "../components/common/Covid";
import Slide from "../components/common/Slide";
import NewsList from "../components/common/NewsList";

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
    document.body.style.backgroundColor = "#eceff1";
    return (
      <div>
          <Slide />
          <Covid />
          {this.state.showTopButton?<button className="floating-btn btn btn-primary fixed-bottom ml-auto rounded-circle mr-4 mb-4 shadow" onClick={this.goToTop}><i className="fa fa-arrow-up fa-w-20"></i></button>:""}
        <div className="col col-md-10 center mt-5">
          <div className="row">
           <NewsList />
           <Advertisement />
          </div>
        </div>
        
      </div>
    );
  }
}
export default Index;
