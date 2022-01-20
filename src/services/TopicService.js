import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
let TopicService = {
    createTopic : (content, status, createdBy, file, hashtag) => {
        return axios({
            method: 'POST',
            url: API_URL + "topic",
            data: {
                "content": content,
                "status": status,
                "createdBy": createdBy,
                "hashtag": hashtag,
                "file": file
            },
            headers: { Authorization: `Bearer ${token}` }
        })
    },
    updateTopic : (id,content, file, hashtag) => {
        return axios({
            method: 'PUT',
            url: API_URL + "topic/" + id,
            data: {
                "content": content,
                "file": file,
                "hashtag": hashtag
            },
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}
export default TopicService