import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
let CommentService = {
    fetchCommentAPI: (content, topicId, userId) => {
        return axios({
            method: 'POST',
            url: API_URL+'comment',
            data: {
                "topicId": topicId, 
                "content": content,
                "userId": userId
            },
            headers: { Authorization: `Bearer ${token}` }
        });
    },

};

export default CommentService;
