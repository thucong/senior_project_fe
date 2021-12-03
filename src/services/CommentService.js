import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";

let CommentService = {
    fetchCommentAPI: (content, topicId, userId) => {
        return axios({
            method: 'POST',
            url: API_URL+'comment',
            data: {
                "topicId": topicId, 
                "content": content,
                "userId": userId
            }
        });
    },

};

export default CommentService;
