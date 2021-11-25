import React,{ Component } from "react";
import { Bar, } from 'react-chartjs-2'
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Moment from "moment";

class CuredChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            "chartData" : {
                "labels": "",
                "datasets": []
            }
        }
    }
    chart = () => {
        let date = [];
        let cured = []
        axios.get(API_URL + "last7-covid").then(res => {
            console.log(res);
            for ( const dataObj of res.data){
                date.push(Moment(dataObj.createdAt).format("DD-MM"));
                cured.push(parseInt(dataObj.cured));
            }
            this.setState({chartData: {
                labels : date,
                datasets: [
                    {
                        label: "Number of cured",
                        data: cured,
                        backgroundColor: [
                            'gray'
                        ],
                        borderWidth: 1,
                    }
                ]
            }
                
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidMount(){
        this.chart();
    }
    render(){
        console.log(this.state.chartData)
        return(
            <div className="">
                <Bar 
                data={this.state.chartData}
                height={400}
                width={500}
                  options={{
                    responsive: true,
                    plugins: {
                        legend: {
                          position: "bottom"
                        },
                    },
                    showXLabels: 7,
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            autoSkip: false,
                            maxTicksLimit: 7,
                            beginAtZero: true,
                          },
                          gridLines: {
                            display: false
                          }
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: true
                          }
                        }
                      ]
                    },
                    legend: {
                      labels: {
                        fontSize: 15,
                      },
                    },
                    layout: {
                        padding: 30
                    },
             
                  }}
                  
                />
            </div>
        )
    }
}
export default CuredChart