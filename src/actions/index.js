import * as types from './../constants/ActionTypes';

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