import React, { Component } from "react";
import ConsultationService from "../../services/ConsultationService";

class DeleteConsultation extends Component {
  delete = () => {
    ConsultationService.deleteConsultation(this.props.choice_delete).then(
      (res) => {
        window.$("#deleteConsultation").modal("hide");
        window.location.reload();
      }
    );
  };
  onClose = () => {
    window.$("deleteConsultation").modal("hide");
  };
  render() {
    return (
      <div
        className="modal fade"
        id="deleteConsultation"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteConsultation"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Xóa cuộc tư vấn</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Bạn có muốn xóa cuộc tư vấn này không?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.onClose}
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.delete}
              >
                Có
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteConsultation;
