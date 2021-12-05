import axios from "axios"
import { API_URL } from "../constants/ApiUrl"

let ForgetPasswordService = {
    sendMailAPI : (email) => {
        return axios({
            method: "POST",
            url: API_URL + 'forgot-password',
            data: {
                "email" : email,
            }
        });
    },
    resetPasswordAPI: (token,password) => {
        return axios({
            method: "PUT",
            url: API_URL + 'reset-password',
            data: {
                "resetLink" : token,
                "newPass" : password,
            }
        })
    }
}
export default ForgetPasswordService;