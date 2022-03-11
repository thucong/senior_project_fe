import React,{ Component } from "react";
import Cookies from "universal-cookie";
import loading_gif from "../../../images/loader.gif";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
import AddHospital from "./AddHospital";
import DeleteHospital from "./DeleteHospital";
import EditHospital from "./EditHospital";

const cookies = new Cookies();
class HospitalContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          list_hospital: [],
          count_page: 0,
          page: 1,
          loading: false,
          choice_delete:'',
          choice_edit:''
        };
      }
      onChangeName = (e) => {
        this.setState({ name: e.target.value });
      };
    logOut = () => {
        cookies.remove("id_user");
        cookies.remove("role");
        cookies.remove("token");
        window.location.href = "/login";
      };
      setPage = (page) => {
        this.setState({ page: page });
        this.setState({ list_hospital: [] });
        this.setListHospital(page);
      };
      setListHospital = (page) => {
        if (page > 0) {
          this.setState({ loading: true });
          callApi(
            "admin/hospital?query=" + this.state.name + "&page=" + page ,
            "GET"
          ).then((rs) => {
            this.setState({list_hospital:rs.data});
            this.setState({ loading: false });
          });
        }
      };
      setCountPage = () => {
        callApi("admin/count?query=" + this.state.name , "GET").then((rs) => {
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
        this.setListHospital(this.state.page);
        this.setCountPage();
      }
      onChoose = (e, id) => {
        e.stopPropagation(); 
        window.open("/hospital/" + id, "_blank");
      };
      onChoiceDelete = (e,id) => {
        e.stopPropagation();
        this.setState({choice_delete: id});
        window.$("#deleteHospital").modal('show');
      }
      onDelete = () => {
        callApi("hospital/" + this.state.choice_delete, "DELETE").then(rs => {
            window.$("#deleteHospital").modal('hide');
            this.setPage(this.state.page);
        })
      }
      onChoiceEdit = (e,id) => {
        e.stopPropagation(); 
        callApi("hospital/" + id).then(rs => {
          this.setState({choice_edit: rs.data[0]})
          window.$("#editHospital").modal('show');
        })
        
      }
      showHospital = (hospital) => {
        let result = null;
        if (hospital.length > 0) {
          result = hospital.map((item, index) => {
            return (
              <tr key={index} className="">
                <th scope="row">{this.state.page * 8 + index - 7}</th>
                <td>
                  <Link
                    className="text-dark"
                    to="#"
                    onClick={(e) => this.onChoose(e, item._id)}
                  >
                    {item.name}
                  </Link>
                </td>
                <td>
                    {item.phone}
                </td>
                <td>
                  {item.email}
                </td>
                <td>
                  {item.address}, {item.provinceOrCity}
                </td>
                <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={(e) =>this.onChoiceEdit(e, item._id)}
                    >
                     Sửa
                    </button>&ensp;
                    <button
                      type="button"
                      className="btn btn-danger mt-1"
                      onClick={(e) =>this.onChoiceDelete(e, item._id)}
                    >
                      Xóa
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
        window.$('#addHospital').modal('show')
      }
      searchHospital = (e) => {
        e.preventDefault();
        this.setListHospital(this.state.page);
        this.setCountPage();
       }
    render(){
        return(
            <div className="col-lg-9 col-md-6 px-0">
        <div className="dark py-4 text-right pr-3 sticky-top">
          <button
            className="btn btn-success text-truncate"
            onClick={this.logOut}
          >
            Đăng xuất
          </button>
        </div>
        <form className="row p-5 " onSubmit={this.searchHospital}>
          <div className="col-lg-8 col-md-6 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Tên"
              onChange={this.onChangeName}
            />
          </div>
          <div className="col-lg-2 col-md-3 mt-1 mt-md-0">
            <button
              type="submit"
              className="btn btn-success btn-lg btn-block word-wrap text-truncate"
              onClick={this.searchHospital}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        <div className="pl-5 pb-3">
          <button className="btn btn-success" onClick={this.onAdd}>Thêm</button>
        </div>
        <div className="pl-5 pr-5 row m-0">
          <table className="table jumbotron content">
            <thead className="">
              <tr className="">
                <th scope="col">#</th>
                <th scope="col">Tên</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Email</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.showHospital(this.state.list_hospital)}</tbody>
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
                Đầu
              </button>
            </li>
            {this.showPage(this.state.count_page, this.state.page)}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => this.setPage(this.state.count_page)}
              >
               Cuối
              </button>
            </li>
          </ul>
        </nav>
        <AddHospital />
        <DeleteHospital onDelete={this.onDelete}/>
        <EditHospital choice_edit={this.state.choice_edit}/>
      </div>
        )
    }
}
export default HospitalContent