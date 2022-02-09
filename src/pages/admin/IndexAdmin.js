import React, { Component } from "react";
import Content from "../../components/admin/Content";
import SideBar from "../../components/admin/SideBar";

class IndexAdmin extends Component {
    render() {
        return (
            <div>
                <div className="row mx-0">
                    <SideBar />
                    <Content />
                </div>
            </div>
        )
    }
}
export default IndexAdmin;