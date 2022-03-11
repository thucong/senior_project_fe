import React,{ Component } from "react";
import CuredChart from "./CuredChart";
import DeadChart from "./DeadChart";
import InfectedChart from "./InfectedChart";
import styled  from "styled-components";
import { connect } from "react-redux";

const Button = styled.button`
height: 40px;
border: 1px solid #eceff1 ;
border-radius: 4px;
cursor: pointer
`
// const types = ['Number of infected', 'Number of cured','Number of dead']
const types = ['Số ca nhiễm', 'Số ca tử vong']
const ButtonToggle = styled(Button)`
    
    ${({active}) => active && `background-color: #4b4eb3; color: white`}
`
class BarChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            infected: true,
            cured: false,
            dead: false,
            active: types[0],
            data: null
        }
    }
    onInfected = () => {
        this.setState({infected: true});
        this.setState({cured: false});
        this.setState({dead: false});
        this.setState({active: types[0]})
    }
    // onCured = () => {
    //     this.setState({cured: true})
    //     this.setState({dead: false})
    //     this.setState({infected: false})
    //     this.setState({active: types[1]})
    // }
    onDead = () => {
        this.setState({dead: true})
        this.setState({cured: false});
        this.setState({infected: false})
        this.setState({active: types[1]})
    }
    render(){
        const active = this.state.active;
        return(
            <div className="bar-chart">
                <div className="mt-3 ml-2">
                    <ButtonToggle onClick={this.onInfected} className="m-1 number-covid" active={active === types[0]} >{types[0]}</ButtonToggle>
                    {/* <ButtonToggle onClick={this.onCured} className="m-1 number-covid" active={active === types[1]} >{types[1]}</ButtonToggle> */}
                    {/* <ButtonToggle onClick={this.onDead} className="m-1 number-covid" active={active === types[2]} >{types[2]}</ButtonToggle> */}
                    <ButtonToggle onClick={this.onDead} className="m-1 number-covid" active={active === types[1]} >{types[1]}</ButtonToggle>
                </div>
                <div>
                    {this.state.infected ? <InfectedChart /> : ""}
                    {/* {this.state.cured ? <CuredChart /> : " "} */}
                    {this.state.dead ? <DeadChart /> : ""}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      choice_place: state.choice_place,
    };
  };
  
  export default connect(mapStateToProps, null)(BarChart) 