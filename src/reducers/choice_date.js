import * as types from '../constants/ActionTypes';

let initialState = null;

const choice_date = (state = initialState, action) => {
    switch(action.type) {
        case types.CHOICE_DATE:
            state = action.date
            return state;
        default:
            return state;
    }
}
export default choice_date;