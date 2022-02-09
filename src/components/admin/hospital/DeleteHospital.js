import React, { Component } from "react";

class DeleteHospital extends Component {
    render () {
        return (
            <div className="modal fade" id="deleteHospital" tabIndex="-1" role="dialog" aria-labelledby="deleteHospital" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Hospital</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Do you want to delete this hospital?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                        <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Yes</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DeleteHospital;