import * as types from '../constants/ActionTypes';

let initialState = "";

const role = (state = initialState, action) => {
    switch(action.type){
        case types.SET_ROLE:
            state=action.role;
            return state;
        default: 
            return state;
    }
};

export default role;