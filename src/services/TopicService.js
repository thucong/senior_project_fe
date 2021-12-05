import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";

let TopicService = {
    createTopic : (content, status, createdBy) => {
        return axios({
            method: 'POST',
            url: API_URL + "topic",
            data: {
                "content": content,
                "status": status,
                "createdBy": createdBy
            }
        })
    }
}
export default TopicService