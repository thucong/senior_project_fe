import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";

let NewsService = {
  fetchNewsAPI: () => {
    return axios({
      method: "GET",
      url: API_URL + "news",
      data: {},
    });
  },
  getNewsById : (id) => {
    return axios({
      method: "GET",
      url: API_URL + "news" + `/${id}`,
      data:{}
    })
  }
};

export default NewsService;
