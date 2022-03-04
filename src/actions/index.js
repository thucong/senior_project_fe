import * as types from './../constants/ActionTypes';
import axios from "axios";
import {API_URL} from "../constants/ApiUrl";

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
        return axios.get(API_URL + "infoCity").then(res => {
            if (res.status === 200) {
                res.data.map((place,index) => {
                    list_place.push(place.name)
                })
                dispatch(setListPlace(list_place));
            }
        });
    }
}
export const changeTime = (time) => {
    return {
        type: types.CHANGE_TIME,
        time
    }
}
export const setListTime = (list_time) => {
    return {
        type: types.SET_LIST_TIME,
        list_time
    }
}
export const fetchListTime = () => {
    let list_time = [];
    // return (dispatch) => {
    //     return axios.get(API_URL + "time").then(res => {
    //         if(res.status === 200){
    //             res.data.map((time, index) => {
    //                 list_time.push(time.time)
    //                 console.log(list_time)
    //             })
    //             dispatch(setListTime(list_time))
    //         }
    //     })
    // }
}
export const choiceDate = (date) => {
    return {
        type: types.CHOICE_DATE,
        date
    }
}