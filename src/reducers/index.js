import { combineReducers } from 'redux';
import hide_header from './hide_header';
import choice_place from './choice_place';
import role from './role';


const appReducers = combineReducers({
    hide_header,
    choice_place,
    role,
});
export default appReducers;