import * as types from './../constants/ActionTypes';
import axios from "axios";
import {API_URL} from "../constants/ApiUrl"
export const hideHeader = () => {
    return {
        type : types.HIDE_HEADER
    };
}
export const notHideHeader = () => {
    return {
        type : types.NOT_HIDE_HEADER
    };
}
export const setRole = (role) => {
    return {
        type: types.SET_ROLE,
        role
    };
}
export const choicePlace = (place) => {
    return {
        type: types.CHOICE_PLACE,
        place
    }
}
export const setListHashtag = (list_hashtag) => {
    return {
        type : types.SET_LIST_HASHTAG,
        list_hashtag
    };
}
export const changeHashtag = (hashtag) => {
    return {
        type : types.CHANGE_HASHTAG,
        hashtag
    };
}
export const fetchListHashtag = () => {
    let list_hashtag = [];
    return (dispatch) => {
        return axios.get(API_URL + "hashtag").then(res => {
            if (res.status === 200) {
                res.data.map((hashtag, index) => {
                    list_hashtag.push(hashtag.hashtag)
                })
                dispatch(setListHashtag(list_hashtag))
            }
        });
    }
}
export const changePlace = (place) => {
    return {
        type : types.CHANGE_PLACE,
        place
    };
}
export const setListPlace = (list_place) => {
    return {
        type : types.SET_LIST_PLACE,
        list_place
    };
}
export const fetchListPlace = () => {
    let list_place = [];
    return (dispatch) => {
        return axios.get(API_URL + "place").then(res => {
            if (res.status === 200) {
                res.data.map((place,index) => {
                    list_place.push(place.place)
                })
                dispatch(setListPlace(list_place));
            }
        });
    }
}