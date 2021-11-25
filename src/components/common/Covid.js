import axios from "axios";
import React, { Component } from "react";
import { API_URL } from "../../constants/ApiUrl";

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
  render() {
    const infoCity = this.state.infoCity;
    return (
      <div className="p-2  covid bar-chart overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Province/City</th>
              <th scope="col">Total</th>
              <th scope="col">Today</th>
              <th scope="col">Dead</th>
            </tr>
          </thead>
          <tbody>
            {infoCity.length > 0
              ? infoCity.map((info, index) => (
                  <tr key={index}>
                    <th scope="row">{info.name}</th>
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
export default Covid;
