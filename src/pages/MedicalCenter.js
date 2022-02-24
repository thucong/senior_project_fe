import React,{ Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import callApi from "../utils/apiCaller";
import loading_gif from "../images/loader.gif";
import axios from "axios";
import { API_URL } from "../constants/ApiUrl";
class MedicalCenter extends Component {
    constructor(props){
        super(props);
        this.state = {
            list_hospital: '',
            place: '',
            page: 1 ,
            loading: false,
            count_hospital: 0
        }
    }
    setListHospital = (page) => {
        if (page > 0) {
          this.setState({ loading: true });
          axios.get(API_URL + 
            "hospitals?query=" +
            this.state.place +
              "&page=" +
              page
          ).then((rs) => {
            this.setState({list_hospital: rs.data});
            this.setState({ loading: false });
          });
        }
      };
      setPage = (page) => {
        this.setState({ page: page });
        this.setState({ list_hospital: [] });
        this.setListHospital(page);
      };
      setCountPage = () => {
        callApi(
          "count_hospital?query=" +
          this.state.place ,
          "GET"
        ).then((rs) => {
          this.setState({count_hospital: rs.data});
        });
      };
    onChangePlace = (e) => {
        this.setState({ place: e.target.value });
      };
      showListPlace = (list_place) => {
        let result = null;
        if (list_place.length > 0) {
          result = list_place.map((place, index) => {
            return (
              <option key={index} value={place}>
                {place}
              </option>
            );
          });
          return result;
        }
      };
      componentDidMount() {
        if (this.props.list_place.length === 0) {
          this.props.fetchListPlace();
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let page = params.get("page");
        if (!page) {
          page = 1;
        }
        this.setState({ page: page });
        this.setListHospital(this.state.page);
        this.setCountPage();
      };
      showHospital = (hospitals) => {
        let result = null;
        if(hospitals.length > 0){
          result = hospitals.map((hospital,index) => {
            return (
              <div className="col-lg-3 col-md-6 w-100 my-3" key={index}>
                <Link to={"/hospital/" + hospital._id} className="link" style={{ textDecoration: 'none' }}>
                    <div className="card h-100 company-card">
                        <div className="company-logo mx-4">
                            <img src={hospital.image} alt="" width="100%"/>
                        </div>
                        <div className="card-body">
                            <h4 className="h4 card-title">{hospital.name}</h4>
                            <p className="card-text editor" dangerouslySetInnerHTML={{__html: hospital.description.substring(0, 150)}}></p>
                            {/* <div className="editor info-doctor p-3 lh-24" dangerouslySetInnerHTML={{__html: hospital.description.substring(0, 150)}}/> */}
                        </div>
                    </div>
                </Link>
                </div>
            )
          })
        }else if(hospitals.length === 0){
          result = (
            <div className="center">
              <p className="text-danger mb-3 h4"> Sorry, we couldn't find any results for your search! </p>
            </div>
          )
          }
        return result
      }
      showPage = (page_count, page_choose) => {
        let result = null;
        if (page_count > 0) {
          const begin_page = +page_choose - 2 > 0 ? +page_choose - 2 : 1;
          const end_page =
            begin_page + 5 < page_count ? begin_page + 5 : page_count;
          const page_array = Array(end_page - begin_page + 1)
            .fill()
            .map((_, idx) => begin_page + idx - 1);
          result = page_array.map((page, index) => {
            return (
              <li
                className={
                  page + 1 === +page_choose ? "page-item active" : "page-item"
                }
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => this.setPage(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            );
          });
        }
        return result;
      };
      onSubmitSearch = (e) => {
        e.preventDefault();
        this.setListHospital(this.state.page);
        this.setCountPage();
      };
    render(){
      //console.log(this.state.list_hospital)
        return (
            <div className="">
                <div className="search">
                    <form className="col-lg-10 row mx-auto py-5" onSubmit={this.onSubmitSearch}>
                        <div className="col-lg-3 col-md-3 mt-1 mt-md-0 ">
                            <select
                            className="form-control form-control-lg"
                            onChange={this.onChangePlace}
                            value={this.state.place}
                            >
                            <option value="">Choose Place</option>
                            {this.showListPlace(this.props.list_place)}
                            </select>
                        </div>
                        <div className="col-lg-2 col-md-1 mt-1 mt-md-0">
                            <button type="submit" className="btn btn-success btn-lg btn-block word-wrap text-truncate" onSubmit={this.onSubmitSearch}>Search</button>
                        </div>
                    </form>
                </div>
                <div className="row col-lg-10 mt-2 mx-auto ">
                {this.showHospital(this.state.list_hospital)}
            </div>
            {this.state.loading ? (
          <img
            className="center mb-5"
            src={loading_gif}
            alt=""
            width="50px"
          ></img>
        ) : (
          ""
        )}
         <ul className="pagination justify-content-center mb-5 mt-3">
                    <li className="page-item">
                        <button className="page-link" onClick={() => this.setPage(1)}>
                            Head
                        </button>
                    </li>
                    {this.showPage(this.state.count_hospital, this.state.page)}
                    <li className="page-item">
                        <button className="page-link" onClick={() => this.setPage(this.state.count_hospital)}>
                            Last
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      list_place: state.list_place,
    };
  };
  const mapDispatchToProps = (dispatch, props) => {
    return {
      fetchListPlace: () => {
        dispatch(actions.fetchListPlace());
      },
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(MedicalCenter);