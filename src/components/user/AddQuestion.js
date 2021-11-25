import React, { Component } from "react";

class AddQuestion extends Component {

  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="addQuestion"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addQuestion"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content" >
            <div className="modal-header">
              <h5 className="modal-title">Add a question</h5>
              <button type="button" className="close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body send-mail">
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  className="form-control"
                  rows="5"
                  cols="63"
                  placeholder="Content"
                  id="content"
                  name="content"
                  value=""
               
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
               
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                
              >
               Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddQuestion;
