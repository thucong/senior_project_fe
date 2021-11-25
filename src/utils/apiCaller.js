import axios from 'axios';
import {API_URL} from './../constants/ApiUrl';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function callApi(endpoint, method = 'GET', body) {
    const token = cookies.get("token");
    if (token) {
        return axios({
            method: method,
            url: API_URL+endpoint,
            data: body,
            headers: { Authorization: `Bearer ${token}` }
        }).catch((e) => {
             return callApi(endpoint, method, body);   
        });
    }
    else {
        return axios({
            method: method,
            url: API_URL+endpoint,
            data: body
        })
    }
}