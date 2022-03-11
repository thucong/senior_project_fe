import React, { Component } from "react";

class DeleteNews extends Component {
    render () {
        return (
            <div className="modal fade" id="deleteNews" tabIndex="-1" role="dialog" aria-labelledby="deleteNews" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Xóa tin tức</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Bạn có muốn xóa tin tức này không?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Không</button>
                        <button type="button" className="btn btn-danger" onClick={this.props.onDelete}>Có</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DeleteNews;