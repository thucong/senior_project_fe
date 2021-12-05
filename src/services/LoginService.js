import {API_URL} from './../constants/ApiUrl';
import axios from 'axios';




let LoginService = {
    fetchLoginAPI: (email, password) => {
        return axios({
            method: 'POST',
            url: API_URL+'login',
            data: {
                "email": email, 
                "password": password
            }
        });
    },
}

export default LoginService