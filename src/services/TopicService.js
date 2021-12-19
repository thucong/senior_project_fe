import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";

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
            }
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
            }
        })
    }
}
export default TopicService