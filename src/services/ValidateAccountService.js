import axios from "axios";
import { API_URL } from "../constants/ApiUrl";

let ValidateAccountService = {
  fetchValidateAccountAPI: (token) => {
    return axios({
      method: "PUT",
      url: API_URL + "email-activate",
      data: {
        token: token,
      },
    });
  },
};

export default ValidateAccountService;
