import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import { connect } from "react-redux";
import * as actions from "../../actions/index";

class Covid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoCity: [],
    };
  }
  componentDidMount() {
    axios.get(API_URL + "infoCity").then((res) => {
      if (res.status === 200) {
        this.setState({ infoCity: res.data });
      }
    });
  }
  onChoosePlace = (info) => {
    this.props.choicePlace(info);
    
   console.log(this.props.choicePlace(info))
  }
  render() {
    const infoCity = this.state.infoCity;
    return (
      <div className="p-2  covid bar-chart overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Province/City</th>
              <th scope="col">Total</th>
              <th scope="col">The last 24 hours</th>
              <th scope="col">Dead</th>
            </tr>
          </thead>
          <tbody>
            {infoCity.length > 0
              ? infoCity.map((info, index) => (
                  <tr key={index} onClick={() => this.onChoosePlace(info)} className="choice_place">
                    <th scope="row" >{info.name}</th>
                    <td>{info.total}</td>
                    <td className="covid-today">+ {info.today}</td>
                    <td>{info.dead}</td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    choicePlace: (place) => {
      return dispatch(actions.choicePlace(place));
    },
  };
};
export default connect(null, mapDispatchToProps)(Covid);
