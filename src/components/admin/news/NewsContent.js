import React,{ Component } from "react";
import Cookies from "universal-cookie";
import loading_gif from "../../../images/loader.gif";
import callApi from "../../../utils/apiCaller";
import { Link } from "react-router-dom";
import AddNews from "./AddNews";
import DeleteNews from "./DeleteNews";
import EditNews from "./EditNews";

const cookies = new Cookies();
class NewsContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          list_hospital: [],
          count_page: 0,
          page: 1,
          loading: false,
          choice_delete:'',
          choice_edit:'',
          content:''
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
        this.setListNews(page);
      };
      setListNews = (page) => {
        if (page > 0) {
          this.setState({ loading: true });
          callApi(
            "admin/news?query=" + this.state.name + "&page=" + page ,
            "GET"
          ).then((rs) => {
            this.setState({list_hospital:rs.data});
            this.setState({ loading: false });
          });
        }
      };
      setCountPage = () => {
        callApi("admin/count_news?query=" + this.state.name , "GET").then((rs) => {
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
        this.setListNews(this.state.page);
        this.setCountPage();
      }
      onChoose = (e, id) => {
        e.stopPropagation(); 
        window.open("/news/" + id, "_blank");
      };
      onChoiceDelete = (e,id) => {
        e.stopPropagation();
        this.setState({choice_delete: id});
        window.$("#deleteNews").modal('show');
      }
      onDelete = () => {
        callApi("news/" + this.state.choice_delete, "DELETE").then(rs => {
            window.$("#deleteNews").modal('hide');
            this.setPage(this.state.page);
        })
      }
      onChoiceEdit = (e,id) => {
        e.stopPropagation(); 
        callApi("news/" + id).then(rs => {
          this.setState({choice_edit: rs.data[0]})
          window.$("#editNews").modal('show');
        })
        
      }
      showNews = (news) => {
        let result = null;
        if (news.length > 0) {
          result = news.map((item, index) => {
            return (
              <tr key={index} className="">
                <th scope="row">{this.state.page * 8 + index - 7}</th>
                <td>
                  <Link
                    className="text-dark"
                    to="#"
                    onClick={(e) => this.onChoose(e, item._id)}
                  >
                    {item.subject}
                  </Link>
                </td>
                <td>
                    {item.writer}
                </td>
                <td>
                  {item.category}
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
                      className="btn btn-danger"
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
        window.$('#addNews').modal('show')
      }
     searchNews = (e) => {
      e.preventDefault();
      this.setListNews(this.state.page);
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
        <form className="row p-5 " onSubmit={this.searchNews}>
          <div className="col-lg-8 col-md-6 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Chủ đề"
              onChange={this.onChangeName}
            />
          </div>
          <div className="col-lg-2 col-md-3 mt-1 mt-md-0">
            <button
              type="submit"
              className="btn btn-success btn-lg btn-block word-wrap text-truncate"
              onClick={this.searchNews}
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
                <th scope="col">Chủ đề</th>
                <th scope="col">Người viết</th>
                <th scope="col">Thể loại</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.showNews(this.state.list_hospital)}</tbody>
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
        <AddNews />
        <DeleteNews onDelete={this.onDelete}/>
        <EditNews choice_edit={this.state.choice_edit} />
      </div>
        )
    }
}
export default NewsContent