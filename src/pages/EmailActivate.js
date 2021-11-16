import React,{ Component } from "react";
import verifyaccount from '../images/verifyaccount.png'
class EmailActivate extends Component{
    render() {
        document.body.style.backgroundColor = "#eceff1";
        return (
            <div className="col col-lg-5 col-md-8 mt-4 bg-white jumbotron mx-auto mt30">
                 <img src={verifyaccount} className="mt-sm-md-3 verify center mt-3" alt="" height="300" width="300"></img> <br/>
                 <h1 className="ct mb-3 mt-4 h1">Please confirm your email!</h1>
            </div>
        )

    }
}
export default EmailActivate;