import React, { Component } from "react";

class NoticeModal extends Component {
  onClose = () => {
    window.$("#notice").modal("hide");
  };
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="notice"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="notice"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">NOTICE</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <p className="mb-2">The calendar has expired to book a consultation. Please choose another date!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={this.onClose}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NoticeModal;
