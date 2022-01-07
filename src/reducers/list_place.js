import * as types from '../constants/ActionTypes';

let initialState = [];

const list_place = (state = initialState, action) => {
    switch(action.type){
        case types.SET_LIST_PLACE:
            return action.list_place;
        default: 
            return state;
    }
};

export default list_place;