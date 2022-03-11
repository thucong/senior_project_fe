import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
class CuredChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: "",
        datasets: [],
      },
      text: "Biểu đồ dữ liệu covid-19 của Việt Nam",
    };
  }
  chart = () => {
    let date = [];
    let cured = [];
    if (this.props.choice_place === null) {
      axios
        .get(API_URL + "last7-covid")
        .then((res) => {
          //console.log(res);
          for (const dataObj of res.data) {
            date.push(Moment(dataObj.createdAt).format("DD-MM"));
            cured.push(parseInt(dataObj.cured));
          }
          this.setState({
            chartData: {
              labels: date,
              datasets: [
                {
                  label: "Số ca tử vong",
                  data: cured,
                  backgroundColor: ["#4b4eb3"],
                  borderWidth: 1,
                },
              ],
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(API_URL + "covidOfCity/" + this.props.choice_place._id)
        .then((res) => {
          const data = res.data.slice(Math.max(res.data.length - 7, 1));
          for (const dataObj of data) {
            date.push(Moment(dataObj.createdAt).format("DD-MM"));
            cured.push(parseInt(dataObj.number_cured));
          }
          this.setState({
            chartData: {
              labels: date,
              datasets: [
                {
                  label: "Số ca tử vong",
                  data: cured,
                  backgroundColor: ["#4b4eb3"],
                  borderWidth: 1,
                },
              ],
            },
          });
          this.setState({ text: `Biểu đồ dữ liệu covid-19 của ${res.data[0].id_place.name}` });
        });
    }
  };
  componentDidMount() {
    this.chart();
  }
  componentDidUpdate() {
    if (this.props.choice_place !== null) {
      this.chart();
      this.props.choicePlace(null);
    }
  }
  render() {
   // console.log(this.state.chartData);
    return (
      <div className="">
        <Bar
          data={this.state.chartData}
          height={400}
          width={500}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: `${this.state.text}`,
                position: "bottom",
              },
            },
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontSize: 15,
              },
            },
            layout: {
              padding: 30,
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    choice_place: state.choice_place,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    choicePlace: (place) => {
      return dispatch(actions.choicePlace(place));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CuredChart);
