import React, { Component } from 'react';
import axios from 'axios';
import loading_gif from './../../images/loader.gif';

class ImageUploader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    onSelectImage = (e) => {
        let fd = new FormData();
        fd.append("upload_preset", "w7vswxuz");
        fd.append("file", e.target.files[0]);
        this.setState({loading: true});
        axios({
            method: "POST",
            url: "https://api.cloudinary.com/v1_1/doe5namc3/image/upload",
            data: fd,
        }).then(rs => {
            this.setState({loading: false});
            this.props.onChange(rs.data.url);
        });
    }
    render(){
        return (
            <div className="col div-image-change p-0" >
                <label>
                    <img src={this.props.imageUrl} alt="" width="170px" height="170px"/>
                    <input type="file" hidden onChange={this.onSelectImage} />
                    {!this.state.loading ? <div className="overlay d-flex align-items-center">
                        <div className="text-white text-center mx-auto">Đổi mật khẩu</div>
                    </div> : ""}
                    {this.state.loading ? <div className="overlay-loading d-flex align-items-center">
                        <img className="center" src={loading_gif} alt="" width="50px"></img>
                    </div> : ""}
                </label>
            </div>
        );
    }
}

export default ImageUploader;