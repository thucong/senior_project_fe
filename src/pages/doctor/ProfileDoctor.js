import React,{ Component } from "react";
import CreateSchedule from "../../components/doctor/CreateSchedule";
import EditProfileDoctor from "../../components/doctor/EditProfileDoctor";
import ChangePassword from "../../components/user/ChangePassword";


class ProfileDoctor extends Component{
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
                            Tạo lịch
                        </button>
                        <button type="button" onClick={() => this.onClickListGroup(1)} className={this.state.page === 1 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                        Chỉnh sửa thông tin
                        </button>
                        <button type="button" onClick={() => this.onClickListGroup(2)} className={this.state.page === 2 ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                       Đổi mật khẩu
                        </button>
                    </div>
                    <div className="col-9 p-4 mb-5 profile mt-3">
                        {this.state.page === 0 ? <CreateSchedule /> : ""}
                        {this.state.page === 1 ?  <EditProfileDoctor />: ""}
                        {this.state.page === 2 ? <ChangePassword /> : ""}
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileDoctor