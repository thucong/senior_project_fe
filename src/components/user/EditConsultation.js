
import React, { Component } from "react";



class EditConsultation extends Component {
  constructor(props) {
    super(props);
    this.state ={
      start: '',
      end: '',
      content: '',
      file: '',
      status: 'wait',
      notif_time: false,
      notif_content: false
    }
  }
  componentDidMount(){

  }
 
  render() {
  
    return (
      <div
        className="modal fade bd-example-modal-lg"
        id="editConsultation"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editConsultation"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h4">Edit an appointment</h5>
              <button type="button" className="close" onClick={this.onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <div className="form-group">
                <label>Start time:</label> &ensp;
                <select onChange={this.onChangeTime} value={this.state.start} name="start">
                <option value="">Choose time</option>
                {this.props.list_schedule.length > 0 ? (this.props.list_schedule.map((time, index) => (
                  
                  <option value={time}>{Moment(time).format('YYYY-MM-DD hh:mm a')}</option>
               
                ))): ""}
                 </select>
              </div>
              {this.state.start ? (
                 <div className="form-group">
                 <label>End time:</label> &ensp;
               
                 <input type="text" value={this.state.end} disabled name="end"/>
               </div>
              ) : ""}
             
              <div className="form-group">
                <label>Reason for examination:</label>
                <textarea
                  className="form-control mt-2"
                  rows="5"
                  cols="63"
                  name="content"
                  onChange={this.onChangeContent}
                ></textarea>
              </div>
              <p className="mb-2">There are prior examinations:</p>
              <div>
                <label>Upload images:</label>&ensp;
                <input type="file" name="file" onChange={this.uploadImage}></input> <br />
                <img src={this.state.file} style={{ width: "200px" }} />
              </div>
            </div>
           
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={this.onSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(EditConsultation);
