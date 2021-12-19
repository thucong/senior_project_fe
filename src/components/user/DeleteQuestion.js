import axios from "axios";
import React,{ Component } from "react";
import { API_URL } from "../../constants/ApiUrl";


class DeleteQuestion extends Component{
    delete = async () => {
        //console.log(this.props.choice_delete)
        await axios.delete(API_URL + "topic/" + this.props.choice_delete).then((res) => {
            window.$('#deleteQuestion').modal('hide');
            window.location.reload();
        })
       
    }
    render(){
        //console.log(this.props.choice_delete)
        return(
            <div className="modal fade " id="deleteQuestion" tabIndex="-1" role="dialog" aria-labelledby="deleteQuestion" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title h4">Delete question</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Do you want to delete this question?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" className="btn btn-danger" onClick={this.delete}>Yes</button>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default (DeleteQuestion)