import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ValidateAccountService from "../services/ValidateAccountService";


class ValidateAccount extends Component {
    componentDidMount(){
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const token = encodeURIComponent(params.get('token'));
        ValidateAccountService.fetchValidateAccountAPI(token).then(res => {
            this.props.history.push('/login')
        }).catch(err => {
            this.props.history.push("/register/activate-account/error");
        })
    }
    
    render() {
        return (
            
            <div className="col-lg-4 col-md-6 content jumbotron center mt-3">
               <p></p> 

            </div>
        );

    }
}
export default withRouter(ValidateAccount);