import * as types from "../constants/ActionTypes"

let inititalState = [];

const list_hashtag = (state = inititalState, action) => {
    switch(action.type){
        case types.SET_LIST_HASHTAG:
            return action.list_hashtag;
        default:
            return state
    }
}

export default list_hashtag;