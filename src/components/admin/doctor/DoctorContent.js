import React,{ Component } from "react";
import Cookies from "universal-cookie";
import loading_gif from "../../../images/loader.gif";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
import AddDoctor from "./AddDoctor";
import DeleteDoctor from "./DeleteDoctor";
import EditDoctor from "./EditDoctor";

const cookies = new Cookies();
class DoctorContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          list_doctor: [],
          count_page: 0,
          page: 1,
          loading: false,
          choice_delete:'',
          choice_edit:''
        };
      }
    logOut = () => {
        cookies.remove("id_user");
        cookies.remove("role");
        cookies.remove("token");
        window.location.href = "/login";
      };
      setPage = (page) => {
        this.setState({ page: page });
        this.setState({ list_doctor: [] });
        this.setList(page);
      };
      setList = (page) => {
        if (page > 0) {
          this.setState({ loading: true });
          callApi(
            "doctor?page=" + page ,
            "GET"
          ).then((rs) => {
            this.setState({list_doctor:rs.data});
            this.setState({ loading: false });
          });
        }
      };
      setCountPage = () => {
        callApi("count/doctor" , "GET").then((rs) => {
          this.setState({count_page: rs.data});
        });
      };
      componentDidMount() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let page = params.get("page");
        if (!page) {
          page = 1;
        }
        this.setState({ page: page });
        this.setList(this.state.page);
        this.setCountPage();
      }
      onChoose = (e, id) => {
        e.stopPropagation(); 
        window.open("/doctor/" + id, "_blank");
      };
      onChoiceDelete = (e,id) => {
        e.stopPropagation();
        this.setState({choice_delete: id});
        window.$("#deleteDoctor").modal('show');
      }
      onDelete = () => {
        callApi("user/" + this.state.choice_delete, "DELETE").then(rs => {
            window.$("#deleteDoctor").modal('hide');
            this.setPage(this.state.page);
        })
      }
      onChoiceEdit = (e,id) => {
        e.stopPropagation(); 
        callApi("user/" + id).then(rs => {
          this.setState({choice_edit: rs.data[0]})
          window.$("#editDoctor").modal('show');
        })
        
      }
      showDoctor = (doctor) => {
        let result = null;
        if (doctor.length > 0) {
          result = doctor.map((item, index) => {
            return (
              <tr key={index} className="">
                <th scope="row">{this.state.page * 8 + index - 7}</th>
                <td>
                  <Link
                    className="text-dark"
                    to="#"
                    onClick={(e) => this.onChoose(e, item._id)}
                  >
                    {item.fullname}
                  </Link>
                </td>
                <td>
                    {item.phone}
                </td>
                <td>
                  {item.email}
                </td>
                <td>
                  {item.workplace}
                </td>
                <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) =>this.onChoiceEdit(e, item._id)}
                    >
                     Edit
                    </button>&ensp;
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={(e) =>this.onChoiceDelete(e, item._id)}
                    >
                      Delete
                    </button>
               
                  
                
                </td>
              </tr>
            );
          });
          return result;
        }
      };
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
      onAdd = () => {
        window.$('#addDoctor').modal('show')
      }
    
    render(){
        return(
            <div className="col-lg-9 col-md-6 px-0">
        <div className="dark py-4 text-right pr-3 sticky-top">
          <button
            className="btn btn-success text-truncate"
            onClick={this.logOut}
          >
            Logout
          </button>
        </div>
        <div className="pl-5 pb-3 mt-3">
          <button className="btn btn-success" onClick={this.onAdd}>Add</button>
        </div>
        <div className="pl-5 pr-5 row m-0">
          <table className="table jumbotron content">
            <thead className="">
              <tr className="">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Workplace</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.showDoctor(this.state.list_doctor)}</tbody>
          </table>
        </div>
        {this.state.loading ? (
          <img
            className="center mb-3"
            src={loading_gif}
            alt=""
            width="50px"
          ></img>
        ) : (
          ""
        )}
        <nav aria-label="Page navigation example">
          <ul className="pagination page mb-5 justify-content-center">
            <li className="page-item">
              <button className="page-link" onClick={() => this.setPage(1)}>
                Head
              </button>
            </li>
            {this.showPage(this.state.count_page, this.state.page)}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => this.setPage(this.state.count_page)}
              >
               Last
              </button>
            </li>
          </ul>
        </nav>
        <AddDoctor />
        <DeleteDoctor onDelete={this.onDelete}/>
        <EditDoctor choice_edit={this.state.choice_edit}/>
      </div>
        )
    }
}
export default DoctorContent