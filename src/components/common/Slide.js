import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class Slide extends Component {
  render() {
    const settings = {
      slidesToShow: 1,
      autoplay: true,
      speed: 8000,
      autoplaySpeed: 8000,
      dots: false,
      infinite: false,
    };
    return (
      <div className="col col-md-8 center">
        <Slider {...settings}>
          <div>
            <img
              src="https://penji.co/wp-content/uploads/2020/12/22-Best-Healthcare-Ads-To-Inspire-You-With-Analysis.jpg"
              width="100%"
              height="500px"
              alt=""
            />
          </div>
          <div>
            <img
              src="http://hilal.gov.pk/uploads/articals/5104.jpg"
              width="100%"
              height="500px"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://live-production.wcms.abc-cdn.net.au/602244abab4391525ef444128912ded5?impolicy=wcms_crop_resize&cropH=1080&cropW=1618&xPos=271&yPos=0"
              width="100%"
              height="500px"
              alt=""
            />
          </div>
        </Slider>
      </div>
    );
  }
}
export default Slide;
