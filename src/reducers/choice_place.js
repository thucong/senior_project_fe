import * as types from '../constants/ActionTypes';

let initialState = null;

const choice_place = (state = initialState, action) => {
    switch(action.type) {
        case types.CHOICE_PLACE:
            state = action.place
            return state;
        default:
            return state;
    }
}
export default choice_place;