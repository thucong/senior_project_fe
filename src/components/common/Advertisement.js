import React, { Component } from 'react';

class Advertisement extends Component {
    render() {
        return (
            <div className="col-md-4 d-none d-sm-none d-md-none d-lg-block mt-3">
                <div className="container sticky-top advertisement">
                    <div className="card border-0">
                        <div className="card-body">
                            <h4 className="card-title text-center">Advertisement</h4>
                            <img src="https://cdn.dribbble.com/users/6080859/screenshots/14685715/media/ca52aa2f7512d1351e5301693d891b23.png?compress=1&resize=400x300" width="100%" height="300px" className="mt-2" alt=""></img>
                            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flavored-vitamins-pills-ad-design-template-711649f31e11f00806d64b0030b9e65e_screen.jpg?ts=1606196424" width="100%" height="300px" className="mt-2" alt=""></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Advertisement;
