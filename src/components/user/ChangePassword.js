import React,{ Component } from "react";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ChangePassword extends Component{
    constructor(props) {
        super(props);
        this.state={
            old_password: "",
            new_password: "",
            re_new_password: "",
            old_password_notif: false,
            new_password_notif: false,
            re_new_password_notif: false,
            incorrect: false
        };
    }
    onChangeOldPassword = (e) => {
        this.setState({old_password: e.target.value});
    }
    onChangeNewPassword = (e) => {
        this.setState({new_password: e.target.value});
    }
    onChangeReNewPassword = (e) => {
        this.setState({re_new_password: e.target.value});
    }
    onBlurOldPassword = () => {
        if (this.state.old_password === "") {
            this.setState({old_password_notif: true})
        }
        else {
            this.setState({old_password_notif: false})
        }
    }
    onBlurNewPassword = () => {
        if (this.state.new_password === "") {
            this.setState({new_password_notif: true})
        }
        else {
            this.setState({new_password_notif: false})
        }
    }
    onBlurReNewPassword = () => {
        if (this.state.re_new_password !== this.state.new_password) {
            this.setState({re_new_password_notif: true})
        }
        else {
            this.setState({re_new_password_notif: false})
        }
    }
    onSubmitPassword = (e) => {
        e.preventDefault()
        if (this.state.old_password === "") {
            this.setState({old_password_notif: true})
        }
        else if (this.state.new_password === "") {
            this.setState({new_password_notif: true})
        }
        else if (this.state.re_new_password !== this.state.new_password) {
            this.setState({re_new_password_notif: true})
        }
        else {
           axios.put( API_URL +  "change-password/" + cookies.get('id_user'), {
                "oldPass": this.state.old_password,
                "newPass": this.state.new_password
            }, {  headers: { Authorization: `Bearer ${cookies.get("token")}` }}).then(rs => {
                if (rs) {
                    console.log('ok')
                    cookies.remove("id_user");
                    cookies.remove("role");
                    cookies.remove("token");
                    window.location.href = "/login";
                }
            }).catch((err) => {
                if(err.response.status === 400) {
                    this.setState({incorrect: true})
                }
              });
        }
    }
    render(){
        return(
            <div >
                <form className="mt-2" onSubmit={this.onSubmitPassword}>
                    <div className="form-group">
                        Old password (*)
                        <input type="password" className="form-control mt-3" placeholder="Old password" onChange={this.onChangeOldPassword} onBlur={this.onBlurOldPassword}></input>
                    </div>
                    {this.state.old_password_notif?<div className="text-danger mb-3">Old password cannot be blank!</div>:""}
                    <div className="form-group">
                        New password (*)
                        <input type="password" className="form-control mt-3" placeholder="New password" onChange={this.onChangeNewPassword} onBlur={this.onBlurNewPassword}></input>
                    </div>
                    {this.state.new_password_notif?<div className="text-danger mb-3">New password cannot be blank!</div>:""}
                    <div className="form-group">
                          Confirm new password (*)
                        <input type="password" className="form-control mt-3" placeholder="Confirm new password" onChange={this.onChangeReNewPassword} onBlur={this.onBlurReNewPassword}></input>
                    </div>
                    {this.state.re_new_password_notif?<div className="text-danger mb-3">Password does not match!</div>:""}
                    {this.state.incorrect?<div className="text-danger mb-3">Old password is incorrect!</div>:""}
                    <button type="submit" className="btn btn-success center mt-4" onClick={this.onSubmitPassword}>Save</button>
                </form>
            </div>
        )
    }
}
export default ChangePassword;