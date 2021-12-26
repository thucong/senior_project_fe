import React,{ Component } from "react";
import ConsultationService from "../../services/ConsultationService";

class ImageModal extends Component{

    onClose = () => {
        window.$('image').modal('hide')
    }
    render(){
        return(
            <div className="modal fade" id="image" tabIndex="-1" role="dialog" aria-labelledby="image" aria-hidden="true">
            <div className="modal-dialog" role="document">
           
                    <img src={this.props.file} style={{ width: "800px" }}/>
                
               
            </div>
        </div>
        )
    }
}

export default (ImageModal)