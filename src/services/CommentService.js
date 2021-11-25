import { API_URL } from "./../constants/ApiUrl";
import axios from "axios";

let CommentService = {
    fetchCommentAPI: (content, userId, topicId) => {
        return axios({
            method: 'POST',
            url: API_URL+'comment',
            data: {
                "topicId": topicId, 
                "userId": userId,
                "content": content
            }
        });
    },

};

export default CommentService;
