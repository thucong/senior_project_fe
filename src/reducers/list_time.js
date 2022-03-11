import * as types from '../constants/ActionTypes';

let initialState = ["05:00","06:00","07:00", "08:00", "09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];

const list_time = (state = initialState, action) => {
    switch(action.type){
        case types.SET_LIST_TIME:
            return action.list_time;
        default: 
            return state;
    }
};

export default list_time;