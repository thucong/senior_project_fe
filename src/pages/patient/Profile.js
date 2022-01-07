import React,{ Component } from "react";
import ChangePassword from "../../components/user/ChangePassword";
import EditProfile from "../../components/user/EditProfile";

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state={
            page: 0
        };
    }
    onClickListGroup = (page) => {
        this.setState({page})
    }
    render(){
        return(
            <div className="">
                <div className="col col-10 mx-auto mt-5 row">
                    <div className="col-3 list-group mt-3">
                        <button type="button" onClick={() => this.onClickListGroup(0)} className={this.state.page === 0 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                            Edit Profile
                        </button>
                        <button type="button" onClick={() => this.onClickListGroup(1)} className={this.state.page === 1 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                            Change Password
                        </button>
                    </div>
                    <div className="col-9 p-4 mb-5 profile mt-3">
                        {this.state.page === 0 ? <EditProfile /> : ""}
                        {this.state.page === 1 ? <ChangePassword /> : ""}
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile