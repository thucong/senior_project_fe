import axios from "axios";
import React,{ Component } from "react";
import { API_URL } from "../../constants/ApiUrl";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

class DeleteQuestion extends Component{
    delete = async () => {
        //console.log(this.props.choice_delete)
        await axios.delete(API_URL + "topic/" + this.props.choice_delete, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
            window.$('#deleteQuestion').modal('hide');
            window.location.reload();
        })
       
    }
    onClose = () => {
        window.$('#deleteQuestion').modal('hide');
    }
    render(){
        //console.log(this.props.choice_delete)
        return(
            <div className="modal fade " id="deleteQuestion" tabIndex="-1" role="dialog" aria-labelledby="deleteQuestion" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title h4">Xóa câu hỏi</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={this.onClose}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Bạn có muốn xóa câu hỏi này không?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={this.onClose}>Không</button>
                    <button type="button" className="btn btn-danger" onClick={this.delete}>Có</button>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default (DeleteQuestion)