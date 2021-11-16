import * as types from '../constants/ActionTypes';

let initialState = true;

const hide_header = (state = initialState, action) => {
    switch(action.type){
        case types.HIDE_HEADER:
            return true;
        case types.NOT_HIDE_HEADER:
            return false;
        default: 
            return state;
    }
};

export default hide_header;