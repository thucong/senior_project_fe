import "./App.css";
import Header from "./components/common/Header";
import HeaderDoctor from "./components/doctor/HeaderDoctor";
import HeaderUser from "./components/user/HeaderUser";
import { createBrowserHistory } from "history";
import React,{ Component } from "react";
import { Router, Switch, Route } from 'react-router-dom';
import * as actions from './actions/index';
import routes from './routes';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';

var history = createBrowserHistory();

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      show_header : true,
      getting_data: true
  };
  this.cookies = new Cookies();
  }
  onRouteChange = (location, action) => {
    if (location.pathname === "/") {
        if (!this.props.hide_header) {
            this.props.onHideHeader();
        }
    } else {
        if (this.props.hide_header) {
            this.props.onNotHideHeader();
        }
    }
    this.setShowHeader();
}
setShowHeader = () => {
  const hide_header_paths = [
      "/login",
    
  ];
  let show_header = true;
  if (window.location.pathname === "/") {
      const role = this.cookies.get('role');
      if (role === "admin") {
          show_header = false;
      }
  }
  else {
      for (const path of hide_header_paths) {
          if (window.location.pathname.substring(0, path.length) === path) {
              show_header = false;
              break;
          }
      }
  }
  
  this.setState({"show_header": show_header});
}
componentDidMount() {
  //Lay thong tin nguoi dung khi khoi dong
  this.setState({getting_data: true});
//   const token = this.cookies.get('token');
  
  //Thiet lap an header khi o trang chu
  if (window.location.pathname === "/") {
      if (!this.props.hide_header) {
          this.props.onHideHeader();
      }
  } else {
      if (this.props.hide_header) {
          this.props.onNotHideHeader();
      }
  }
  //Khong hien thi header khi o trang dang nhap
  this.setShowHeader();
  history.listen(this.onRouteChange);
}
render() {
  
      return (
          <Router history={history}>
              { this.state.show_header ? this.showHeader() : "" }
              <Switch>{ this.showContentMenus(routes) }</Switch>
          </Router>
      );

}
showHeader = () => {
  const role = this.cookies.get('role');
  if (role === "doctor") {
      return <HeaderDoctor />;
  }
  else if (role === "patient") {
      return <HeaderUser />;
  }
  else {
      return <Header />;
  }
}

showContentMenus = (routes) => {
  let result = null;
  if (routes.length > 0) {
      result = routes.map((route, index) => {
          return (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
              />
          );
      });
      return result;
  }
}
}
const mapStateToProps = state => {
  return {
      hide_header: state.hide_header,
      role: state.role
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      onHideHeader : () => {
          dispatch(actions.hideHeader())
      },
      onNotHideHeader : () => {
          dispatch(actions.notHideHeader())
      },
      setRole : (role) => {
          dispatch(actions.setRole(role))
      }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

