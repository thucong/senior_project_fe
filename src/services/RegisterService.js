import axios from "axios"
import { API_URL } from "../constants/ApiUrl"

let RegisterService = {
    fetchRegisterAPI : (fullname, email, gender, birthday, password, role) => {
        return axios({
            method: "POST",
            url: API_URL + 'register',
            data: {
                "fullname": fullname,
                "email": email,
                "gender": gender,
                "birthday": birthday,
                "password": password,
                "role": role
            }
        })
    }
}
export default RegisterService;